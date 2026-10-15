import { persistedStore } from '../state/persisted'
import type { Cond, GameMeta, GameNode, Gender, Hotspot, Option, Question } from './types'

/** Everything that a checkpoint restores. */
export interface Snapshot {
  node: string
  owned: string[]
  flags: string[]
  /** Examined hotspots and asked questions, as "nodeId:id". */
  done: string[]
}

export interface GameSave extends Snapshot {
  gender: Gender | null
  started: boolean
  /** Act id → state when that act began. */
  checkpoints: Record<string, Snapshot>
  /** Ending ids reached, across all playthroughs. */
  endings: string[]
  /** Casebook items not opened yet. */
  unseen: string[]
}

const fresh = (start: string): GameSave => ({
  node: start,
  owned: [],
  flags: [],
  done: [],
  gender: null,
  started: false,
  checkpoints: {},
  endings: [],
  unseen: [],
})

const store = persistedStore<{ games: Record<string, GameSave> }>('kahani.games', { games: {} })

export function useGameSave(game: GameMeta): GameSave {
  return store.use().games[game.id] ?? fresh(game.acts[0].start)
}

function get(game: GameMeta): GameSave {
  return store.get().games[game.id] ?? fresh(game.acts[0].start)
}

function put(game: GameMeta, next: GameSave) {
  store.set((s) => ({ games: { ...s.games, [game.id]: next } }))
}

export function test(cond: Cond | undefined, s: Pick<Snapshot, 'owned' | 'flags'>): boolean {
  if (!cond) return true
  const owns = (id: string) => s.owned.includes(id)
  const flag = (f: string) => s.flags.includes(f)
  if (cond.has && !cond.has.every(owns)) return false
  if (cond.hasAny && !cond.hasAny.some(owns)) return false
  if (cond.lacks && cond.lacks.some(owns)) return false
  if (cond.flags && !cond.flags.every(flag)) return false
  if (cond.notFlags && cond.notFlags.some(flag)) return false
  if (cond.countAtLeast && cond.countAtLeast.flags.filter(flag).length < cond.countAtLeast.n) return false
  if (cond.countBelow && cond.countBelow.flags.filter(flag).length >= cond.countBelow.n) return false
  return true
}

function apply(s: GameSave, give: string[] = [], set: string[] = []): GameSave {
  const newItems = give.filter((id) => !s.owned.includes(id))
  return {
    ...s,
    owned: [...s.owned, ...newItems],
    unseen: [...s.unseen, ...newItems],
    flags: [...s.flags, ...set.filter((f) => !s.flags.includes(f))],
  }
}

const snap = (s: GameSave): Snapshot => ({ node: s.node, owned: s.owned, flags: s.flags, done: s.done })

/** Moves to a node, resolving routes and applying on-enter effects and checkpoints. */
function enter(game: GameMeta, s: GameSave, id: string): GameSave {
  let next = { ...s }
  for (let guard = 0; guard < 20; guard++) {
    const node: GameNode | undefined = game.nodes[id]
    if (!node) throw new Error(`Unknown game node ${id}`)
    if (node.kind === 'route') {
      id = node.routes.find((r) => test(r.when, next))?.next ?? node.next
      continue
    }
    next.node = id
    const actIndex = game.acts.findIndex((a) => a.start === id)
    if (actIndex >= 0) {
      // A new act: remember the state here, and forget checkpoints from any later act of an older run.
      const checkpoints: Record<string, Snapshot> = {}
      game.acts.slice(0, actIndex).forEach((a) => next.checkpoints[a.id] && (checkpoints[a.id] = next.checkpoints[a.id]))
      checkpoints[game.acts[actIndex].id] = snap(next)
      next.checkpoints = checkpoints
    }
    if (node.kind === 'story' || node.kind === 'interview') next = apply(next, node.give, node.set)
    if (node.kind === 'ending' && !next.endings.includes(node.ending)) next.endings = [...next.endings, node.ending]
    return next
  }
  throw new Error('Route loop')
}

export const actions = {
  newGame(game: GameMeta) {
    const prev = get(game)
    put(game, enter(game, { ...fresh(game.acts[0].start), endings: prev.endings, started: true }, game.acts[0].start))
  },
  chooseGender(game: GameMeta, gender: Gender, next: string) {
    put(game, enter(game, { ...get(game), gender, started: true }, next))
  },
  go(game: GameMeta, next: string) {
    put(game, enter(game, get(game), next))
  },
  choose(game: GameMeta, option: Option) {
    const s = apply(get(game), option.give, option.set)
    put(game, enter(game, s, option.next))
  },
  examine(game: GameMeta, nodeId: string, spot: Hotspot) {
    const s = get(game)
    const key = `${nodeId}:${spot.id}`
    if (s.done.includes(key)) return
    put(game, apply({ ...s, done: [...s.done, key] }, spot.give, spot.set))
  },
  ask(game: GameMeta, nodeId: string, q: Question) {
    const s = get(game)
    const key = `${nodeId}:${q.id}`
    if (s.done.includes(key)) return
    put(game, apply({ ...s, done: [...s.done, key] }, q.give, q.set))
  },
  accuse(game: GameMeta, answer: { who: string; how: string; why: string }) {
    const s = get(game)
    const ending = game.accusation.judge(answer, (id) => s.owned.includes(id))
    put(game, enter(game, s, ending))
  },
  restore(game: GameMeta, actId: string) {
    const s = get(game)
    const cp = s.checkpoints[actId]
    if (!cp) return
    const idx = game.acts.findIndex((a) => a.id === actId)
    const checkpoints: Record<string, Snapshot> = {}
    game.acts.slice(0, idx + 1).forEach((a) => s.checkpoints[a.id] && (checkpoints[a.id] = s.checkpoints[a.id]))
    put(game, { ...s, ...cp, checkpoints, unseen: [] })
  },
  markAllSeen(game: GameMeta) {
    const s = get(game)
    if (s.unseen.length) put(game, { ...s, unseen: [] })
  },
  markSeen(game: GameMeta, id: string) {
    const s = get(game)
    if (s.unseen.includes(id)) put(game, { ...s, unseen: s.unseen.filter((x) => x !== id) })
  },
  reset(game: GameMeta) {
    store.set((st) => {
      const games = { ...st.games }
      delete games[game.id]
      return { games }
    })
  },
}

/** Fills in the player's name and gendered word forms: {{name}} and {{his|her}}. */
export function personalise(text: string, gender: Gender | null, names: Record<Gender, string>): string {
  const g = gender ?? 'm'
  return text.replace(/\{\{([^{}]*)\}\}/g, (_, body: string) => {
    if (body === 'name') return names[g]
    const [m, f = m] = body.split('|')
    return g === 'm' ? m : f
  })
}

/** Splits a text file into sections that start with a line "@@ id". */
export function splitSections(raw: string): Record<string, string> {
  const out: Record<string, string> = {}
  let id: string | null = null
  let buf: string[] = []
  const flush = () => {
    if (id) out[id] = buf.join('\n').trim()
  }
  for (const line of raw.replace(/\r\n?/g, '\n').split('\n')) {
    const m = /^@@\s+(\S+)\s*$/.exec(line)
    if (m) {
      flush()
      id = m[1]
      buf = []
    } else buf.push(line)
  }
  flush()
  return out
}
