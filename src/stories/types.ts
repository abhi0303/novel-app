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
  guess?: GuessGate
  /** Scene illustration urls keyed by id. */
  scenes: Record<string, string>
  /** Loads a chapter's raw markup for a language. */
  loadChapter: (lang: Lang, chapterId: string) => Promise<string>
}
