import { Fragment } from 'react'
import type { Block, Inline } from '../lib/markup'
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

export default function ChapterBody({ blocks, story, lang }: { blocks: Block[]; story: ProseSource; lang: Lang }) {
  return (
    <div className="prose">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p':
            return (
              <p key={i}>
                <Inlines items={b.inlines} />
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
              <blockquote key={i}>
                <Inlines items={b.inlines} />
              </blockquote>
            )
          case 'scene':
            return <SceneFigure key={i} src={story.scenes[b.id]} caption={b.caption} />
          case 'clue':
            return <ClueCard key={i} story={story} id={b.id} lang={lang} />
          case 'timeline':
            return (
              <section key={i} className="timeline">
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
              <section key={i} className={`fence fence-${b.kind}`}>
                {b.title && <div className="fence-title">{b.title}</div>}
                {b.paragraphs.map((p, j) => (
                  <p key={j}>
                    <Inlines items={p} />
                  </p>
                ))}
              </section>
            )
        }
      })}
    </div>
  )
}
