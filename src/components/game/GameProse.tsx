import { useEffect, useMemo, useState } from 'react'
import { parseMarkup } from '../../lib/markup'
import ChapterBody from '../ChapterBody'
import { personalise } from '../../games/engine'
import type { GameMeta, Gender } from '../../games/types'
import type { Lang } from '../../stories/types'

/** Loads every text section of a game for the current language. */
export function useGameText(game: GameMeta, lang: Lang) {
  const [state, setState] = useState<{ lang: Lang; map: Record<string, string> } | null>(null)
  useEffect(() => {
    let alive = true
    game.loadText(lang).then((map) => alive && setState({ lang, map }))
    return () => {
      alive = false
    }
  }, [game, lang])
  return state?.lang === lang ? state.map : null
}

/** Renders one text section with the player's name and gendered forms filled in. */
export function GameProse({
  game,
  text,
  section,
  gender,
  lang,
}: {
  game: GameMeta
  text: Record<string, string>
  section: string
  gender: Gender | null
  lang: Lang
}) {
  const raw = text[section]
  const blocks = useMemo(() => (raw ? parseMarkup(personalise(raw, gender, game.players)) : []), [raw, gender, game])
  const source = useMemo(() => ({ scenes: game.images, clues: [] }), [game])
  if (raw === undefined) return <p className="muted">[{section}]</p>
  return <ChapterBody blocks={blocks} story={source} lang={lang} />
}

/** A short localized string with name / gender placeholders. */
export function usePersonal(game: GameMeta, gender: Gender | null) {
  return (s: string) => personalise(s, gender, game.players)
}
