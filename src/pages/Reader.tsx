import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getStory } from '../stories'
import { parseMarkup, type Block } from '../lib/markup'
import { useT } from '../i18n/strings'
import { useSettings } from '../state/settings'
import type { Lang } from '../stories/types'
import { updateProgress, useProgress, type MarkStyle, type ReadingMark } from '../state/progress'
import ChapterBody, { SceneFigure } from '../components/ChapterBody'
import { GuessGate, GuessResult } from '../components/Guess'
import SettingsSheet from '../components/SettingsSheet'
import WhosWhoSheet from '../components/WhosWho'
import LangToggle from '../components/LangToggle'
import Icon from '../components/Icon'
import { blockEl, bodyMark, firstVisibleBlock, flash, readingBlock, scrollToEl, selectionToMark, type PendingMark } from '../lib/marker'
import NotFound from './NotFound'

type Loaded = { key: string; blocks: Block[] } | { key: string; error: true }
/** Where to put the reader when a chapter opens. */
type Landing = { kind: 'ratio'; value: number } | { kind: 'mark' } | { kind: 'block'; block: number; blocks: number; lang: Lang } | null
type Toast = { text: string; action?: { label: string; run: () => void } }

function scrollRatio() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  return max <= 0 ? 1 : Math.min(1, Math.max(0, window.scrollY / max))
}

export default function Reader() {
  const { storyId, chapterId } = useParams()
  const story = getStory(storyId)
  const t = useT()
  const { lang } = useSettings()
  const navigate = useNavigate()
  const progress = useProgress(story?.id ?? '')
  const [loaded, setLoaded] = useState<Loaded | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [showPeople, setShowPeople] = useState(false)
  const [showMarker, setShowMarker] = useState(false)
  const [pending, setPending] = useState<PendingMark | null>(null)
  const [toast, setToast] = useState<Toast | null>(null)
  const [resumeBlock, setResumeBlock] = useState<number | null>(null)
  const barRef = useRef<HTMLSpanElement>(null)
  const ratioRef = useRef(0)
  const landing = useRef<Landing>(null)
  const prevChapter = useRef<string | undefined>(undefined)

  const index = story?.chapters.findIndex((c) => c.id === chapterId) ?? -1
  const chapter = index >= 0 ? story!.chapters[index] : undefined
  const key = `${lang}:${chapterId}`
  const gated = !!story?.guess && story.guess.beforeChapterId === chapterId && !progress.guess
  const markHere = !!progress.mark && progress.mark.chapterId === chapterId

  // Decide where to land: the reader's marker, else the paragraph they were reading, else the top.
  // On a language switch within the chapter, keep the marker in view or keep the same place.
  if (prevChapter.current !== chapterId) {
    const lb = progress.lastBlock
    landing.current = markHere
      ? { kind: 'mark' }
      : progress.lastChapterId === chapterId && lb
        ? { kind: 'block', block: lb.block, blocks: lb.blocks, lang: lb.lang }
        : progress.lastChapterId === chapterId
          ? { kind: 'ratio', value: progress.lastScroll }
          : null
    prevChapter.current = chapterId
  } else if (loaded && loaded.key !== key && landing.current === null) {
    landing.current = markHere ? { kind: 'mark' } : { kind: 'ratio', value: ratioRef.current }
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

  const showToast = (tt: Toast) => setToast(tt)
  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), toast.action ? 7000 : 4000)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    // A chapter behind the guess gate doesn't count as reached (its clues stay locked) until the guess is made.
    if (!story || index < 0 || gated) return
    const id = story.chapters[index].id
    let removed: ReadingMark | null = null
    updateProgress(story.id, (p) => {
      // The marker only lives while the reader stays in its chapter.
      if (p.mark && p.mark.chapterId !== id) removed = p.mark
      return {
        lastChapterId: id,
        lastScroll: p.lastChapterId === id ? p.lastScroll : 0,
        lastBlock: p.lastChapterId === id ? p.lastBlock : null,
        maxIndex: Math.max(p.maxIndex, index),
        mark: removed ? null : p.mark,
      }
    })
    if (removed) {
      const gone: ReadingMark = removed
      const where = story.chapters.find((c) => c.id === gone.chapterId)?.label[lang] ?? ''
      showToast({
        text: t.markerCleared(where),
        action: {
          label: t.undo,
          run: () => {
            updateProgress(story.id, () => ({ mark: gone }))
            navigate(`/story/${story.id}/read/${gone.chapterId}`)
          },
        },
      })
    }
  }, [story, index, gated])

  const ready = loaded?.key === key
  const blocks = ready && loaded && 'blocks' in loaded ? loaded.blocks : null
  const mark = useMemo(() => (blocks && chapter ? bodyMark(progress.mark, chapter.id, lang, blocks) : null), [blocks, chapter, lang, progress.mark])

  useLayoutEffect(() => {
    const target = landing.current
    if (!ready || gated || target === null) return
    landing.current = null
    if (target.kind === 'mark') {
      const el = document.getElementById('reader-mark')
      if (el) {
        scrollToEl(el, true)
        flash(el)
        return
      }
      window.scrollTo(0, 0)
    } else if (target.kind === 'block' && blocks) {
      // the saved paragraph may be from the other language: map it across by position
      const block = target.lang === lang ? target.block : Math.round((target.block * blocks.length) / Math.max(1, target.blocks))
      setResumeBlock(Math.min(blocks.length - 1, block))
    } else if (target.kind === 'ratio') {
      const max = document.documentElement.scrollHeight - window.innerHeight
      window.scrollTo(0, Math.max(0, target.value * max))
    } else {
      window.scrollTo(0, 0)
    }
  }, [ready, key, gated])

  // Once the "you left off here" line is drawn, bring it into view; it fades after a while.
  useLayoutEffect(() => {
    if (resumeBlock === null) return
    const el = blockEl(resumeBlock)
    if (el) scrollToEl(el, false)
    const timer = window.setTimeout(() => setResumeBlock(null), 9000)
    return () => window.clearTimeout(timer)
  }, [resumeBlock])

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
          const first = firstVisibleBlock()
          updateProgress(story.id, (p) => ({
            lastScroll: r,
            lastBlock: first !== null && blocks ? { block: first, blocks: blocks.length, lang } : p.lastBlock,
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
  }, [story, chapter, ready, gated, blocks, lang])

  // Selecting words in the chapter offers Highlight / Underline.
  useEffect(() => {
    if (!blocks || gated) return
    let hide: number | undefined
    const onSelection = () => {
      const sel = window.getSelection()
      const next = sel ? selectionToMark(sel, blocks) : null
      window.clearTimeout(hide)
      if (next) setPending(next)
      // wait a moment before hiding, so tapping a toolbar button still works after the selection collapses
      else hide = window.setTimeout(() => setPending(null), 350)
    }
    document.addEventListener('selectionchange', onSelection)
    return () => {
      document.removeEventListener('selectionchange', onSelection)
      window.clearTimeout(hide)
    }
  }, [blocks, gated])

  if (!story || !chapter) return <NotFound />

  const saveMark = (m: PendingMark, style: MarkStyle) => {
    if (!blocks) return
    updateProgress(story.id, () => ({ mark: { ...m, chapterId: chapter.id, lang, blocks: blocks.length, style } }))
    window.getSelection()?.removeAllRanges()
    setPending(null)
    setShowMarker(false)
    showToast({ text: t.markerSaved })
    window.setTimeout(() => {
      const el = document.getElementById('reader-mark')
      if (el) flash(el)
    }, 50)
  }
  const markWhereIAm = () => {
    const first = readingBlock()
    if (first === null || !blocks) return
    const el = blockEl(first)
    saveMark({ block: first, text: (el?.textContent ?? '').trim().slice(0, 140) }, 'bookmark')
  }
  const goToMark = () => {
    setShowMarker(false)
    const el = document.getElementById('reader-mark')
    if (el) {
      scrollToEl(el, true, true)
      flash(el)
    }
  }
  const removeMark = () => {
    updateProgress(story.id, () => ({ mark: null }))
    setShowMarker(false)
    showToast({ text: t.markerRemoved })
  }

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
        {!gated && (
          <button
            className={`icon-btn${markHere ? ' icon-btn-on' : ''}`}
            onClick={() => (markHere ? setShowMarker(true) : markWhereIAm())}
            aria-label={markHere ? t.yourMarker : t.markHere}
            title={markHere ? t.yourMarker : t.markHere}
          >
            <Icon name="bookmark" />
          </button>
        )}
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
            {blocks && (
              <ChapterBody
                blocks={blocks}
                story={story}
                lang={lang}
                mark={mark}
                onMarkTap={() => setShowMarker(true)}
                resumeBlock={resumeBlock}
                resumeLabel={t.leftOffHere}
              />
            )}
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

      {pending && (
        <div className="mark-bar" role="toolbar" aria-label={t.yourMarker} onPointerDown={(e) => e.preventDefault()} onMouseDown={(e) => e.preventDefault()}>
          {pending.start !== undefined && (
            <>
              <button className="mark-bar-btn mark-bar-hl" onClick={() => saveMark(pending, 'highlight')}>
                <Icon name="highlight" size={18} /> {t.markHighlight}
              </button>
              <button className="mark-bar-btn mark-bar-ul" onClick={() => saveMark(pending, 'underline')}>
                <Icon name="underline" size={18} /> {t.markUnderline}
              </button>
            </>
          )}
          {pending.start === undefined && (
            <button className="mark-bar-btn" onClick={() => saveMark(pending, 'bookmark')}>
              <Icon name="bookmark" size={18} /> {t.markHere}
            </button>
          )}
          <button
            className="icon-btn"
            aria-label={t.close}
            onClick={() => {
              window.getSelection()?.removeAllRanges()
              setPending(null)
            }}
          >
            <Icon name="close" size={18} />
          </button>
        </div>
      )}

      {showMarker && progress.mark && (
        <div className="sheet-backdrop" onClick={() => setShowMarker(false)}>
          <div className="sheet" role="dialog" aria-modal="true" aria-label={t.yourMarker} onClick={(e) => e.stopPropagation()}>
            <div className="sheet-head">
              <h2>{t.yourMarker}</h2>
              <button className="icon-btn" onClick={() => setShowMarker(false)} aria-label={t.close}>
                <Icon name="close" />
              </button>
            </div>
            <blockquote className={`marker-quote marker-${progress.mark.style}`}>{progress.mark.text}</blockquote>
            <div className="marker-actions">
              <button className="btn" onClick={goToMark}>
                <Icon name="bookmark" size={18} /> {t.goToMarker}
              </button>
              <button className="btn btn-ghost" onClick={markWhereIAm}>
                {t.moveMarkerHere}
              </button>
              <button className="link-btn" onClick={removeMark}>
                {t.removeMarker}
              </button>
            </div>
            <p className="muted marker-help">{t.markerHelp}</p>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast" role="status">
          <span>{toast.text}</span>
          {toast.action && (
            <button
              className="btn btn-small"
              onClick={() => {
                toast.action!.run()
                setToast(null)
              }}
            >
              {toast.action.label}
            </button>
          )}
        </div>
      )}

      {showSettings && <SettingsSheet onClose={() => setShowSettings(false)} />}
      {showPeople && <WhosWhoSheet story={story} lang={lang} onClose={() => setShowPeople(false)} />}
    </div>
  )
}
