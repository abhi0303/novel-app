import type { GameMeta } from './types'
import neelkanth from './neelkanth'

/** Interactive cases. Each lives in its own folder next to this file. */
export const games: GameMeta[] = [neelkanth]

export function getGame(id: string | undefined): GameMeta | undefined {
  return games.find((g) => g.id === id)
}
