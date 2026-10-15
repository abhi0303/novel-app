import { useEffect } from 'react'
import { useT } from '../../i18n/strings'
import { actions, useGameSave } from '../../games/engine'
import type { GameMeta } from '../../games/types'
import type { Lang } from '../../stories/types'
import Icon from '../Icon'

/** The list of acts the player can go back to. Used in a sheet and on ending screens. */
export function CheckpointList({ game, lang, onPick }: { game: GameMeta; lang: Lang; onPick?: () => void }) {
  const t = useT()
  const save = useGameSave(game)
  const currentAct = game.nodes[save.node]?.act
  return (
    <ol className="cp-list">
      {game.acts.map((a) => {
        const reached = !!save.checkpoints[a.id]
        const here = a.id === currentAct && save.started
        return (
          <li key={a.id} className={`cp${reached ? '' : ' cp-locked'}${here ? ' cp-here' : ''}`}>
            <div className="cp-text">
              <span className="cp-label">{a.label[lang]}</span>
              <span className="cp-title">{a.title[lang]}</span>
              {here && <span className="cp-note">{t.current}</span>}
              {!reached && <span className="cp-note">{t.notReached}</span>}
            </div>
            {reached && (
              <button
                className="btn btn-small btn-ghost"
                onClick={() => {
                  actions.restore(game, a.id)
                  onPick?.()
                }}
              >
                <Icon name="rewind" size={16} /> {t.checkpointHere}
              </button>
            )}
          </li>
        )
      })}
    </ol>
  )
}

export function EndingsFound({ game, lang }: { game: GameMeta; lang: Lang }) {
  const t = useT()
  const save = useGameSave(game)
  return (
    <div className="endings-found">
      <div className="meta-line">{t.endingsFound(save.endings.length, game.endings.length)}</div>
      <ul>
        {game.endings.map((e) => (
          <li key={e.id} className={save.endings.includes(e.id) ? (e.justice ? 'e-just' : 'e-found') : 'e-hidden'}>
            {save.endings.includes(e.id) ? e.title[lang] : '? ? ?'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function CheckpointsSheet({ game, lang, onClose }: { game: GameMeta; lang: Lang; onClose: () => void }) {
  const t = useT()
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet sheet-tall" role="dialog" aria-modal="true" aria-label={t.checkpoints} onClick={(e) => e.stopPropagation()}>
        <div className="sheet-head">
          <h2>{t.checkpoints}</h2>
          <button className="icon-btn" onClick={onClose} aria-label={t.close}>
            <Icon name="close" />
          </button>
        </div>
        <p className="muted cp-intro">{t.checkpointsIntro}</p>
        <CheckpointList game={game} lang={lang} onPick={onClose} />
        <EndingsFound game={game} lang={lang} />
      </div>
    </div>
  )
}
