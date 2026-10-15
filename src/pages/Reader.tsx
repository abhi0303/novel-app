import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getStory } from '../stories'
import { parseMarkup, type Block } from '../lib/markup'
import { useT } from '../i18n/strings'
import { useSettings } from '../state/settings'
import { updateProgress, useProgress } from '../state/progress'
import ChapterBody, { SceneFigure } from '../components/ChapterBody'
import { GuessGate, GuessResult } from '../components/Guess'
import SettingsSheet from '../components/SettingsSheet'
import WhosWhoSheet from '../components/WhosWho'
import LangToggle from '../components/LangToggle'
import Icon from '../components/Icon'
import NotFound from './NotFound'

type Loaded = { key: string; blocks: Block[] } | { key: string; error: true }

function scrollRatio() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  return max <= 0 ? 1 : Math.min(1, Math.max(0, window.scrollY / max))
}

export default function Reader() {
  const { storyId, chapterId } = useParams()
  const story = getStory(storyId)
  const t = useT()
  const { lang } = useSettings()
  const progress = useProgress(story?.id ?? '')
  const [loaded, setLoaded] = useState<Loaded | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [showPeople, setShowPeople] = useState(false)
  const barRef = useRef<HTMLSpanElement>(null)
  const ratioRef = useRef(0)
  const pendingScroll = useRef<number | null>(null)
  const prevChapter = useRef<string | undefined>(undefined)

  const index = story?.chapters.findIndex((c) => c.id === chapterId) ?? -1
  const chapter = index >= 0 ? story!.chapters[index] : undefined
  const key = `${lang}:${chapterId}`
  const gated = !!story?.guess && story.guess.beforeChapterId === chapterId && !progress.guess

  // Decide where to land: resume a saved position, keep place on a language switch, else the top.
  if (prevChapter.current !== chapterId) {
    pendingScroll.current = progress.lastChapterId === chapterId ? progress.lastScroll : 0
    prevChapter.current = chapterId
  } else if (loaded && loaded.key !== key && pendingScroll.current === null) {
    pendingScroll.current = ratioRef.current
  }

  useEffect(() => {
    if (!story || !chapter) return
    let cancelled = false
    story
      .loadChapter(lang, chapter.id)
      .then((raw) => !cancelled && setLoaded({ key, blocks: parseMarkup(raw) }))
      .catch(() => !cancelled && setLoaded({ key, error: true }))
    return () => {
      cancelled = true
    }
  }, [story, chapter, lang, key])

  useEffect(() => {
    // A chapter behind the guess gate doesn't count as reached (its clues stay locked) until the guess is made.
    if (!story || index < 0 || gated) return
    const id = story.chapters[index].id
    updateProgress(story.id, (p) => ({
      lastChapterId: id,
      lastScroll: p.lastChapterId === id ? p.lastScroll : 0,
      maxIndex: Math.max(p.maxIndex, index),
    }))
  }, [story, index, gated])

  const ready = loaded?.key === key

  useLayoutEffect(() => {
    if (!ready || pendingScroll.current === null) return
    const max = document.documentElement.scrollHeight - window.innerHeight
    window.scrollTo(0, Math.max(0, pendingScroll.current * max))
    pendingScroll.current = null
  }, [ready, key, gated])

  useEffect(() => {
    if (!story || !chapter || !ready || gated) return
    let frame = 0
    let saveTimer: number | undefined
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const r = scrollRatio()
        ratioRef.current = r
        if (barRef.current) barRef.current.style.width = `${r * 100}%`
        window.clearTimeout(saveTimer)
        saveTimer = window.setTimeout(() => {
          updateProgress(story.id, (p) => ({
            lastScroll: r,
            finished: r > 0.96 && !p.finished.includes(chapter.id) ? [...p.finished, chapter.id] : p.finished,
          }))
        }, 300)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
      window.clearTimeout(saveTimer)
    }
  }, [story, chapter, ready, gated])

  if (!story || !chapter) return <NotFound />

  const part = story.parts.find((p) => p.id === chapter.partId)
  const prev = story.chapters[index - 1]
  const next = story.chapters[index + 1]
  const isLast = !next
  const showResult = story.guess?.revealAfterChapterId === chapter.id

  return (
    <div className="page reader">
      <header className="topbar">
        <Link to={`/story/${story.id}`} className="icon-btn" aria-label={t.backToStory}>
          <Icon name="list" />
        </Link>
        <div className="topbar-title">
          <span className="topbar-kicker">{chapter.label[lang]}</span>
          <span className="topbar-name">{chapter.title[lang]}</span>
        </div>
        <LangToggle />
        <button className="icon-btn" onClick={() => setShowPeople(true)} aria-label={t.whosWho} title={t.whosWho}>
          <Icon name="people" />
        </button>
        <button className="icon-btn" onClick={() => setShowSettings(true)} aria-label={t.settings}>
          <Icon name="text" />
        </button>
        <div className="readbar" aria-hidden="true">
          <span ref={barRef} />
        </div>
      </header>

      <article className="container chapter" lang={lang === 'hi' ? 'hi-Latn' : 'en'}>
        <header className="chapter-head">
          {part && (
            <div className="chapter-part">
              {part.label[lang]} · {part.title[lang]}
            </div>
          )}
          <div className="chapter-label">{chapter.label[lang]}</div>
          <h1 className="chapter-title">{chapter.title[lang]}</h1>
        </header>

        {gated ? (
          <GuessGate story={story} lang={lang} />
        ) : (
          <>
            <SceneFigure src={story.scenes[chapter.hero]} eager />
            {!ready && <div className="loading" aria-busy="true" />}
            {ready && 'error' in loaded! && <p className="muted">{t.notFound}</p>}
            {ready && 'blocks' in loaded! && <ChapterBody blocks={loaded.blocks} story={story} lang={lang} />}
            {ready && showResult && <GuessResult story={story} />}
          </>
        )}

        {isLast && ready && (
          <section className="the-end">
            <div className="the-end-mark">{t.finishedStory}</div>
            <p className="muted">{t.finishedText}</p>
            <Link to="/" className="btn">
              {t.backToLibrary}
            </Link>
          </section>
        )}

        <nav className="chapter-nav">
          {prev ? (
            <Link to={`/story/${story.id}/read/${prev.id}`} className="btn btn-ghost">
              <Icon name="back" size={18} /> {t.prev}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`/story/${story.id}/read/${next.id}`} className="btn">
              {t.next} <Icon name="next" size={18} />
            </Link>
          )}
        </nav>
      </article>

      {showSettings && <SettingsSheet onClose={() => setShowSettings(false)} />}
      {showPeople && <WhosWhoSheet story={story} lang={lang} onClose={() => setShowPeople(false)} />}
    </div>
  )
}
