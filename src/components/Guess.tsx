import { useState } from 'react'
import type { Lang, StoryMeta } from '../stories/types'
import { useT } from '../i18n/strings'
import { updateProgress, useProgress } from '../state/progress'

const SKIPPED = '__skipped__'

/** Asks the reader to name the killer before the final confrontation. */
export function GuessGate({ story, lang }: { story: StoryMeta; lang: Lang }) {
  const t = useT()
  const [pick, setPick] = useState<string | null>(null)
  const gate = story.guess!
  const save = (guess: string) => updateProgress(story.id, () => ({ guess }))

  return (
    <section className="guess">
      <div className="guess-kicker">{t.guessTitle}</div>
      <h2>{gate.question[lang]}</h2>
      <p className="muted">{gate.intro[lang]}</p>
      <div className="guess-options" role="radiogroup">
        {gate.options.map((o) => (
          <button
            key={o.id}
            role="radio"
            aria-checked={pick === o.id}
            className={`guess-option ${pick === o.id ? 'on' : ''}`}
            onClick={() => setPick(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div className="guess-actions">
        <button className="btn" disabled={!pick} onClick={() => pick && save(pick)}>
          {t.guessLock}
        </button>
        <button className="btn btn-ghost" onClick={() => save(SKIPPED)}>
          {t.guessSkip}
        </button>
      </div>
    </section>
  )
}

export function GuessResult({ story }: { story: StoryMeta }) {
  const t = useT()
  const { guess } = useProgress(story.id)
  const gate = story.guess
  if (!gate || !guess) return null
  if (guess === SKIPPED) return <section className="guess guess-result">{t.guessNone}</section>
  const correct = guess === atob(gate.answer)
  const label = gate.options.find((o) => o.id === guess)?.label ?? guess
  return (
    <section className={`guess guess-result ${correct ? 'right' : 'wrong'}`}>
      <div className="guess-kicker">
        {t.guessLocked}: <strong>{label}</strong>
      </div>
      <p>{correct ? t.guessRight : t.guessWrong}</p>
    </section>
  )
}
