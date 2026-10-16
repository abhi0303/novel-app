import { Fragment, type ReactNode } from 'react'
import type { Block, Inline } from '../lib/markup'
import type { MarkStyle } from '../state/progress'
import type { Lang, StoryMeta } from '../stories/types'
import { useT } from '../i18n/strings'

export function Inlines({ items }: { items: Inline[] }) {
  return (
    <>
      {items.map((it, i) => {
        // Line breaks inside fenced blocks (letters, registers) are meaningful.
        const parts = it.value.split('\n')
        const text = parts.map((p, j) => (
          <Fragment key={j}>
            {j > 0 && <br />}
            {p}
          </Fragment>
        ))
        if (it.kind === 'strong') return <strong key={i}>{text}</strong>
        if (it.kind === 'em') return <em key={i}>{text}</em>
        return <Fragment key={i}>{text}</Fragment>
      })}
    </>
  )
}

/** A marker to draw: a character range inside one block, or the whole block when there is no range. */
export interface BodyMark {
  block: number
  start?: number
  end?: number
  style: MarkStyle
}

/** Plain text of a paragraph or quote, matching what the reader sees (used for marker offsets). */
export function blockText(b: Block): string | null {
  return b.type === 'p' || b.type === 'quote' ? b.inlines.map((i) => i.value).join('') : null
}

/** Inline runs with the characters [start, end) wrapped in a <mark>. */
function MarkedInlines({ items, start, end, style, onTap }: { items: Inline[]; start: number; end: number; style: MarkStyle; onTap?: () => void }) {
  const wrap = (kind: Inline['kind'], text: string, key: string) =>
    kind === 'strong' ? <strong key={key}>{text}</strong> : kind === 'em' ? <em key={key}>{text}</em> : <Fragment key={key}>{text}</Fragment>
  const before: ReactNode[] = [], inside: ReactNode[] = [], after: ReactNode[] = []
  let pos = 0
  items.forEach((it, i) => {
    const a = pos, b = pos + it.value.length
    pos = b
    // the part of this run that falls between two absolute positions
    const seg = (from: number, to: number) => {
      const f = Math.max(from, a), t = Math.min(to, b)
      return t > f ? it.value.slice(f - a, t - a) : ''
    }
    const pre = seg(a, start), mid = seg(start, end), post = seg(end, b)
    if (pre) before.push(wrap(it.kind, pre, `b${i}`))
    if (mid) inside.push(wrap(it.kind, mid, `m${i}`))
    if (post) after.push(wrap(it.kind, post, `a${i}`))
  })
  return (
    <>
      {before}
      <mark id="reader-mark" className={`rmark rmark-${style}`} onClick={onTap}>
        {inside}
      </mark>
      {after}
    </>
  )
}

export function SceneFigure({ src, caption, eager }: { src?: string; caption?: string; eager?: boolean }) {
  if (!src) return null
  return (
    <figure className="scene">
      <img src={src} alt={caption ?? ''} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

/** The parts of a story that chapter text needs; games pass their own images and no clues. */
export type ProseSource = Pick<StoryMeta, 'scenes' | 'clues'>

export function ClueCard({ story, id, lang }: { story: ProseSource; id: string; lang: Lang }) {
  const t = useT()
  const index = story.clues.findIndex((c) => c.id === id)
  if (index === -1) return null
  const clue = story.clues[index]
  return (
    <aside className="clue">
      <div className="clue-label">
        {t.clue} {index + 1}
      </div>
      <div className="clue-title">{clue.title[lang]}</div>
      <p>{clue.text[lang]}</p>
    </aside>
  )
}

export default function ChapterBody({
  blocks,
  story,
  lang,
  mark,
  onMarkTap,
  resumeBlock,
  resumeLabel,
}: {
  blocks: Block[]
  story: ProseSource
  lang: Lang
  mark?: BodyMark | null
  onMarkTap?: () => void
  /** Block to show a "you left off here" line above. */
  resumeBlock?: number | null
  resumeLabel?: string
}) {
  const ranged = (i: number) => mark && mark.block === i && mark.start !== undefined && mark.end !== undefined
  // A whole-block marker gets an id so the reader can scroll to it; ranged markers carry the id on <mark>.
  const blockProps = (i: number, className?: string) => {
    const whole = mark && mark.block === i && !ranged(i)
    return {
      'data-block': i,
      id: whole ? 'reader-mark' : undefined,
      className: [className, whole ? `rblock rblock-${mark!.style}` : ''].filter(Boolean).join(' ') || undefined,
      onClick: whole ? onMarkTap : undefined,
    }
  }
  const text = (i: number, items: Inline[]) =>
    ranged(i) ? <MarkedInlines items={items} start={mark!.start!} end={mark!.end!} style={mark!.style} onTap={onMarkTap} /> : <Inlines items={items} />
  return (
    <div className="prose">
      {blocks.map((b, i) => {
        const resume = resumeBlock === i && resumeLabel ? (
          <div key={`resume-${i}`} className="resume-line" role="note">
            <span>{resumeLabel}</span>
          </div>
        ) : null
        const el = (() => {
        switch (b.type) {
          case 'p':
            return (
              <p key={i} {...blockProps(i)}>
                {text(i, b.inlines)}
              </p>
            )
          case 'break':
            return (
              <div key={i} className="scene-break" aria-hidden="true">
                ◆ ◆ ◆
              </div>
            )
          case 'quote':
            return (
              <blockquote key={i} {...blockProps(i)}>
                {text(i, b.inlines)}
              </blockquote>
            )
          case 'scene':
            return <SceneFigure key={i} src={story.scenes[b.id]} caption={b.caption} />
          case 'clue':
            return (
              <div key={i} {...blockProps(i)}>
                <ClueCard story={story} id={b.id} lang={lang} />
              </div>
            )
          case 'timeline':
            return (
              <section key={i} {...blockProps(i, 'timeline')}>
                {b.title && <h3>{b.title}</h3>}
                <ol>
                  {b.rows.map((r, j) => (
                    <li key={j}>
                      <span className="tl-time">{r.time}</span>
                      <span className="tl-text">
                        <Inlines items={r.text} />
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )
          case 'fence':
            return (
              <section key={i} {...blockProps(i, `fence fence-${b.kind}`)}>
                {b.title && <div className="fence-title">{b.title}</div>}
                {b.paragraphs.map((p, j) => (
                  <p key={j}>
                    <Inlines items={p} />
                  </p>
                ))}
              </section>
            )
        }
        })()
        return resume ? [resume, el] : el
      })}
    </div>
  )
}
