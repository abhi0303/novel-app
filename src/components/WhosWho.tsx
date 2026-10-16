import { useEffect, useState } from 'react'
import { useT } from '../i18n/strings'
import { useProgress } from '../state/progress'
import { knownCharacters, type KnownCharacter } from '../stories/whoswho'
import type { Lang, StoryMeta } from '../stories/types'
import Icon from './Icon'

const TITLES = /^(Dr\.?|Adv\.?|Prof\.?|Mr\.?|Mrs\.?|Smt\.?|SI|PSI|SP|DCP|ACP|SHO|Inspector|Sister|Cdr|Chef)$/

function initials(name: string) {
  return name
    .replace(/["(].*?[")]/g, ' ')
    .split(/\s+/)
    .filter((w) => w && !TITLES.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

/** A larger view of a character's photo, opened by tapping it. */
function PhotoView({ name, src, onClose }: { name: string; src: string; onClose: () => void }) {
  const t = useT()
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="who-photo-view" role="dialog" aria-modal="true" aria-label={name} onClick={onClose}>
      <figure>
        <img src={src} alt={name} />
        <figcaption>{name}</figcaption>
      </figure>
      <button className="icon-btn" aria-label={t.close}>
        <Icon name="close" />
      </button>
    </div>
  )
}

function Card({ known, story, lang }: { known: KnownCharacter; story: StoryMeta; lang: Lang }) {
  const t = useT()
  const [zoom, setZoom] = useState(false)
  const { character: c, tag, notes } = known
  const label = (id: string) => story.chapters.find((ch) => ch.id === id)?.label[lang] ?? ''
  return (
    <article className={`who tag-${tag}`}>
      {c.photo ? (
        <button className="who-avatar who-photo" onClick={() => setZoom(true)} aria-label={`${t.viewPhoto}: ${c.name}`}>
          <img src={c.photo} alt="" loading="lazy" />
        </button>
      ) : (
        <div className="who-avatar" aria-hidden="true">
          {initials(c.name)}
        </div>
      )}
      {zoom && c.photo && <PhotoView name={c.name} src={c.photo} onClose={() => setZoom(false)} />}
      <div className="who-body">
        <div className="who-top">
          <h3>{c.name}</h3>
          <span className="who-tag">{t.tagLabels[tag]}</span>
        </div>
        <div className="who-job">{c.profession[lang]}</div>
        <p className="who-rel">{c.relation[lang]}</p>
        {notes.length > 0 && (
          <>
            <div className="who-later">{t.sinceThen}</div>
            <ul className="who-notes">
              {notes.map((n) => (
                <li key={n.chapterId + n.text.en}>
                  <span className="who-when">{label(n.chapterId)}</span> {n.text[lang]}
                </li>
              ))}
            </ul>
          </>
        )}
        <div className="who-first">{t.firstMet(label(c.chapterId))}</div>
      </div>
    </article>
  )
}

function MinorRow({ known, story, lang }: { known: KnownCharacter; story: StoryMeta; lang: Lang }) {
  const t = useT()
  const { character: c, tag, notes } = known
  const label = story.chapters.find((ch) => ch.id === c.chapterId)?.label[lang] ?? ''
  return (
    <li className={`who-minor tag-${tag}`}>
      <div className="who-minor-head">
        <strong>{c.name}</strong>
        <span className="who-job">{c.profession[lang]}</span>
      </div>
      <p>
        {c.relation[lang]}
        {notes.map((n) => ' ' + n.text[lang]).join('')}
      </p>
      <div className="who-first">{t.firstMet(label)}</div>
    </li>
  )
}

/** Everyone the reader has met so far in a story, with what they have learned about each. */
export function WhosWhoList({ story, lang }: { story: StoryMeta; lang: Lang }) {
  const t = useT()
  const progress = useProgress(story.id)
  const { main, minor, unmet } = knownCharacters(story, progress)

  return (
    <div className="whoswho">
      {main.length === 0 && minor.length === 0 && <p className="muted">{t.noPeopleYet}</p>}
      <div className="who-list">
        {main.map((k) => (
          <Card key={k.character.id} known={k} story={story} lang={lang} />
        ))}
      </div>
      {minor.length > 0 && (
        <>
          <h3 className="who-sub">{t.othersMet}</h3>
          <ul className="who-minor-list">
            {minor.map((k) => (
              <MinorRow key={k.character.id} known={k} story={story} lang={lang} />
            ))}
          </ul>
        </>
      )}
      {unmet > 0 && (
        <div className="clue clue-locked">
          <Icon name="lock" size={16} /> {t.unmetPeople(unmet)}
        </div>
      )}
    </div>
  )
}

/** The same list in a bottom sheet, opened from the reader. */
export default function WhosWhoSheet({ story, lang, onClose }: { story: StoryMeta; lang: Lang; onClose: () => void }) {
  const t = useT()
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet sheet-tall sheet-wide" role="dialog" aria-modal="true" aria-label={t.whosWho} onClick={(e) => e.stopPropagation()}>
        <div className="sheet-head">
          <h2>{t.whosWho}</h2>
          <button className="icon-btn" onClick={onClose} aria-label={t.close}>
            <Icon name="close" />
          </button>
        </div>
        <p className="muted who-intro">{t.whosWhoIntro}</p>
        <WhosWhoList story={story} lang={lang} />
      </div>
    </div>
  )
}
