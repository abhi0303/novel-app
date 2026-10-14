import { Link, useParams } from 'react-router-dom'
import { getStory } from '../stories'
import { useT } from '../i18n/strings'
import { useSettings } from '../state/settings'
import { resetProgress, useProgress } from '../state/progress'
import type { Chapter } from '../stories/types'
import LangToggle from '../components/LangToggle'
import Icon from '../components/Icon'
import NotFound from './NotFound'

export default function StoryHome() {
  const { storyId } = useParams()
  const story = getStory(storyId)
  const t = useT()
  const { lang } = useSettings()
  const progress = useProgress(story?.id ?? '')
  if (!story) return <NotFound />

  const first = story.chapters[0]
  const resumeId = progress.lastChapterId ?? first.id
  const allDone = progress.finished.length === story.chapters.length
  const cta = allDone ? t.readAgain : progress.lastChapterId ? t.continueReading : t.startReading
  const ctaTarget = allDone ? first.id : resumeId

  const groups: { key: string; heading?: string; items: Chapter[] }[] = []
  for (const c of story.chapters) {
    const part = story.parts.find((p) => p.id === c.partId)
    const key = part?.id ?? `solo-${c.id}`
    const last = groups[groups.length - 1]
    if (last && last.key === key) last.items.push(c)
    else groups.push({ key, heading: part ? `${part.label[lang]} · ${part.title[lang]}` : undefined, items: [c] })
  }

  const onReset = () => {
    if (window.confirm(t.resetConfirm)) resetProgress(story.id)
  }

  return (
    <div className="page">
      <header className="topbar">
        <Link to="/" className="icon-btn" aria-label={t.backToLibrary}>
          <Icon name="back" />
        </Link>
        <div className="topbar-title">{t.library}</div>
        <LangToggle />
      </header>

      {story.poster ? (
        <div className="hero hero-poster">
          <div className="hero-poster-bg" style={{ backgroundImage: `url(${story.poster})` }} />
          <img src={story.poster} alt={story.title[lang]} />
          <div className="hero-fade" />
        </div>
      ) : (
        <div className="hero">
          <img src={story.cover} alt="" style={{ objectPosition: story.coverPosition }} />
          <div className="hero-fade" />
        </div>
      )}

      <main className="container story-main">
        <div className="chips">
          {story.genres.map((g) => (
            <span key={g.en} className="chip">
              {g[lang]}
            </span>
          ))}
        </div>
        <h1 className="story-title">{story.title[lang]}</h1>
        <p className="story-tagline">{story.tagline[lang]}</p>
        <p className="story-blurb">{story.blurb[lang]}</p>

        <div className="cta-row">
          <Link className="btn btn-big" to={`/story/${story.id}/read/${ctaTarget}`}>
            <Icon name="book" size={18} /> {cta}
          </Link>
          <Link className="btn btn-ghost btn-big" to={`/story/${story.id}/notebook`}>
            <Icon name="note" size={18} /> {t.notebook}
          </Link>
        </div>

        <div className="meta-line">
          {t.readProgress(progress.finished.length, story.chapters.length)}
        </div>

        <h2 className="section-title">{t.chapters}</h2>
        <nav className="toc">
          {groups.map((g) => (
            <div key={g.key} className="toc-group">
              {g.heading && <div className="toc-part">{g.heading}</div>}
              <ol>
                {g.items.map((c) => {
                  const done = progress.finished.includes(c.id)
                  const current = progress.lastChapterId === c.id
                  return (
                    <li key={c.id}>
                      <Link to={`/story/${story.id}/read/${c.id}`} className={`toc-item ${current ? 'current' : ''}`}>
                        <span className="toc-label">{c.label[lang]}</span>
                        <span className="toc-name">{c.title[lang]}</span>
                        <span className="toc-state" aria-hidden="true">
                          {done && <Icon name="check" size={16} />}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ol>
            </div>
          ))}
        </nav>

        {progress.maxIndex >= 0 && (
          <button className="link-btn" onClick={onReset}>
            {t.resetProgress}
          </button>
        )}
      </main>
    </div>
  )
}
