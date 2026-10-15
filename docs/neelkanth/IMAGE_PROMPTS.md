# Neelkanth Dweep: image prompts

All art was generated with [AI Horde](https://aihorde.net) (anonymous key) using the **Counterfeit** anime model: 576×320 (the cover at 384×576), 28 steps, `k_dpmpp_2m` with Karras, CFG 7, two variants per request, upscaled with `RealESRGAN_x4plus_anime_6B`. The chosen variant was converted with sharp to 1280×720 WebP at quality 78. The cover is 1024×1536 with the title added.

Two things to know if you regenerate:

- **The upscaler sometimes leaves bright neon-green specks.** Those were removed by masking strongly green pixels near the specks and filling them from the surrounding pixels. Do not run that cleanup on scenes that are green or teal overall (the jetty, for example), because it smears them.
- **Horde's safety filter often blocks empty interiors made with anime models**, especially prompts that mention a bedroom or a bed. The final room images use prompts that say "room", "still life" and "nobody", with people and beds in the negative prompt.

Images live in `src/games/neelkanth/images/`. The file name is the image id used in `index.ts`. Investigation images (`i-*`) have hotspots at percentage positions on objects in the picture, so if you replace one, also update the `x`/`y` of its spots (and any evidence `pic` crops) in `index.ts`.

**Style prefix:** `masterpiece, best quality, anime key visual, cinematic, detailed background, dramatic lighting, film grain, muted colors`

**Negative prompt:** `lowres, bad anatomy, bad hands, extra fingers, missing fingers, text, letters, watermark, signature, logo, nsfw, nude, gore, blood, chibi, blurry, deformed, jpeg artifacts, extra limbs, cropped head, multiple views`

| Id | Used for | Prompt |
|---|---|---|
| `cover` | Game poster (portrait, title added) | small rocky tropical island in a stormy arabian sea at dusk, an old white lighthouse on the cliff, a konkan style bungalow with red tiled roof among palm trees, lightning, huge waves, a single lit window, ominous, cinematic poster composition |
| `g-arrival` | Act 1, the boat to the island | a small wooden motor boat approaching a rocky island with an old white lighthouse and coconut palms, dark monsoon clouds, rough grey sea, spray, wide shot |
| `g-dinner` | Act 1, dinner | seven people around a long dinner table on a verandah of an old konkan bungalow at night, fish curry, pink drinks in glasses, warm yellow lamps, rain outside, tense atmosphere |
| `g-lighthouse` | Act 1, climbing the lighthouse with Madhav | old white lighthouse on a cliff at blue hour, a man standing on the iron balcony at the top looking at the stormy sea, rain, wind, cinematic |
| `g-storm` | Act 2, the scream | violent monsoon storm over the arabian sea at dawn, huge waves crashing on black rocks, palm trees bending, grey light |
| `g-hall` | Act 3 start; Not proven ending | spacious old bungalow hall with wooden beams, people sitting apart on old sofas, rain streaming down tall windows, oil lamp, tense silence |
| `g-night` | Act 4, the second night | dark verandah of an old bungalow at night in heavy rain, wet wooden floor, a figure in a white dupatta walking away in the distance, dim lamp, suspense |
| `g-accusation` | Act 5, the Coast Guard arrives | dramatic scene in an old bungalow hall, six people standing in a circle, one person pointing, storm light from the windows, tense |
| `g-coastguard` | Wrong-accusation and Heart failure endings | an indian coast guard patrol boat cutting through rough grey sea towards a small island, morning, spray |
| `g-epilogue` | Justice ending | calm sea at sunrise after a storm, an old wooden jetty, a lone figure standing at the end of the jetty, golden light, peaceful melancholic |
| `g-2006` | Act 1, the storm arrives (memory of 2006) | an old blue fishing trawler fighting huge waves in a monsoon storm at night, lightning, desperate, dramatic |
| `i-study` | Study (Act 2 and the Act 3 revisit) | interior of an old indian study on a stormy grey morning, a large wooden writing desk with an old green typewriter, a tall glass of juice beside it on a saucer, a small pill box, a desk lamp, a long low wooden couch under a rainy window, a grey steel safe in the corner, tall bookshelves, a glass-paned door on the left, cool blue light, nobody, still life (negative prompt adds: people, bed, sunny) |
| `i-kitchen` | Kitchen | interior of an old indian village kitchen on a rainy morning, a heavy grey stone mortar and pestle on the wooden counter in the foreground, a magnetic knife strip on the tiled wall with knives, two gas stoves, an old white refrigerator, steel vessels, an open back door showing a rainy yard with a big copper water heater, grey light, empty room (negative prompt adds: people, bed, sunny) |
| `i-jetty` | Jetty | wooden jetty on a rocky island, a small tree with large green fruits next to a boathouse, an old lantern box, rope coils, rough sea behind, overcast |
| `i-lighthouse` | Watch room under the lamp | interior of an old lighthouse lamp room, a huge glass lens in the center, a small wooden desk with a logbook, a chair, curved windows looking at the stormy sea |
| `i-room-farida` | Farida's room | a neat guest room interior in an old indian bungalow, a writing desk with stacked legal files and reading glasses, an open suitcase on a luggage rack, a pair of white flat leather sandals on the wooden floor, a window with rain, still life, nobody (negative prompt adds: people, bed, sunny) |
| `i-room-tara` | Tara's room | a small office room interior with a wooden desk covered in spiral notebooks, a framed old photograph of a fishing boat on a shelf, a canvas tote bag hanging on the back of the door, a warm desk lamp, rain on the window, still life, nobody (negative prompt adds: people, bed, sunny) |
| `i-room-sid` | Sid's room | a messy room interior, an open laptop on a desk, energy drink cans on the windowsill, a black duffel bag on the floor, a smartphone charging on a side table, clothes thrown on a chair, dim light, still life, nobody (negative prompt adds: people, bed, sunny) |
| `i-room-nandini` | Nandini's dressing room | elegant bedroom in an old bungalow, a carved wooden dressing table with a mirror, a folded silk saree, documents on a side table, a teak wardrobe, soft light |
| `i-room-commander` | The Commander's room | a spartan room interior of a retired naval officer, a model fishing trawler in a glass case on a desk, a bookshelf of old books, a notepad on a small table by the window, binoculars and a navy cap, rain on window, still life, nobody (negative prompt adds: people, bed, sunny) |
