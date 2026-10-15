const PATHS = {
  back: 'M15 18l-6-6 6-6',
  next: 'M9 18l6-6-6-6',
  text: 'M4 7V5h16v2M9 19h6M12 5v14',
  book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5zm0 14a2 2 0 0 1 2-2h13',
  note: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5',
  list: 'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
  check: 'M5 12l5 5L20 7',
  lock: 'M7 11V8a5 5 0 0 1 10 0v3M6 11h12v10H6z',
  download: 'M12 4v11m0 0l-4-4m4 4l4-4M5 20h14',
  close: 'M6 6l12 12M18 6L6 18',
  search: 'M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm9 3l-4.5-4.5',
  case: 'M4 8h16v11H4zM9 8V5h6v3M4 13h16',
  rewind: 'M11 18l-6-6 6-6M19 18l-6-6 6-6',
  person: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 9a7 7 0 0 1 14 0',
} as const

export type IconName = keyof typeof PATHS

export default function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  )
}
