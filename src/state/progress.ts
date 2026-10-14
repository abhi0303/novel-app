import { persistedStore } from './persisted'

export interface StoryProgress {
  lastChapterId: string | null
  /** Scroll position within the last chapter, 0–1. */
  lastScroll: number
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
