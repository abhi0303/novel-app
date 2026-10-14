import { useEffect } from 'react'
import { useT } from '../i18n/strings'
import { FONT_SCALES, settingsStore, useSettings, type Theme } from '../state/settings'
import LangToggle from './LangToggle'
import Icon from './Icon'

export default function SettingsSheet({ onClose }: { onClose: () => void }) {
  const t = useT()
  const { theme, fontScale } = useSettings()
  const idx = FONT_SCALES.indexOf(fontScale)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const themes: { id: Theme; label: string }[] = [
    { id: 'noir', label: t.themeNoir },
    { id: 'paper', label: t.themePaper },
  ]

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label={t.settings} onClick={(e) => e.stopPropagation()}>
        <div className="sheet-head">
          <h2>{t.settings}</h2>
          <button className="icon-btn" onClick={onClose} aria-label={t.close}>
            <Icon name="close" />
          </button>
        </div>

        <div className="sheet-row">
          <span>{t.language}</span>
          <LangToggle />
        </div>

        <div className="sheet-row">
          <span>{t.theme}</span>
          <div className="seg" role="radiogroup" aria-label={t.theme}>
            {themes.map((th) => (
              <button
                key={th.id}
                role="radio"
                aria-checked={theme === th.id}
                className={theme === th.id ? 'seg-on' : ''}
                onClick={() => settingsStore.set({ theme: th.id })}
              >
                {th.label}
              </button>
            ))}
          </div>
        </div>

        <div className="sheet-row">
          <span>{t.textSize}</span>
          <div className="seg">
            <button
              aria-label="Smaller text"
              disabled={idx <= 0}
              onClick={() => settingsStore.set({ fontScale: FONT_SCALES[Math.max(0, idx - 1)] })}
            >
              A−
            </button>
            <button
              aria-label="Larger text"
              disabled={idx >= FONT_SCALES.length - 1}
              onClick={() => settingsStore.set({ fontScale: FONT_SCALES[Math.min(FONT_SCALES.length - 1, idx + 1)] })}
            >
              A+
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
