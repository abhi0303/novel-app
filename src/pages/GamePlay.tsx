import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getGame } from '../games'
import { actions, personalise, test, useGameSave, type GameSave } from '../games/engine'
import type { GameMeta, GameNode, Gender, Hotspot } from '../games/types'
import type { Lang } from '../stories/types'
import { useT } from '../i18n/strings'
import { useSettings } from '../state/settings'
import LangToggle from '../components/LangToggle'
import Icon from '../components/Icon'
import { SceneFigure } from '../components/ChapterBody'
import { GameProse, useGameText } from '../components/game/GameProse'
import Casebook from '../components/game/Casebook'
import CheckpointsSheet, { CheckpointList, EndingsFound } from '../components/game/Checkpoints'
import NotFound from './NotFound'

type Ctx = { game: GameMeta; save: GameSave; lang: Lang; text: Record<string, string> }

function Prose({ ctx, section }: { ctx: Ctx; section: string }) {
  return <GameProse game={ctx.game} text={ctx.text} section={section} gender={ctx.save.gender} lang={ctx.lang} />
}

function NewItems({ ctx, ids }: { ctx: Ctx; ids: string[] }) {
  const t = useT()
  const names = ids
    .map((id) => ctx.game.items.find((i) => i.id === id)?.title ?? ctx.game.reports.find((r) => r.id === id)?.title)
    .filter(Boolean)
    .map((l) => personalise(l![ctx.lang], ctx.save.gender, ctx.game.players))
  if (!names.length) return null
  return (
    <div className="added">
      <Icon name="case" size={16} /> {t.addedToCasebook}: <strong>{names.join(', ')}</strong>
    </div>
  )
}

function PlayerNode({ ctx, node }: { ctx: Ctx; node: Extract<GameNode, { kind: 'player' }> }) {
  const t = useT()
  return (
    <>
      <Prose ctx={ctx} section={node.text} />
      <h2 className="choice-prompt">{t.choosePlayer}</h2>
      <div className="choice-list">
        {(['m', 'f'] as Gender[]).map((g) => (
          <button key={g} className="choice-btn" onClick={() => actions.chooseGender(ctx.game, g, node.next)}>
            Dr. {ctx.game.players[g]} Kamat
          </button>
        ))}
      </div>
    </>
  )
}

function StoryNode({ ctx, node }: { ctx: Ctx; node: Extract<GameNode, { kind: 'story' }> }) {
  const t = useT()
  return (
    <>
      {node.image && <SceneFigure src={ctx.game.images[node.image]} eager />}
      <Prose ctx={ctx} section={node.text} />
      <NewItems ctx={ctx} ids={node.give ?? []} />
      <div className="game-actions">
        <button className="btn btn-big" onClick={() => actions.go(ctx.game, node.next)}>
          {t.continue} <Icon name="next" size={18} />
        </button>
      </div>
    </>
  )
}

function ChoiceNode({ ctx, node }: { ctx: Ctx; node: Extract<GameNode, { kind: 'choice' }> }) {
  const p = (s: string) => personalise(s, ctx.save.gender, ctx.game.players)
  const options = node.options.filter((o) => test(o.when, ctx.save))
  return (
    <>
      {node.image && <SceneFigure src={ctx.game.images[node.image]} eager />}
      {node.text && <Prose ctx={ctx} section={node.text} />}
      <h2 className="choice-prompt">{p(node.prompt[ctx.lang])}</h2>
      <div className="choice-list">
        {options.map((o, i) => (
          <button key={i} className="choice-btn" onClick={() => actions.choose(ctx.game, o)}>
            {p(o.label[ctx.lang])}
          </button>
        ))}
      </div>
    </>
  )
}

function InvestigateNode({ ctx, node, nodeId }: { ctx: Ctx; node: Extract<GameNode, { kind: 'investigate' }>; nodeId: string }) {
  const t = useT()
  const p = (s: string) => personalise(s, ctx.save.gender, ctx.game.players)
  // Which spot variants exist is decided once, when the player arrives.
  const [spots] = useState<Hotspot[]>(() => node.spots.filter((s) => test(s.show, ctx.save)))
  const [open, setOpen] = useState<Hotspot | null>(null)
  const done = (s: Hotspot) => ctx.save.done.includes(`${nodeId}:${s.id}`)
  const count = spots.filter(done).length
  const ready = (node.need ?? []).every((id) => ctx.save.done.includes(`${nodeId}:${id}`))

  const examine = (s: Hotspot) => {
    actions.examine(ctx.game, nodeId, s)
    setOpen(s)
  }

  return (
    <>
      <Prose ctx={ctx} section={node.text} />
      <div className="hs-wrap">
        <img src={ctx.game.images[node.image]} alt="" className="hs-img" />
        {spots.map((s, i) => (
          <button
            key={s.id}
            className={`hs${done(s) ? ' hs-done' : ''}`}
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            onClick={() => examine(s)}
            aria-label={`${t.examine}: ${p(s.label[ctx.lang])}`}
          >
            {done(s) ? <Icon name="check" size={14} /> : i + 1}
          </button>
        ))}
      </div>
      <div className="meta-line">{t.examined(count, spots.length)}</div>
      <ol className="hs-list">
        {spots.map((s, i) => (
          <li key={s.id}>
            <button className={`hs-item${done(s) ? ' hs-item-done' : ''}`} onClick={() => examine(s)}>
              <span className="hs-num">{done(s) ? <Icon name="check" size={14} /> : i + 1}</span>
              {p(s.label[ctx.lang])}
            </button>
          </li>
        ))}
      </ol>
      <div className="game-actions">
        <button className="btn btn-big" disabled={!ready} onClick={() => actions.go(ctx.game, node.next)}>
          {t.doneExamining} <Icon name="next" size={18} />
        </button>
        {!ready && <div className="meta-line">{t.needToExamine}</div>}
      </div>

      {open && (
        <div className="sheet-backdrop" onClick={() => setOpen(null)}>
          <div className="sheet sheet-tall sheet-prose" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-head">
              <h2>{p(open.label[ctx.lang])}</h2>
              <button className="icon-btn" onClick={() => setOpen(null)} aria-label={t.close}>
                <Icon name="close" />
              </button>
            </div>
            <Prose ctx={ctx} section={open.text} />
            <NewItems ctx={ctx} ids={open.give ?? []} />
            <div className="game-actions">
              <button className="btn" onClick={() => setOpen(null)}>
                {t.continue}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function InterviewNode({ ctx, node, nodeId }: { ctx: Ctx; node: Extract<GameNode, { kind: 'interview' }>; nodeId: string }) {
  const t = useT()
  const p = (s: string) => personalise(s, ctx.save.gender, ctx.game.players)
  const person = ctx.game.people.find((x) => x.id === node.person)
  const questions = node.questions.filter((q) => test(q.show, ctx.save))
  const asked = (id: string) => ctx.save.done.includes(`${nodeId}:${id}`)
  return (
    <>
      {person && (
        <div className="iv-head">
          <div className="suspect-avatar" aria-hidden="true">
            <Icon name="person" />
          </div>
          <div>
            <h2>{p(person.name[ctx.lang])}</h2>
            <div className="suspect-role">{p(person.role[ctx.lang])}</div>
          </div>
        </div>
      )}
      <Prose ctx={ctx} section={node.text} />
      <NewItems ctx={ctx} ids={node.give ?? []} />
      <div className="iv-list">
        {questions.map((q) => {
          const open = test(q.when, ctx.save)
          if (asked(q.id))
            return (
              <section key={q.id} className="iv-qa">
                <div className="iv-q">{p(q.label[ctx.lang])}</div>
                <Prose ctx={ctx} section={q.text} />
                <NewItems ctx={ctx} ids={q.give ?? []} />
              </section>
            )
          return (
            <button key={q.id} className="iv-ask" disabled={!open} onClick={() => actions.ask(ctx.game, nodeId, q)}>
              <Icon name={open ? 'next' : 'lock'} size={16} />
              <span>
                {p(q.label[ctx.lang])}
                {!open && <span className="iv-locked">{t.locked}</span>}
              </span>
            </button>
          )
        })}
      </div>
      <div className="game-actions">
        <button className="btn btn-ghost" onClick={() => actions.go(ctx.game, node.next)}>
          {t.finishTalking}
        </button>
      </div>
    </>
  )
}

function AccuseNode({ ctx, node }: { ctx: Ctx; node: Extract<GameNode, { kind: 'accuse' }> }) {
  const t = useT()
  const a = ctx.game.accusation
  const p = (s: string) => personalise(s, ctx.save.gender, ctx.game.players)
  const [who, setWho] = useState<string | null>(null)
  const [how, setHow] = useState<string | null>(null)
  const [why, setWhy] = useState<string | null>(null)
  const group = (title: string, list: typeof a.who, value: string | null, set: (v: string) => void) => (
    <fieldset className="ac-group">
      <legend>{title}</legend>
      <div className="ac-options">
        {list.map((c) => (
          <button key={c.id} type="button" className={`guess-option${value === c.id ? ' on' : ''}`} aria-pressed={value === c.id} onClick={() => set(c.id)}>
            {p(c.label[ctx.lang])}
          </button>
        ))}
      </div>
    </fieldset>
  )
  const submit = (answer: { who: string; how: string; why: string }) => {
    if (window.confirm(t.accuseConfirm)) actions.accuse(ctx.game, answer)
  }
  return (
    <>
      <Prose ctx={ctx} section={node.text} />
      <section className="guess ac">
        {group(t.accuseWho, a.who, who, setWho)}
        {group(t.accuseHow, a.how, how, setHow)}
        {group(t.accuseWhy, a.why, why, setWhy)}
        <div className="guess-actions">
          <button className="btn" disabled={!who || !how || !why} onClick={() => submit({ who: who!, how: how!, why: why! })}>
            {t.accuseSubmit}
          </button>
          <button className="btn btn-ghost" onClick={() => submit({ who: 'none', how: '', why: '' })}>
            {t.accuseNone}
          </button>
        </div>
      </section>
    </>
  )
}

function EndingNode({ ctx, node }: { ctx: Ctx; node: Extract<GameNode, { kind: 'ending' }> }) {
  const t = useT()
  const ending = ctx.game.endings.find((e) => e.id === node.ending)!
  return (
    <>
      {node.image && <SceneFigure src={ctx.game.images[node.image]} eager />}
      <div className={`ending-head ${ending.justice ? 'ending-just' : 'ending-fail'}`}>
        <div className="ending-kicker">{ending.justice ? t.justice : t.noJustice}</div>
        <h2>{ending.title[ctx.lang]}</h2>
      </div>
      <Prose ctx={ctx} section={node.text} />
      {!ending.justice && <p className="ending-hidden">{t.hiddenTruth}</p>}
      <section className="ending-actions">
        <h3>{t.reinvestigate}</h3>
        <CheckpointList game={ctx.game} lang={ctx.lang} />
        <EndingsFound game={ctx.game} lang={ctx.lang} />
      </section>
    </>
  )
}

export default function GamePlay() {
  const { gameId } = useParams()
  const game = getGame(gameId)
  const t = useT()
  const { lang } = useSettings()
  const navigate = useNavigate()
  const save = useGameSave(game ?? ({ id: '', acts: [{ start: '' }] } as unknown as GameMeta))
  const text = useGameText(game ?? ({ loadText: async () => ({}) } as unknown as GameMeta), lang)
  const [caseOpen, setCaseOpen] = useState(false)
  const [cpOpen, setCpOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [save.node])

  useEffect(() => {
    if (game && !save.started) navigate(`/game/${game.id}`, { replace: true })
  }, [game, save.started, navigate])

  const node = game?.nodes[save.node]
  const act = useMemo(() => game?.acts.find((a) => a.id === node?.act), [game, node])
  if (!game || !node) return <NotFound />
  const ctx: Ctx | null = text ? { game, save, lang, text } : null

  return (
    <div className="page game">
      <header className="topbar">
        <Link to={`/game/${game.id}`} className="icon-btn" aria-label={t.backToGame}>
          <Icon name="back" />
        </Link>
        <div className="topbar-title">
          <span className="topbar-kicker">{act?.label[lang]}</span>
          <span className="topbar-name">{act?.title[lang]}</span>
        </div>
        <button className="icon-btn cb-btn" onClick={() => setCaseOpen(true)} aria-label={t.casebook}>
          <Icon name="case" />
          {save.unseen.length > 0 && <span className="cb-dot">{save.unseen.length}</span>}
        </button>
        <button className="icon-btn" onClick={() => setCpOpen(true)} aria-label={t.checkpoints}>
          <Icon name="rewind" />
        </button>
        <LangToggle />
      </header>

      <main className="container chapter game-main" key={save.node}>
        {!ctx && <div className="loading" aria-busy="true" />}
        {ctx && node.kind === 'player' && <PlayerNode ctx={ctx} node={node} />}
        {ctx && node.kind === 'story' && <StoryNode ctx={ctx} node={node} />}
        {ctx && node.kind === 'choice' && <ChoiceNode ctx={ctx} node={node} />}
        {ctx && node.kind === 'investigate' && <InvestigateNode ctx={ctx} node={node} nodeId={save.node} />}
        {ctx && node.kind === 'interview' && <InterviewNode ctx={ctx} node={node} nodeId={save.node} />}
        {ctx && node.kind === 'accuse' && <AccuseNode ctx={ctx} node={node} />}
        {ctx && node.kind === 'ending' && <EndingNode ctx={ctx} node={node} />}
      </main>

      {caseOpen && <Casebook game={game} lang={lang} text={text} onClose={() => setCaseOpen(false)} />}
      {cpOpen && <CheckpointsSheet game={game} lang={lang} onClose={() => setCpOpen(false)} />}
    </div>
  )
}
