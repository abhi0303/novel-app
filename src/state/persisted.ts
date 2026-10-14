import { useSyncExternalStore } from 'react'

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Private mode or storage full: keep working in memory only.
  }
}

/** A small localStorage-backed store that React components can subscribe to. */
export function persistedStore<T extends object>(key: string, fallback: T) {
  let state = read(key, fallback)
  const listeners = new Set<() => void>()

  const set = (patch: Partial<T> | ((prev: T) => Partial<T>)) => {
    const next = typeof patch === 'function' ? patch(state) : patch
    state = { ...state, ...next }
    write(key, state)
    listeners.forEach((l) => l())
  }

  const subscribe = (l: () => void) => {
    listeners.add(l)
    return () => listeners.delete(l)
  }

  const use = () => useSyncExternalStore(subscribe, () => state)

  return { get: () => state, set, use }
}
