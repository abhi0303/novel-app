import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getGame } from '../games'
import { actions, useGameSave } from '../games/engine'
import type { GameMeta } from '../games/types'
import { useT } from '../i18n/strings'
import { useSettings } from '../state/settings'
import LangToggle from '../components/LangToggle'
import Icon from '../components/Icon'
import CheckpointsSheet, { EndingsFound } from '../components/game/Checkpoints'
import NotFound from './NotFound'

export default function GameHome() {
  const { gameId } = useParams()
  const game = getGame(gameId)
  const t = useT()
  const { lang } = useSettings()
  const navigate = useNavigate()
  const save = useGameSave(game ?? ({ id: '', acts: [{ start: '' }] } as unknown as GameMeta))
  const [cpOpen, setCpOpen] = useState(false)
  if (!game) return <NotFound />

  const finished = game.nodes[save.node]?.kind === 'ending'
  const start = () => {
    actions.newGame(game)
    navigate(`/game/${game.id}/play`)
  }
  const restart = () => {
    if (window.confirm(t.restartConfirm)) start()
  }

  return (
    <div className="page">
      <header className="topbar">
        <Link to="/" className="icon-btn" aria-label={t.backToLibrary}>
          <Icon name="back" />
        </Link>
        <div className="topbar-title">{t.games}</div>
        <LangToggle />
      </header>

      <div className="hero hero-poster">
        <div className="hero-poster-bg" style={{ backgroundImage: `url(${game.cover})` }} />
        <img src={game.cover} alt={game.title[lang]} />
        <div className="hero-fade" />
      </div>

      <main className="container story-main">
        <div className="chips">
          <span className="chip chip-accent">{t.interactive}</span>
          {game.genres.map((g) => (
            <span key={g.en} className="chip">
              {g[lang]}
            </span>
          ))}
        </div>
        <h1 className="story-title">{game.title[lang]}</h1>
        <p className="story-tagline">{game.tagline[lang]}</p>
        <p className="story-blurb">{game.blurb[lang]}</p>

        <div className="cta-row">
          {!save.started ? (
            <button className="btn btn-big" onClick={start}>
              {t.playNew}
            </button>
          ) : (
            <>
              <Link className="btn btn-big" to={`/game/${game.id}/play`}>
                {finished ? t.reinvestigate : t.playContinue}
              </Link>
              <button className="btn btn-ghost" onClick={() => setCpOpen(true)}>
                <Icon name="rewind" size={16} /> {t.checkpoints}
              </button>
            </>
          )}
        </div>
        {save.started && (
          <button className="link-btn" onClick={restart}>
            {t.startOver}
          </button>
        )}

        <h2 className="section-title">{t.howToPlay}</h2>
        <ul className="how-list">
          {t.howToPlayItems.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>

        <EndingsFound game={game} lang={lang} />
      </main>

      {cpOpen && <CheckpointsSheet game={game} lang={lang} onClose={() => setCpOpen(false)} />}
    </div>
  )
}
