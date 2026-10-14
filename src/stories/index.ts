import type { StoryMeta } from './types'
import kamraNumber7 from './kamra-number-7'
import aakhriGawah from './aakhri-gawah'

/**
 * Every story in the library. To add a story, create a folder next to kamra-number-7
 * (index.ts + content/<lang>/*.md + scenes/*.svg) and list it here.
 */
export const stories: StoryMeta[] = [aakhriGawah, kamraNumber7]

export function getStory(id: string | undefined): StoryMeta | undefined {
  return stories.find((s) => s.id === id)
}
