# Aakhri Gawah: Anime Scene Prompt Pack

The illustrations in the app are currently **crops of the original "AAKHRI GAWAH – The Last Witness" poster**. That keeps the look consistent, but several scenes share the same artwork. This pack gives one prompt per scene id so each image can be replaced with a purpose-made anime illustration in the same style.

> Contains light spoilers (scene descriptions). Characters' visual notes match the poster.

## How to replace an image

1. Generate the image at **16:9** (1920×1080 or 1280×720). The cover is the exception: **2:3** (1024×1536).
2. Convert it to WebP at about quality 78, so each file stays roughly under 250 KB:
   `npx sharp-cli -i in.png -o ag-dev.webp -f webp -q 78` (or any image tool).
3. Save it in `src/stories/aakhri-gawah/scenes/` with **exactly the same file name** (`ag-dev.webp`). `.png` and `.jpg` also work, but delete the old file with the same id so that there is only one file per id.
4. `npm run build`. The scene appears everywhere that id is used, with no code changes.

To add a **new** scene, drop in a new file (for example `ag-carpark.webp`) and reference it in a chapter with `@scene ag-carpark | Caption`.

## Shared style block (prepend to every prompt)

```
dark cinematic anime illustration, semi-realistic anime style like a modern mystery-thriller key visual,
North Indian setting (Lucknow), detailed painted backgrounds, dramatic chiaroscuro lighting,
warm amber window and lamp light against cool blue-teal night shadows, dusk sky in burnt orange and violet,
light film grain, soft rain or winter fog haze, muted desaturated palette with gold accents,
sharp clean line art, expressive eyes, no text, no watermark
```

**Negative prompt:** `chibi, cartoon, 3d render, photo, western comic style, gore, visible wounds, blood spray, nudity, text, logo, watermark, extra fingers, deformed hands`

**Sensitivity rules:** never depict self-harm or a child being hurt. Show abuse and violence only through symbols and aftermath: the chain on glass, long sleeves, a closed door, a photo frame face down. Blood, if any, is a dark stain and never a wound.

## Character sheet (keep consistent)

| Character | Look |
|---|---|
| **Dev Rathore**, 42 | Lean, stubble, rectangular glasses, old brown felt fedora, long dark wool overcoat, tired, kind eyes, small white scar across the second knuckle of his right hand |
| **Kabir Ansari**, 30 | Clean-shaven, short neat hair, police-issue sweater or leather jacket, earnest and sharp |
| **Rajiv Sethi**, 49 | Handsome, silver at the temples, crisp white shirt, heavy gold chain with a round sun-engraved medallion, polished public smile |
| **Rahul Sethi**, 17 | Thin, messy black hair, dark guarded eyes, **always full sleeves** pulled over his hands (grey hoodie, later a navy sweater) |
| **Pari Sethi**, 12 (in memory) | Laughing, slightly crooked front tooth, pink flower hair clip, pink frock, white plush bunny "Gajar" with one re-sewn ear |
| **Nandita Sethi**, 42 | Elegant, long dark hair coming loose, dark silk saree or office wear, exhausted, guarded |
| **Vivek Saxena**, 36 | Unshaven, crumpled shirt, jacket thrown over it, anxious |
| **Sharda Devi**, 69 | Small, upright, grey hair in a bun, small red bindi, grey cotton saree, grey shawl, thin gold bangle |
| **Mohan Lal**, 54 | Wiry, grey stubble, thin brown sweater with darned elbows |

## Prompts by scene id

### `cover` (2:3)
Poster composition. Dev in a felt hat and glasses in the centre foreground, half in shadow. Behind him, stacked like a key visual: Rajiv above, Nandita left, Vivek right, Rahul (17) top right looking away, Sharda bottom right. Lower third: a gold sun medallion on a dark floor, a child's spiral notebook with a crayon drawing, and a lit study window. A Lucknow skyline at dusk (domes and modern towers), with rain. Leave empty space at the top for a title. *(Add the title text later in an editor, not in the generation.)*

### `ag-rajiv`: Ch1 "The Man Everyone Respected"
Rajiv Sethi on a hotel ballroom stage under spotlights, one hand on his son's shoulder, microphone in the other, warm public smile. A huge banner behind them shows a laughing 12-year-old girl, softly out of focus. Low angle, golden light, the audience as dark silhouettes.

### `ag-study`: Ch2 "Ten Thousand Rupees"
A wood-panelled study at night lit only by a green banker's lamp. A glass-topped teak desk, the top-right drawer open a hand's width, a brass trophy on the corner, a silver photo frame lying face down on the bookshelf. A dark shape on the floor between desk and shelf, implied and not shown. Cold blue moonlight from the window.

### `ag-vivek`: Ch3 "A Debt Unpaid"
Vivek Saxena at night in the rain, standing beside a white SUV in a quiet residential lane, phone pressed to his ear, face lit by the screen, anxious. Bungalow windows glowing amber behind him. A lane CCTV camera on a pole in the corner of the frame.

### `ag-rahul`: Ch4 "The Quiet Boy"
Rahul, 17, sitting on the edge of a narrow bed in a small rooftop room (a barsati). School books stacked in exact piles, grey full-sleeved sweatshirt with the cuffs pulled over his hands, guarded eyes looking past the viewer. Hard winter-blue sky through the window, rooftops and water tanks outside.

### `ag-chain`: Ch5 "The Servant's Past"
Close-up of a heavy gold chain with a round sun-engraved medallion half wrapped in red cloth, inside an old tin trunk among folded white dhotis. A torch beam cuts across it. Dust motes, warm gold against cold shadow.

### `ag-nandita`: Ch6 "A Wife's Silence"
Nandita sitting on the edge of a bed in a dim upstairs bedroom, lit only by the flickering blue glow of a television she isn't watching. She has a shawl over her shoulders, her hair is coming loose, and her hands are pressed together in her lap. Her eyes are turned towards the closed door. *(This id is also used for her arrest in Ch8 and the jail gate in Ch14, so keep it a portrait and not a specific location.)*

### `ag-dev`: Ch7 "The Missing Hour"
Dev in his felt hat and glasses before a whiteboard covered in a timeline grid (six columns, blue marker, red letters). One sentence is circled in red. Night office, a single desk lamp, his reflection faint in the dark window.

### `ag-house`: Ch8 "The Wrong Answer"
A white two-storey bungalow with a curved balcony at night in winter fog. Police vehicles with blue-red light washing the facade, a woman being led down the front steps between two women constables, a photographer's flash. The video doorbell's blue ring glows by the door.

### `ag-locket`: Ch9 "The Chain"
Extreme close-up of the gold sun medallion lying on a glass desktop, reflected in it. A man's hand is just withdrawing from it at the edge of the frame. Shallow depth of field, ominous warm light.

### `ag-pari`: Ch10 "The Third Anniversary"
A courtyard at dusk lined with small clay diyas on the walls. Pari's framed photograph sits on a low table with a marigold garland. A teenage boy sits on a step hugging an old white plush bunny with a re-sewn ear. Girls in a row sing, and an old woman sits on a stool beside a neem tree. Soft, tender, warm.

### `ag-walk`: Ch11 "The Friend's Answer" (also the final image of Ch16)
Dev seen from behind in a long coat and felt hat, standing at the edge of a rooftop or riverfront wall, looking over the Lucknow skyline at dusk. City lights coming on, the Gomti river reflecting the orange sky. Lonely, contemplative.

### `ag-rahul-young`: Ch12 "The Chain on the Floor"
A rooftop on a winter afternoon full of kites in the sky. Rahul kneels on terracotta tiles with his palm pressed flat over a gold medallion, head bowed, arm shaking. A cheap wooden kite reel with pink string on the parapet. Golden-orange low sun with long shadows.

### `ag-window`: Ch13 "Behind the Locked Door"
Night, a rooftop in Aliganj. Two silhouettes: a man standing with his hat in his hands, a boy sitting against a wall with his knees drawn up. Between them on the tiles, a small glint of gold and a white envelope. The last orange light fades to grey, and water tanks are silhouetted.

### `ag-ensemble`: Ch14 "The Detective's Choice"
Split composition: Dev in the centre, eyes closed. Left: Kabir at a whiteboard wiping it clean, one faint red circle remaining. Right: Nandita stepping out of a jail gate at dusk with a cloth bag. Background: the Commissionerate building, cold and institutional.

### `ag-sharda`: Ch15 "What Pari Asked For"
Sharda Devi, 69, sitting upright on a divan in a small front room lit by the orange glow of a room heater. Her hands rest on a cloth bag in her lap, her eyes are wet but steady, and gold-rimmed teacups sit untouched on the table. Old family photographs on the walls.

### `ag-notebook`: Ch16 "The Last Witness"
A child's spiral notebook open on a kitchen table in morning fog light: a crayon drawing of a girl in a pink frock beside blue and yellow flowers, and a smiling sun in the corner. The handwritten line "I want to be a teacher when I grow up ♥" can be added in post. A cold glass of tea beside it.

## Optional extra scenes (new ids)

| id | Use in | Prompt |
|---|---|---|
| `ag-carpark` | Ch14 (Nandita's 32 minutes) | CCTV-style grainy top-down view of a silver sedan alone in the corner of a basement car park, headlights off, with a time code overlay added in post |
| `ag-jailgate` | Ch14 | A woman walking out of an old brick jail gate at dusk, holding a cloth bag, a white SUV waiting across the road |
| `ag-kitchen` | Ch15 | An old woman's kitchen in November light, a kadhai of red gajar halwa, a little girl's silhouette in the doorway with a plush bunny (no injuries shown) |
| `ag-knock` | Ch14 / Ch16 | A man's scarred knuckles raised to a whitewashed stairwell wall in darkness, a thin line of light from above |
| `ag-barabanki` | Ch16 | A village brick lane at winter noon, a two-room house, a buffalo, a wiry man on a string cot holding a brown envelope in both hands |
| `ag-kite` | Ch16 | A single red kite climbing high above Lucknow rooftops in a clear winter sky, the string glinting |
