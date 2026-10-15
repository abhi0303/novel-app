# Kahani — Mystery Novels (React PWA)

An installable, offline-capable reading app for illustrated detective novels. Readers can switch between **English** and **Hindi (Hinglish, Roman script)** at any point, and the reader keeps its place in the chapter.

Two stories are included:

- **Aakhri Gawah / The Last Witness**: a murder in a respected Lucknow family. It has 16 chapters in four parts (about 51,000 words per language) and anime-style scene art taken from the story's poster.
- **Kamra Number 7 / Room Number 7**: a locked-room murder in Mussoorie, told in a prologue, 22 chapters and an epilogue (about 37,500 words per language), with 30 hand-drawn SVG illustrations.

## Features

- **Two languages, one switch.** EN/HI toggle in every header, remembered between visits.
- **Illustrated scenes.** Every chapter opens with a scene, and key moments have inline illustrations. Kamra Number 7 uses hand-drawn SVGs. Aakhri Gawah uses anime artwork as WebP (crops of its poster; see the prompt pack below to replace them). A story can also show a portrait **poster** on its home page.
- **Detective's notebook.** Clues unlock as you read. It also has a suspect board taken from the opening chapters, so nothing is spoiled.
- **Guess the killer.** Before the final confrontation the reader locks in a guess (or skips). The result appears after the reveal.
- **Reading comfort.** Night and Paper themes, five text sizes, a progress bar, "continue reading", per-chapter completion, and a reset option.
- **PWA.** Install prompt, full offline precache (every chapter and illustration of both stories), and an "update available" toast.

## Run it

Requires **Node 20.19+** (the repo's `.nvmrc` pins Node 22).

```bash
nvm use            # Node 22
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve dist/ at http://localhost:4173 (service worker active)
```

To test install and offline mode, run `npm run build && npm run preview`, open the app once, then go offline in DevTools.

### Deploying

`dist/` is a static site. The app uses clean URLs (`/story/...`), so the host must rewrite unknown paths to `/index.html`. Vercel and Netlify do this with a one-line SPA rewrite rule. After the first visit, the service worker handles navigation offline.

## Project layout

```
src/
  App.tsx, main.tsx            routes, fonts, PWA registration
  pages/                       Library, StoryHome, Reader, Notebook, NotFound
  components/                  ChapterBody (markup renderer), Guess, SettingsSheet, LangToggle, ...
  lib/markup.ts                the tiny chapter markup parser
  state/                       settings (language, theme, text size) and reading progress, in localStorage
  i18n/strings.ts              UI strings in English and Hinglish
  stories/
    index.ts                   the story registry (add new stories here)
    types.ts
    aakhri-gawah/
      index.ts                 metadata: parts, chapters, clues, suspects, guess gate, poster
      content/{en,hi}/*.md     chapters ch01–ch16
      scenes/*.webp            anime scene art (cover.webp is the full poster)
    kamra-number-7/
      index.ts                 metadata: parts, chapters, clues, suspects, guess gate
      content/en/*.md          English chapters
      content/hi/*.md          Hindi (Hinglish) chapters
      scenes/*.svg             illustrations (cover.svg is the story cover)
docs/kamra-number-7/SOLUTION_BIBLE.md   ⚠️ full solution and timeline (spoilers)
docs/aakhri-gawah/STORY_BIBLE.md        ⚠️ full solution, timeline and continuity ledger (spoilers)
docs/aakhri-gawah/IMAGE_PROMPTS.md      anime prompt for every scene id, plus how to swap images
```

## Adding the next story

1. Copy `src/stories/aakhri-gawah/` (raster art) or `src/stories/kamra-number-7/` (SVG art) to a new folder, for example `src/stories/my-story/`.
2. Edit its `index.ts`: id, titles, blurb, parts, chapters (each chapter needs a `hero` scene), clues, suspects, and optionally `guess`. The `guess.answer` is the base64 of the correct option id, for example `btoa('rohan')`.
3. Write chapters as `content/en/<chapterId>.md` and `content/hi/<chapterId>.md`. If a Hindi file is missing, the reader falls back to English.
4. Add illustrations to `scenes/` (`.svg`, `.webp`, `.png` or `.jpg`; the file name is the scene id, one file per id). Include a `cover`. For a portrait poster, set `poster` (shown whole on the story page) and `coverPosition` (CSS `object-position` used when the cover is cropped into a wide card). Keep raster images at about 1280×720 WebP so the offline cache stays small (the PWA skips files over 3 MB).
5. Register the story in `src/stories/index.ts`.

To add a third language, add its code to `LANGS` in `src/stories/types.ts`, add UI strings in `src/i18n/strings.ts`, add its text to each story's `Localized` fields, and add a `content/<lang>/` folder.

### Chapter markup

```
Plain paragraphs, separated by blank lines. **bold** and *italic* work.

---                                   scene break
> A quoted line                       pull quote
@scene cctv-umbrella | Caption        illustration from scenes/
@clue c2                              clue card (text comes from index.ts)

:::message Vikram → Arjun · 10:12 PM  styled blocks: message | letter | doc | note
Text...
:::

:::timeline Title
9:45 PM | Arjun leaves
:::
```

## Icons

PWA icons are generated from `public/logo.svg` by `npm run icons` (`@vite-pwa/assets-generator`).
