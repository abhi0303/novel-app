import { Link } from 'react-router-dom'
import { stories } from '../stories'
import { useT } from '../i18n/strings'
import { useSettings } from '../state/settings'
import { useProgress } from '../state/progress'
import type { StoryMeta } from '../stories/types'
import LangToggle from '../components/LangToggle'
import InstallButton from '../components/InstallButton'

function StoryCard({ story }: { story: StoryMeta }) {
  const t = useT()
  const { lang } = useSettings()
  const progress = useProgress(story.id)
  const done = progress.finished.length
  const total = story.chapters.length
  return (
    <Link to={`/story/${story.id}`} className="story-card">
      <img src={story.cover} alt="" className="story-card-cover" style={{ objectPosition: story.coverPosition }} />
      <div className="story-card-body">
        <div className="chips">
          {story.genres.map((g) => (
            <span key={g.en} className="chip">
              {g[lang]}
            </span>
          ))}
        </div>
        <h2>{story.title[lang]}</h2>
        <p className="muted">{story.tagline[lang]}</p>
        <div className="meta-line">
          {total} {t.chaptersCount} · ~{Math.round(story.readingMinutes / 60)} h
        </div>
        {progress.maxIndex >= 0 && (
          <div className="bar" aria-label={t.readProgress(done, total)}>
            <span style={{ width: `${(done / total) * 100}%` }} />
          </div>
        )}
      </div>
    </Link>
  )
}

export default function Library() {
  const t = useT()
  return (
    <div className="page">
      <header className="lib-head">
        <div className="brand">
          <img src="/logo.svg" alt="" width={36} height={36} />
          <div>
            <div className="brand-name">{t.appName}</div>
            <div className="brand-tag">{t.appTagline}</div>
          </div>
        </div>
        <div className="head-actions">
          <InstallButton />
          <LangToggle />
        </div>
      </header>

      <main className="container">
        <h1 className="lib-title">{t.library}</h1>
        <p className="muted lib-intro">{t.libraryIntro}</p>
        <div className="story-grid">
          {stories.map((s) => (
            <StoryCard key={s.id} story={s} />
          ))}
          <div className="story-card story-card-soon">
            <div className="soon-mark" aria-hidden="true">
              ?
            </div>
            <h2>{t.moreSoon}</h2>
            <p className="muted">{t.moreSoonText}</p>
          </div>
        </div>
      </main>
    </div>
  )
}
