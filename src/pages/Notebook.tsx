import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { getStory } from '../stories'
import { useT } from '../i18n/strings'
import { useSettings } from '../state/settings'
import { useProgress } from '../state/progress'
import LangToggle from '../components/LangToggle'
import Icon from '../components/Icon'
import { WhosWhoList } from '../components/WhosWho'
import NotFound from './NotFound'

const TABS = ['clues', 'people', 'suspects'] as const
type Tab = (typeof TABS)[number]

export default function Notebook() {
  const { storyId } = useParams()
  const story = getStory(storyId)
  const t = useT()
  const { lang } = useSettings()
  const progress = useProgress(story?.id ?? '')
  const [params] = useSearchParams()
  const [tab, setTab] = useState<Tab>(() => (TABS.includes(params.get('tab') as Tab) ? (params.get('tab') as Tab) : 'clues'))
  if (!story) return <NotFound />

  const chapterIndex = (id: string) => story.chapters.findIndex((c) => c.id === id)
  const unlocked = story.clues.filter((c) => chapterIndex(c.chapterId) <= progress.maxIndex)
  const hidden = story.clues.length - unlocked.length

  return (
    <div className="page">
      <header className="topbar">
        <Link to={`/story/${story.id}`} className="icon-btn" aria-label={t.backToStory}>
          <Icon name="back" />
        </Link>
        <div className="topbar-title">
          <span className="topbar-kicker">{story.title[lang]}</span>
          <span className="topbar-name">{t.notebook}</span>
        </div>
        <LangToggle />
      </header>

      <main className="container notebook">
        <h1 className="story-title">{t.notebook}</h1>
        <p className="muted">{t.notebookIntro}</p>

        <div className="seg seg-wide" role="tablist">
          <button role="tab" aria-selected={tab === 'clues'} className={tab === 'clues' ? 'seg-on' : ''} onClick={() => setTab('clues')}>
            {t.clues} <span className="cb-n">{unlocked.length}</span>
          </button>
          <button role="tab" aria-selected={tab === 'people'} className={tab === 'people' ? 'seg-on' : ''} onClick={() => setTab('people')}>
            {t.whosWho}
          </button>
          <button
            role="tab"
            aria-selected={tab === 'suspects'}
            className={tab === 'suspects' ? 'seg-on' : ''}
            onClick={() => setTab('suspects')}
          >
            {t.suspects} <span className="cb-n">{story.suspects.length}</span>
          </button>
        </div>

        {tab === 'clues' && (
          <div className="clue-list">
            {unlocked.length === 0 && <p className="muted">{t.noClues}</p>}
            {unlocked.map((c) => {
              const chapter = story.chapters[chapterIndex(c.chapterId)]
              return (
                <aside key={c.id} className="clue">
                  <div className="clue-label">
                    {t.clue} {story.clues.indexOf(c) + 1} ·{' '}
                    <Link to={`/story/${story.id}/read/${chapter.id}`}>{chapter.label[lang]}</Link>
                  </div>
                  <div className="clue-title">{c.title[lang]}</div>
                  <p>{c.text[lang]}</p>
                </aside>
              )
            })}
            {hidden > 0 && (
              <div className="clue clue-locked">
                <Icon name="lock" size={16} /> {t.lockedClues(hidden)}
              </div>
            )}
          </div>
        )}

        {tab === 'people' && (
          <>
            <p className="muted who-intro">{t.whosWhoIntro}</p>
            <WhosWhoList story={story} lang={lang} />
          </>
        )}

        {tab === 'suspects' && (
          <div className="suspect-grid">
            {story.suspects.map((s) => (
              <article key={s.id} className="suspect">
                <div className="suspect-avatar" aria-hidden="true">
                  {s.name
                    .replace('Dr. ', '')
                    .split(' ')
                    .map((w) => w[0])
                    .join('')}
                </div>
                <div>
                  <h3>{s.name}</h3>
                  <div className="suspect-role">{s.role[lang]}</div>
                  <p>{s.summary[lang]}</p>
                  <div className="suspect-claim-label">{t.claim}</div>
                  <blockquote className="suspect-claim">{s.claim[lang]}</blockquote>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
