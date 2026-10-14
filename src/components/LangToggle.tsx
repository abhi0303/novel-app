import { LANGS } from '../stories/types'
import { LANG_LABELS, useT } from '../i18n/strings'
import { settingsStore, useSettings } from '../state/settings'

export default function LangToggle() {
  const { lang } = useSettings()
  const t = useT()
  return (
    <div className="seg" role="radiogroup" aria-label={t.language}>
      {LANGS.map((l) => (
        <button
          key={l}
          role="radio"
          aria-checked={lang === l}
          className={lang === l ? 'seg-on' : ''}
          onClick={() => settingsStore.set({ lang: l })}
          title={LANG_LABELS[l].long}
        >
          {LANG_LABELS[l].short}
        </button>
      ))}
    </div>
  )
}
