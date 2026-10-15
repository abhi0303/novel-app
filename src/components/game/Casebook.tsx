import { useEffect, useState } from 'react'
import { useT } from '../../i18n/strings'
import { actions, personalise, useGameSave } from '../../games/engine'
import type { GameMeta, Item, Report } from '../../games/types'
import type { Lang } from '../../stories/types'
import Icon from '../Icon'
import { GameProse } from './GameProse'

type Tab = 'evidence' | 'reports' | 'people' | 'timeline'

export function ItemThumb({ game, item, big }: { game: GameMeta; item: Item; big?: boolean }) {
  if (!item.pic) {
    return (
      <div className={`ev-thumb ev-thumb-${item.kind}${big ? ' big' : ''}`} aria-hidden="true">
        <Icon name={item.kind === 'evidence' ? 'search' : item.kind === 'testimony' ? 'person' : 'note'} size={big ? 34 : 22} />
      </div>
    )
  }
  return (
    <div
      className={`ev-thumb${big ? ' big' : ''}`}
      aria-hidden="true"
      style={{
        backgroundImage: `url(${game.images[item.pic.image]})`,
        backgroundPosition: `${item.pic.x}% ${item.pic.y}%`,
      }}
    />
  )
}

export default function Casebook({
  game,
  lang,
  text,
  onClose,
}: {
  game: GameMeta
  lang: Lang
  text: Record<string, string> | null
  onClose: () => void
}) {
  const t = useT()
  const save = useGameSave(game)
  const [tab, setTab] = useState<Tab>('evidence')
  const [openItem, setOpenItem] = useState<Item | null>(null)
  const [openReport, setOpenReport] = useState<Report | null>(null)
  // Remember what was new when the casebook was opened, then clear the badge.
  const [fresh] = useState(() => new Set(save.unseen))
  const p = (s: string) => personalise(s, save.gender, game.players)

  useEffect(() => {
    actions.markAllSeen(game)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [game, onClose])

  const owned = (id: string) => save.owned.includes(id)
  const items = game.items.filter((i) => owned(i.id))
  const reports = game.reports.filter((r) => owned(r.id))
  const timeline = items
    .filter((i) => i.time)
    .sort((a, b) => a.time![0] - b.time![0] || a.time![1].localeCompare(b.time![1]))
  const day = (d: number) => t.days[d - 1] ?? ''

  const tabs: { id: Tab; label: string; n: number }[] = [
    { id: 'evidence', label: t.evidence, n: items.length },
    { id: 'reports', label: t.reports, n: reports.length },
    { id: 'people', label: t.people, n: game.people.length },
    { id: 'timeline', label: t.timeline, n: timeline.length },
  ]

  const detail = openItem ?? openReport
  return (
    <div className="casebook" role="dialog" aria-modal="true" aria-label={t.casebook}>
      <header className="topbar">
        {detail ? (
          <button
            className="icon-btn"
            onClick={() => {
              setOpenItem(null)
              setOpenReport(null)
            }}
            aria-label={t.casebook}
          >
            <Icon name="back" />
          </button>
        ) : (
          <span className="icon-btn" aria-hidden="true">
            <Icon name="case" />
          </span>
        )}
        <div className="topbar-title">
          <span className="topbar-kicker">{game.title[lang]}</span>
          <span className="topbar-name">{t.casebook}</span>
        </div>
        <button className="icon-btn" onClick={onClose} aria-label={t.close}>
          <Icon name="close" />
        </button>
      </header>

      <div className="casebook-body container">
        {openItem && (
          <article className="cb-detail">
            <ItemThumb game={game} item={openItem} big />
            <div className="cb-kind">{openItem.kind === 'evidence' ? t.kindEvidence : openItem.kind === 'testimony' ? t.kindTestimony : t.kindObservation}</div>
            <h2>{p(openItem.title[lang])}</h2>
            {openItem.time && (
              <div className="cb-time">
                {day(openItem.time[0])} {openItem.time[1]}
              </div>
            )}
            <p>{p(openItem.text[lang])}</p>
          </article>
        )}

        {openReport && (
          <article className="cb-detail">
            <div className="cb-kind">
              {t.by} {p(openReport.by[lang])}
            </div>
            <h2>{p(openReport.title[lang])}</h2>
            {text ? <GameProse game={game} text={text} section={openReport.text} gender={save.gender} lang={lang} /> : <div className="loading" />}
          </article>
        )}

        {!detail && (
          <>
            <div className="seg seg-wide cb-tabs" role="tablist">
              {tabs.map((x) => (
                <button key={x.id} role="tab" aria-selected={tab === x.id} className={tab === x.id ? 'seg-on' : ''} onClick={() => setTab(x.id)}>
                  {x.label} <span className="cb-n">{x.n}</span>
                </button>
              ))}
            </div>

            {tab === 'evidence' &&
              (items.length ? (
                <div className="ev-grid">
                  {items.map((it) => (
                    <button key={it.id} className="ev-card" onClick={() => setOpenItem(it)}>
                      <ItemThumb game={game} item={it} />
                      <span className="ev-title">{p(it.title[lang])}</span>
                      {fresh.has(it.id) && <span className="badge">{t.newItem}</span>}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="muted">{t.noEvidence}</p>
              ))}

            {tab === 'reports' &&
              (reports.length ? (
                <ul className="report-list">
                  {reports.map((r) => (
                    <li key={r.id}>
                      <button className="report-item" onClick={() => setOpenReport(r)}>
                        <Icon name="note" />
                        <span>
                          <span className="report-title">{p(r.title[lang])}</span>
                          <span className="report-by">
                            {t.by} {p(r.by[lang])}
                          </span>
                        </span>
                        {fresh.has(r.id) && <span className="badge">{t.newItem}</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted">{t.noEvidence}</p>
              ))}

            {tab === 'people' && (
              <div className="suspect-grid">
                {game.people.map((person) => (
                  <article key={person.id} className="suspect">
                    <div className="suspect-avatar" aria-hidden="true">
                      {p(person.name[lang])
                        .split(' ')
                        .filter((w) => /^[A-Z]/.test(w) && !/^(Dr|Adv|Cdr)\.?$/.test(w))
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join('')}
                    </div>
                    <div>
                      <h3>{p(person.name[lang])}</h3>
                      <div className="suspect-role">{p(person.role[lang])}</div>
                      <p>{p(person.summary[lang])}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {tab === 'timeline' &&
              (timeline.length ? (
                <ol className="cb-timeline">
                  {timeline.map((it) => (
                    <li key={it.id}>
                      <button className="tl-btn" onClick={() => setOpenItem(it)}>
                        <span className="tl-time">
                          {day(it.time![0])} {it.time![1]}
                        </span>
                        <span className="tl-text">{p(it.title[lang])}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="muted">{t.noEvidence}</p>
              ))}
          </>
        )}
      </div>
    </div>
  )
}
