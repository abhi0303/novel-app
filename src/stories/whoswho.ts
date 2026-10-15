import type { StoryProgress } from '../state/progress'
import type { Character, CharacterNote, CharacterTag, StoryMeta } from './types'

export interface KnownCharacter {
  character: Character
  /** The tag as of the furthest point read. */
  tag: CharacterTag
  /** Later notes the reader has already read past, in story order. */
  notes: CharacterNote[]
}

/**
 * The characters a reader has met so far. A character appears once the chapter that introduces them has been
 * opened; a later note appears only after its chapter has been read to the end or a later chapter opened,
 * because twists are often revealed at the end of a chapter.
 */
export function knownCharacters(story: StoryMeta, progress: StoryProgress) {
  const index = (id: string) => story.chapters.findIndex((c) => c.id === id)
  const opened = (id: string) => index(id) <= progress.maxIndex
  const readPast = (id: string) => progress.finished.includes(id) || index(id) < progress.maxIndex

  const known: KnownCharacter[] = story.characters
    .filter((c) => opened(c.chapterId))
    .sort((a, b) => index(a.chapterId) - index(b.chapterId))
    .map((character) => {
      const notes = (character.later ?? []).filter((n) => readPast(n.chapterId))
      const tag = notes.reduce<CharacterTag>((t, n) => n.tag ?? t, character.tag)
      return { character, tag, notes }
    })

  return {
    main: known.filter((k) => !k.character.minor),
    minor: known.filter((k) => k.character.minor),
    /** How many people the reader hasn't met yet (no names, so nothing is given away). */
    unmet: story.characters.length - known.length,
  }
}
