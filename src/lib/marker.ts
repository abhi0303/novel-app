import type { Block } from './markup'
import { blockText, type BodyMark } from '../components/ChapterBody'
import type { ReadingMark } from '../state/progress'
import type { Lang } from '../stories/types'

/** A marker the reader is about to place: where it is, before they pick a style. */
export type PendingMark = Pick<ReadingMark, 'block' | 'start' | 'end' | 'text'>

const topbarBottom = () => (document.querySelector('.topbar') as HTMLElement | null)?.getBoundingClientRect().bottom ?? 0

/** The block element for an index in the chapter body. */
export const blockEl = (i: number) => document.querySelector<HTMLElement>(`.chapter .prose [data-block="${i}"]`)

/** Index of the first text block at the top of the screen (just under the top bar). */
export function firstVisibleBlock(): number | null {
  const top = topbarBottom() + 12
  for (const el of document.querySelectorAll<HTMLElement>('.chapter .prose [data-block]')) {
    if (el.getBoundingClientRect().bottom > top) return Number(el.dataset.block)
  }
  return null
}

/** Index of the block at the reader's eye line, a little below the top bar: what "mark where I am" marks. */
export function readingBlock(): number | null {
  const top = topbarBottom()
  const line = top + (window.innerHeight - top) * 0.2
  const els = [...document.querySelectorAll<HTMLElement>('.chapter .prose [data-block]')]
  const hit = els.find((el) => {
    const r = el.getBoundingClientRect()
    return r.top <= line && r.bottom > line
  })
  const el = hit ?? els.find((e) => e.getBoundingClientRect().top >= line)
  return el ? Number(el.dataset.block) : firstVisibleBlock()
}

/** The words the reader selected, as a block and character range. Selections that span blocks are cut to the first. */
export function selectionToMark(sel: Selection, blocks: Block[]): PendingMark | null {
  if (sel.isCollapsed || !sel.rangeCount) return null
  const range = sel.getRangeAt(0)
  const node = range.startContainer
  const el = (node.nodeType === 1 ? (node as Element) : node.parentElement)?.closest<HTMLElement>('.chapter .prose [data-block]')
  if (!el) return null
  const block = Number(el.dataset.block)
  const text = blockText(blocks[block])
  const whole = { block, text: (el.textContent ?? '').trim().slice(0, 140) }
  // Letters, timelines and clue cards are marked as a whole block.
  if (text === null || el.textContent !== text) return whole.text ? whole : null
  const offsetTo = (container: Node, offset: number) => {
    const r = document.createRange()
    r.selectNodeContents(el)
    r.setEnd(container, offset)
    return r.toString().length
  }
  let start = offsetTo(range.startContainer, range.startOffset)
  let end = el.contains(range.endContainer) ? offsetTo(range.endContainer, range.endOffset) : text.length
  while (start < end && /\s/.test(text[start])) start++
  while (end > start && /\s/.test(text[end - 1])) end--
  // snap to whole words, so a sloppy drag still marks complete words
  const inWord = /[\p{L}\p{N}'’]/u
  while (start > 0 && inWord.test(text[start - 1]) && inWord.test(text[start])) start--
  while (end < text.length && inWord.test(text[end]) && inWord.test(text[end - 1])) end++
  if (end <= start) return null
  return { block, start, end, text: text.slice(start, end) }
}

/** How to draw a saved marker in the chapter as it is now (it may be shown in the other language). */
export function bodyMark(mark: ReadingMark | null | undefined, chapterId: string, lang: Lang, blocks: Block[]): BodyMark | null {
  if (!mark || mark.chapterId !== chapterId || !blocks.length) return null
  if (mark.lang !== lang) {
    // Offsets don't carry across a translation; mark the matching paragraph instead.
    const block = Math.min(blocks.length - 1, Math.round((mark.block * blocks.length) / Math.max(1, mark.blocks)))
    return { block, style: 'bookmark' }
  }
  if (mark.start === undefined || mark.end === undefined) return { block: mark.block, style: mark.style }
  const text = blockText(blocks[mark.block])
  if (text?.slice(mark.start, mark.end) === mark.text) return { block: mark.block, start: mark.start, end: mark.end, style: mark.style }
  // The text moved (an edited chapter): find the words again, or fall back to the paragraph.
  const at = text?.indexOf(mark.text) ?? -1
  return at >= 0 ? { block: mark.block, start: at, end: at + mark.text.length, style: mark.style } : { block: mark.block, style: mark.style }
}

/** Scroll an element into the reading area; `center` for a marker, just under the top bar otherwise. */
export function scrollToEl(el: Element, center: boolean, smooth = false) {
  const rect = el.getBoundingClientRect()
  const y = center ? rect.top + window.scrollY - window.innerHeight * 0.35 : rect.top + window.scrollY - topbarBottom() - 56
  window.scrollTo({ top: Math.max(0, y), behavior: smooth ? 'smooth' : 'auto' })
}

/** A short glow on the marker so the eye finds it. */
export function flash(el: Element) {
  el.classList.remove('mark-flash')
  void (el as HTMLElement).offsetWidth
  el.classList.add('mark-flash')
  window.setTimeout(() => el.classList.remove('mark-flash'), 2400)
}
