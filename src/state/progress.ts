import { persistedStore } from './persisted'
import type { Lang } from '../stories/types'

export type MarkStyle = 'highlight' | 'underline' | 'bookmark'

/** The reader's own marker: one per story, cleared when they open a different chapter. */
export interface ReadingMark {
  chapterId: string
  /** Language the marker was placed in; offsets only apply to that language's text. */
  lang: Lang
  /** Index of the marked block in the parsed chapter, and how many blocks the chapter had. */
  block: number
  blocks: number
  /** Character range inside the block. Absent when the whole paragraph is marked. */
  start?: number
  end?: number
  /** The marked words, or the opening of the marked paragraph. */
  text: string
  style: MarkStyle
}

export interface StoryProgress {
  lastChapterId: string | null
  /** Scroll position within the last chapter, 0–1. */
  lastScroll: number
  /** First block on screen in the last chapter (and in which language), for an exact "you left off here". */
  lastBlock?: { block: number; blocks: number; lang: Lang } | null
  mark?: ReadingMark | null
  /** Furthest chapter index opened; unlocks notebook clues. */
  maxIndex: number
  /** Chapter ids read to the end. */
  finished: string[]
  guess: string | null
}

const EMPTY: StoryProgress = { lastChapterId: null, lastScroll: 0, maxIndex: -1, finished: [], guess: null }

type ProgressMap = Record<string, StoryProgress>

const store = persistedStore<{ stories: ProgressMap }>('kahani.progress', { stories: {} })

export function useProgress(storyId: string): StoryProgress {
  return store.use().stories[storyId] ?? EMPTY
}

export function updateProgress(storyId: string, patch: (prev: StoryProgress) => Partial<StoryProgress>) {
  store.set((s) => {
    const prev = s.stories[storyId] ?? EMPTY
    return { stories: { ...s.stories, [storyId]: { ...prev, ...patch(prev) } } }
  })
}

export function resetProgress(storyId: string) {
  store.set((s) => {
    const stories = { ...s.stories }
    delete stories[storyId]
    return { stories }
  })
}
