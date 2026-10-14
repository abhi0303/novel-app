import { useEffect } from 'react'
import type { Lang } from '../stories/types'
import { persistedStore } from './persisted'

export type Theme = 'noir' | 'paper'

export interface Settings {
  lang: Lang
  theme: Theme
  fontScale: number
}

function initialLang(): Lang {
  const nav = typeof navigator !== 'undefined' ? navigator.language : 'en'
  return nav.toLowerCase().startsWith('hi') ? 'hi' : 'en'
}

export const settingsStore = persistedStore<Settings>('kahani.settings', {
  lang: initialLang(),
  theme: 'noir',
  fontScale: 1,
})

export const useSettings = settingsStore.use

export const FONT_SCALES = [0.9, 1, 1.1, 1.2, 1.35]

/** Applies theme, font scale and document language to <html>. */
export function useApplySettings() {
  const { theme, fontScale, lang } = useSettings()
  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.style.setProperty('--reader-scale', String(fontScale))
    // The Hindi edition is written in Roman script (Hinglish).
    root.lang = lang === 'hi' ? 'hi-Latn' : 'en'
    const meta = document.querySelector('meta[name="theme-color"]')
    meta?.setAttribute('content', theme === 'noir' ? '#0e1218' : '#f3ead8')
  }, [theme, fontScale, lang])
}
