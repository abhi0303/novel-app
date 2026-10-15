import type { Lang, Localized } from '../stories/types'

export type Gender = 'm' | 'f'

/** A condition over what the player owns (evidence, reports…) and which flags are set. */
export interface Cond {
  has?: string[]
  hasAny?: string[]
  lacks?: string[]
  flags?: string[]
  notFlags?: string[]
  /** At least / fewer than n of these flags are set. */
  countAtLeast?: { flags: string[]; n: number }
  countBelow?: { flags: string[]; n: number }
}

interface Effects {
  /** Item ids (evidence, testimony, observations, reports) added to the casebook. */
  give?: string[]
  set?: string[]
}

export interface Hotspot extends Effects {
  id: string
  /** Position on the image, in percent of width / height. */
  x: number
  y: number
  label: Localized
  /** Section id of the text shown when examined. */
  text: string
  /** Only shown when this holds (lets one spot have variants). */
  show?: Cond
}

export interface Option extends Effects {
  label: Localized
  next: string
  /** Hidden unless this holds. */
  when?: Cond
}

export interface Question extends Effects {
  id: string
  label: Localized
  text: string
  /** Locked (shown with a padlock) unless this holds. */
  when?: Cond
  /** Hidden entirely unless this holds. */
  show?: Cond
}

interface Base {
  act: string
}

export type GameNode =
  | (Base & { kind: 'player'; text: string; next: string })
  | (Base & Effects & { kind: 'story'; text: string; image?: string; next: string })
  | (Base & { kind: 'choice'; text?: string; image?: string; prompt: Localized; options: Option[] })
  | (Base & { kind: 'investigate'; text: string; image: string; spots: Hotspot[]; need?: string[]; next: string })
  | (Base & Effects & { kind: 'interview'; person: string; text: string; questions: Question[]; next: string })
  | (Base & { kind: 'route'; routes: { when: Cond; next: string }[]; next: string })
  | (Base & { kind: 'accuse'; text: string })
  | (Base & { kind: 'ending'; ending: string; text: string; image?: string })

export type ItemKind = 'evidence' | 'testimony' | 'observation'

export interface Item {
  id: string
  kind: ItemKind
  title: Localized
  text: Localized
  /** A crop of a scene image used as the thumbnail. */
  pic?: { image: string; x: number; y: number }
  /** Day (1 = Saturday) and time, for the timeline tab. */
  time?: [number, string]
}

export interface Report {
  id: string
  title: Localized
  by: Localized
  text: string
}

export interface Person {
  id: string
  name: Localized
  role: Localized
  summary: Localized
}

export interface Act {
  id: string
  label: Localized
  title: Localized
  /** The node where this act (and its checkpoint) starts. */
  start: string
}

export interface Ending {
  id: string
  title: Localized
  justice: boolean
}

export interface AccuseChoice {
  id: string
  label: Localized
}

export interface Accusation {
  who: AccuseChoice[]
  how: AccuseChoice[]
  why: AccuseChoice[]
  /** Returns the ending node to jump to. `who` is 'none' when the player names nobody. */
  judge: (a: { who: string; how: string; why: string }, owns: (id: string) => boolean) => string
}

export interface GameMeta {
  id: string
  title: Localized
  tagline: Localized
  blurb: Localized
  genres: Localized[]
  cover: string
  coverPosition?: string
  minutes: number
  /** Names the player can choose from. */
  players: Record<Gender, string>
  acts: Act[]
  nodes: Record<string, GameNode>
  items: Item[]
  reports: Report[]
  people: Person[]
  endings: Ending[]
  accusation: Accusation
  images: Record<string, string>
  /** Raw text of every section (story, hotspots, answers, reports) for a language. */
  loadText: (lang: Lang) => Promise<Record<string, string>>
}
