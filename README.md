# Kahani — Mystery Novels (React PWA)

An installable, offline-capable reading app for illustrated detective novels and interactive murder cases. Readers can switch between **English** and **Hindi (Hinglish, Roman script)** at any point, and the app keeps their place.

One interactive case is included:

- **Neelkanth Dweep**: a decision-based murder case for one player. Seven people are cut off on a private island off the Konkan coast in the first monsoon storm, and the host is found poisoned. The player is one of the seven, a doctor and the host's nephew or niece, and plays as Rudra or Riya. Over five acts the player makes choices, examines photographs of the crime scene and the bedrooms, questions five suspects, and finally names the killer, the method and the motive. There are seven endings. Only a correct accusation that can also be proved reveals the truth.

Three novels are included:

- **Smriti / Jo Yaad Nahi Tha**: a psychological mystery about memory. A Jaipur psychologist receives a cassette from a woman who vanished seven years earlier from a research institute in the Uttarakhand hills. It has 16 chapters in four parts (about 56,000 words per language) and anime-style scene art generated for the story.
- **Aakhri Gawah / The Last Witness**: a murder in a respected Lucknow family. It has 16 chapters in four parts (about 51,000 words per language) and anime-style scene art taken from the story's poster.
- **Kamra Number 7 / Room Number 7**: a locked-room murder in Mussoorie, told in a prologue, 22 chapters and an epilogue (about 37,500 words per language), with 30 hand-drawn SVG illustrations.

## Features

- **Two languages, one switch.** EN/HI toggle in every header, remembered between visits.
- **Illustrated scenes.** Every chapter opens with a scene, and key moments have inline illustrations. Kamra Number 7 uses hand-drawn SVGs. Aakhri Gawah uses anime artwork as WebP (crops of its poster; see the prompt pack below to replace them). A story can also show a portrait **poster** on its home page.
- **Detective's notebook.** Clues unlock as you read. It also has a suspect board taken from the opening chapters, so nothing is spoiled.
- **Who's who.** A list of every character the reader has met so far: name, what they do, and how they are connected to the case, plus what the reader has learned about them since, chapter by chapter. It helps readers who come back after a few days, or who find names hard to keep track of. Open it from the people icon while reading, or from the story page and the notebook. A person appears once the chapter that introduces them is opened. Later facts, including who the culprit is, appear only after their chapter has been read to the end, so a twist never shows up before the reader reaches it.
- **Guess the killer.** Before the final confrontation the reader locks in a guess (or skips). The result appears after the reveal.
- **Reading comfort.** Night and Paper themes, five text sizes, a progress bar, "continue reading", per-chapter completion, and a reset option.
- **Interactive cases.** Story nodes, choices that change what happens later, photographs with numbered hotspots to examine, interviews whose sharper questions unlock only with the right evidence, and a final accusation (who, how, why). A **casebook** holds every piece of evidence, testimony and observation, each witness's statement in their own words, a people list and a timeline, so the player can re-read anything at any time. **Checkpoints** at the start of each act let the player re-investigate from any act they have reached instead of starting over. Endings found are remembered across playthroughs.
- **PWA.** Install prompt, full offline precache (every chapter, case and illustration), and an "update available" toast.

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

**GitHub Pages (set up):** every push to `main` runs `.github/workflows/deploy.yml`. The workflow builds with `BASE_PATH=/<repo>/` (the site lives at `https://<user>.github.io/<repo>/`) and copies `index.html` to `404.html`. Pages has no SPA rewrites, so that copy is what lets deep links like `/story/...` open the app. One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**. With a custom domain, set `BASE_PATH` to `/` in the workflow.

To check a Pages-style build locally: `BASE_PATH=/novel-app/ npm run build && npm run preview`, then open `http://localhost:4173/novel-app/`.

**Other hosts:** `dist/` is a static site. Build without `BASE_PATH` (served from `/`) and add a rewrite of unknown paths to `/index.html`. Vercel and Netlify each do this with a one-line SPA rule. After the first visit, the service worker handles navigation offline.

## Project layout

```
src/
  App.tsx, main.tsx            routes, fonts, PWA registration
  pages/                       Library, StoryHome, Reader, Notebook, GameHome, GamePlay, NotFound
  components/                  ChapterBody (markup renderer), Guess, SettingsSheet, LangToggle, ...
  components/game/             Casebook, Checkpoints, GameProse
  lib/markup.ts                the tiny chapter markup parser
  state/                       settings (language, theme, text size) and reading progress, in localStorage
  i18n/strings.ts              UI strings in English and Hinglish
  games/
    index.ts                   the game registry (add new cases here)
    types.ts                   node, hotspot, item, report and accusation types
    engine.ts                  save state, conditions, checkpoints, choices, the judge call
    neelkanth/
      index.ts                 acts, the node graph, hotspots, items, reports, people, endings, judge
      content/{en,hi}/*.md     every text section, split by "@@ <id>" lines
      images/*.webp            anime scene and investigation art (cover.webp is the poster)
  stories/
    index.ts                   the story registry (add new stories here)
    types.ts
    smriti/
      index.ts                 metadata (guess gate before Ch15, with story-specific result text)
      content/{en,hi}/*.md     chapters ch01–ch16
      scenes/*.webp            AI-generated anime scene art (cover.webp is the titled poster)
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
docs/smriti/STORY_BIBLE.md              ⚠️ full solution, both twists, clue ledger, timelines (spoilers)
docs/smriti/IMAGE_PROMPTS.md            how the Smriti art was generated, with the prompt for every scene
docs/neelkanth/GAME_BIBLE.md            ⚠️ the truth, the timeline, every path and how each ending is decided (spoilers)
docs/neelkanth/IMAGE_PROMPTS.md         the prompt for every scene and investigation image
```

## Adding the next story

1. Copy `src/stories/aakhri-gawah/` (raster art) or `src/stories/kamra-number-7/` (SVG art) to a new folder, for example `src/stories/my-story/`.
2. Edit its `index.ts`: id, titles, blurb, parts, chapters (each chapter needs a `hero` scene), clues, suspects, characters, and optionally `guess`. The `guess.answer` is the base64 of the correct option id, for example `btoa('rohan')`. `guess.right` / `guess.wrong` override the generic result lines.
3. Write chapters as `content/en/<chapterId>.md` and `content/hi/<chapterId>.md`. If a Hindi file is missing, the reader falls back to English.
4. Add illustrations to `scenes/` (`.svg`, `.webp`, `.png` or `.jpg`; the file name is the scene id, one file per id). Include a `cover`. For a portrait poster, set `poster` (shown whole on the story page) and `coverPosition` (CSS `object-position` used when the cover is cropped into a wide card). Keep raster images at about 1280×720 WebP so the offline cache stays small (the PWA skips files over 3 MB).
5. List the cast in `characters.ts` (see any existing story). Each character has the chapter where the reader first meets them, a tag (victim, suspect, investigator, witness, family and so on), a profession and a relation to the case, written only with what is known at that point. Put anything learned later in `later`, each note keyed to the chapter that reveals it; a note can also change the tag, for example to `culprit`. Mark background people `minor: true`.
6. Register the story in `src/stories/index.ts`.

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

## Adding an interactive case

1. Copy `src/games/neelkanth/` to a new folder and register it in `src/games/index.ts`.
2. In `index.ts`, define the `acts` (each act's `start` node is a checkpoint), the `nodes`, the casebook `items` and `reports`, the `people`, the `endings` and the `accusation.judge` function, which takes the player's who/how/why and an `owns(id)` check and returns the id of an ending node.
3. Node kinds:
   - `player`: the player picks who they are (sets `{{name}}` and the gender used by `{{his|her}}`-style templates).
   - `story`: prose with an optional image, then Continue. It can `give` items and `set` flags.
   - `choice`: options, each optionally hidden by a `when` condition, and each able to give items and set flags.
   - `investigate`: an image with hotspots at percentage positions. Spots can have a `show` condition; `need` lists spots that must be examined before moving on.
   - `interview`: questions that are locked (`when`) or hidden (`show`) until the player holds the right items.
   - `route`: silently picks the next node from conditions.
   - `accuse` and `ending`.
4. Conditions (`has`, `hasAny`, `lacks`, `flags`, `notFlags`, `countAtLeast`, `countBelow`) are checked against the items the player owns and the flags they have set.
5. Write all text in `content/<lang>/*.md`. A line `@@ <id>` starts a section. Node texts use the node id, hotspots use `h-<spot id>` and answers use `q-<question id>`. Sections use the chapter markup below, and `{{name}}` and `{{male form|female form}}` are filled in for the player. In Hinglish, use the templates on verbs that agree with "aap", for example `{{dekhte|dekhti}} hain`.
6. Put images in `images/` at about 1280×720 WebP. The cover is a portrait poster.

## Icons

PWA icons are generated from `public/logo.svg` by `npm run icons` (`@vite-pwa/assets-generator`).
