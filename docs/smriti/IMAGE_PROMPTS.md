# Smriti: Scene Art Notes

All 23 images in `src/stories/smriti/scenes/` were generated for this story with **AI Horde** (a free, volunteer-run Stable Diffusion network) using the **Counterfeit** anime model. Settings: 576×320 (cover 384×576), 28 steps, `k_dpmpp_2m` Karras, CFG 7, upscaled 4× with `RealESRGAN_x4plus_anime_6B`, two variants per scene. The better variant was hand-picked and converted to 1280×720 WebP (q78). The cover has its title added afterwards.

To replace any image, save a new 16:9 WebP (about 1280×720) in `src/stories/smriti/scenes/` with **the same file name**, and delete the old file if the extension differs. No code changes are needed.

**Shared style (prefix):** `masterpiece, best quality, anime key visual, cinematic, detailed background, dramatic lighting, film grain, muted colors`

**Negative:** `lowres, bad anatomy, bad hands, extra fingers, text, letters, watermark, nsfw, chibi, blurry, deformed`

| id | Used in | Prompt (after the style prefix) |
|---|---|---|
| `cover` | Library, story page | indian woman, long black hair, grey wool shawl, holding an audio cassette, dark old hospital corridor, a red door glowing at the far end behind her, rain, mist |
| `sm-parcel` | Ch1 | woman, 31, low bun, at a table at night with an open parcel, vintage cassette recorder and an old photograph, lamp, city window |
| `sm-bani-park` | Ch2 | old Jaipur haveli interior, jharokha light, open steel trunk of files, an old woman and a young woman reading papers |
| `sm-gauraiya` | Ch2 (inline) | indian girl, 24, short bob, laughing, yellow raincoat, a house sparrow on the railing, mountain mist |
| `sm-ira` | Ch3 | elderly woman, silver hair, spectacles, handloom saree and shawl, study full of books, rain on the window |
| `sm-red-door` | Ch4 | the red door (red-lit corridor variant) |
| `sm-dunda`, `sm-common-room` | Ch4 (inline) | mountain road above a gorge in rain; old sanatorium common room with a cracked wall clock, banner, lanterns |
| `sm-seven` | Ch5 | seven young people in an old common room during a power cut, two lanterns, rain, banner, wall clock |
| `sm-archive` | Ch6 | basement archive, steel cupboards of ledgers, reading a register by torchlight |
| `sm-generator` | Ch7 | man, 42, moustache, in an old diesel generator room holding a flashlight |
| `sm-landing` | Ch7 (inline) | exterior night, iron staircase on the side of an old stone building on a cliff, rain, lit generator-room window |
| `sm-photograph` | Ch8 | close-up of an old group photograph under a lamp, a hand with a magnifying glass |
| `sm-corridor` | Ch9 | long dark hospital corridor at night, wall clock, lantern, closed door at the far end, blue moonlight |
| `sm-cassette` | Ch10 | cassette tape and portable player on a windowsill, rain, mountains at night |
| `sm-kabir` | Ch11 | man, 35, short beard, denim jacket, writing at a desk by a mountain window |
| `sm-cure-walk` | Ch12 | narrow cliff path with broken railing, a collapsed section, river far below, rain |
| `sm-torch` | Ch12 (inline) | a single flashlight beam in heavy rain on a dark cliff path, iron railing |
| `sm-timeline` | Ch13 | woman seen from behind facing a wall of pinned notes and papers at night |
| `sm-sanatorium` | Ch14 | old abandoned stone sanatorium on a ridge in mist, deodars |
| `sm-hand-glass` | Ch15 | a young woman's hand reaching through streaked, rain-lit glass |
| `sm-jaipur-night` | Ch16 | young woman by her bedroom door at night, lamp, rain on the window |
| `sm-hyderabad` | Ch16 (inline) | elderly south Indian woman in a small old house, framed photo of a smiling young woman |
