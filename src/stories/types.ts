export const LANGS = ['en', 'hi'] as const
export type Lang = (typeof LANGS)[number]

/** A string available in every supported language. */
export type Localized = Record<Lang, string>

export interface Part {
  id: string
  label: Localized
  title: Localized
}

export interface Chapter {
  /** Stable id, also the markdown file name (without extension) in content/<lang>/. */
  id: string
  partId: string | null
  /** e.g. "Prologue", "Chapter 3", "Epilogue" */
  label: Localized
  title: Localized
  /** Scene illustration id shown at the top of the chapter. */
  hero: string
}

export interface Clue {
  id: string
  /** Chapter id where the clue is discovered; it unlocks in the notebook once that chapter is reached. */
  chapterId: string
  title: Localized
  text: Localized
}

export interface Suspect {
  id: string
  name: string
  role: Localized
  /** Spoiler-safe summary taken from the opening chapters. */
  summary: Localized
  claim: Localized
}

/** How a character stands in the case. A later note can change it (e.g. when someone becomes a suspect). */
export type CharacterTag = 'lead' | 'victim' | 'missing' | 'suspect' | 'culprit' | 'investigator' | 'witness' | 'family' | 'other'

export interface CharacterNote {
  /** Shown once this chapter has been read to the end (or a later chapter opened), so twists never leak early. */
  chapterId: string
  text: Localized
  tag?: CharacterTag
}

export interface Character {
  id: string
  name: string
  /** Chapter where the reader first meets them. The card appears once that chapter is opened. */
  chapterId: string
  tag: CharacterTag
  /** What they do, with their age where the story gives it. */
  profession: Localized
  /** Who they are to the case and to the others, as known when they first appear. */
  relation: Localized
  /** What the reader learns about them later, in story order. */
  later?: CharacterNote[]
  /** Background people, listed separately after the main cast. */
  minor?: boolean
  /** Face crop from the story's own art, so the card shows the same person as the scenes. Filled in from portraits/<id>.webp. */
  photo?: string
}

export interface GuessGate {
  /** The reader is asked for a guess before opening this chapter. */
  beforeChapterId: string
  /** The chapter after which the result is revealed. */
  revealAfterChapterId: string
  question: Localized
  /** Shown under the question; sets the scene for this story's confrontation. */
  intro: Localized
  options: { id: string; label: string }[]
  /** base64 of the correct option id, so the answer isn't readable at a glance in the source. */
  answer: string
  /** Optional story-specific result lines; the generic UI strings are used otherwise. */
  right?: Localized
  wrong?: Localized
}

export interface StoryMeta {
  id: string
  title: Localized
  tagline: Localized
  blurb: Localized
  genres: Localized[]
  cover: string
  /** CSS object-position for cropping the cover into wide cards, e.g. '50% 40%'. */
  coverPosition?: string
  /** Optional portrait poster, shown whole on the story page. */
  poster?: string
  /** Approximate minutes to read the whole story. */
  readingMinutes: number
  parts: Part[]
  chapters: Chapter[]
  clues: Clue[]
  suspects: Suspect[]
  /** Everyone the reader meets, revealed chapter by chapter in the "Who's who" list. */
  characters: Character[]
  guess?: GuessGate
  /** Scene illustration urls keyed by id. */
  scenes: Record<string, string>
  /** Loads a chapter's raw markup for a language. */
  loadChapter: (lang: Lang, chapterId: string) => Promise<string>
}
