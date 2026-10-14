/**
 * A tiny markup format for story chapters.
 *
 *   Plain paragraphs, separated by blank lines.  **bold**  *italic*
 *   ---                                 scene break
 *   > quoted line                       pull quote (consecutive lines join)
 *   @scene <id> | <caption>             illustration from the story's scenes
 *   @clue <id>                          clue card (text comes from story meta)
 *   :::<kind> <optional title>          fenced block; kind = letter | message | doc | timeline | note
 *   ...lines...
 *   :::
 *
 * Inside :::timeline, each line is "<time> | <text>".
 */

export type Inline = { kind: 'text' | 'em' | 'strong'; value: string }

export type Block =
  | { type: 'p'; inlines: Inline[] }
  | { type: 'break' }
  | { type: 'quote'; inlines: Inline[] }
  | { type: 'scene'; id: string; caption: string }
  | { type: 'clue'; id: string }
  | { type: 'fence'; kind: FenceKind; title: string; paragraphs: Inline[][] }
  | { type: 'timeline'; title: string; rows: { time: string; text: Inline[] }[] }

export type FenceKind = 'letter' | 'message' | 'doc' | 'note'

const FENCE_KINDS = new Set<string>(['letter', 'message', 'doc', 'note', 'timeline'])

export function parseInline(src: string): Inline[] {
  const out: Inline[] = []
  const re = /\*\*(.+?)\*\*|\*(.+?)\*/g
  let last = 0
  for (let m = re.exec(src); m; m = re.exec(src)) {
    if (m.index > last) out.push({ kind: 'text', value: src.slice(last, m.index) })
    if (m[1] !== undefined) out.push({ kind: 'strong', value: m[1] })
    else out.push({ kind: 'em', value: m[2] })
    last = re.lastIndex
  }
  if (last < src.length) out.push({ kind: 'text', value: src.slice(last) })
  return out
}

export function parseMarkup(src: string): Block[] {
  const lines = src.replace(/\r\n?/g, '\n').split('\n')
  const blocks: Block[] = []
  let para: string[] = []
  let quote: string[] = []

  const flush = () => {
    if (para.length) blocks.push({ type: 'p', inlines: parseInline(para.join(' ')) })
    if (quote.length) blocks.push({ type: 'quote', inlines: parseInline(quote.join(' ')) })
    para = []
    quote = []
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    if (line.startsWith(':::') && line.length > 3) {
      flush()
      const [kind, ...rest] = line.slice(3).trim().split(/\s+/)
      const title = rest.join(' ')
      const body: string[] = []
      for (i++; i < lines.length && lines[i].trim() !== ':::'; i++) body.push(lines[i])
      if (!FENCE_KINDS.has(kind)) continue
      if (kind === 'timeline') {
        const rows = body
          .map((l) => l.trim())
          .filter(Boolean)
          .map((l) => {
            const bar = l.indexOf('|')
            return bar === -1
              ? { time: '', text: parseInline(l) }
              : { time: l.slice(0, bar).trim(), text: parseInline(l.slice(bar + 1).trim()) }
          })
        blocks.push({ type: 'timeline', title, rows })
      } else {
        const paragraphs: Inline[][] = []
        let cur: string[] = []
        for (const l of body) {
          if (l.trim() === '') {
            if (cur.length) paragraphs.push(parseInline(cur.join('\n')))
            cur = []
          } else cur.push(l.trim())
        }
        if (cur.length) paragraphs.push(parseInline(cur.join('\n')))
        blocks.push({ type: 'fence', kind: kind as FenceKind, title, paragraphs })
      }
      continue
    }

    if (line === '') {
      flush()
    } else if (line === '---') {
      flush()
      blocks.push({ type: 'break' })
    } else if (line.startsWith('@scene ')) {
      flush()
      const [id, ...cap] = line.slice(7).split('|')
      blocks.push({ type: 'scene', id: id.trim(), caption: cap.join('|').trim() })
    } else if (line.startsWith('@clue ')) {
      flush()
      blocks.push({ type: 'clue', id: line.slice(6).trim() })
    } else if (line.startsWith('# ')) {
      // Chapter headings live in story meta; ignore any in the file.
      flush()
    } else if (line.startsWith('>')) {
      if (para.length) flush()
      quote.push(line.replace(/^>\s?/, ''))
    } else {
      if (quote.length) flush()
      para.push(line)
    }
  }
  flush()
  return blocks
}
