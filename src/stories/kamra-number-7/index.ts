import type { Chapter, Clue, Lang, Localized, Part, StoryMeta, Suspect } from '../types'

const sceneUrls = import.meta.glob<string>('./scenes/*.{svg,webp,png,jpg}', { eager: true, query: '?url', import: 'default' })
const scenes = Object.fromEntries(
  Object.entries(sceneUrls).map(([path, url]) => [path.replace(/^.*\/(.+)\.\w+$/, '$1'), url]),
)

const content = import.meta.glob<string>('./content/*/*.md', { query: '?raw', import: 'default' })

const L = (en: string, hi: string): Localized => ({ en, hi })

const parts: Part[] = [
  { id: 'p1', label: L('Part One', 'Bhaag Ek'), title: L('Room Number Seven', 'Kamra Number 7') },
  { id: 'p2', label: L('Part Two', 'Bhaag Do'), title: L('Layers of Lies', 'Jhooth ki Parten') },
  { id: 'p3', label: L('Part Three', 'Bhaag Teen'), title: L('Wrong Roads', 'Galat Raaste') },
  { id: 'p4', label: L('Part Four', 'Bhaag Chaar'), title: L('The Final Curtain', 'Aakhri Parda') },
]

const ch = (n: number, partId: string, en: string, hi: string, hero: string): Chapter => ({
  id: `ch${String(n).padStart(2, '0')}`,
  partId,
  label: L(`Chapter ${n}`, `Adhyay ${n}`),
  title: L(en, hi),
  hero,
})

const chapters: Chapter[] = [
  {
    id: 'prologue',
    partId: null,
    label: L('Prologue', 'Prastavna'),
    title: L('The Night the Clock Stopped', 'Woh Raat Jab Ghadi Ruk Gayi'),
    hero: 'hotel-storm',
  },
  ch(1, 'p1', 'The Detective Arrives', 'Detective Ka Aana', 'arrival-dawn'),
  ch(2, 'p1', 'What the Room Said', 'Kamre Ki Khamoshi', 'desk-scene'),
  ch(3, 'p1', 'Four People, Four Stories', 'Chaar Log, Chaar Kahaniyan', 'four-suspects'),
  ch(4, 'p1', 'The First Secret of the Tea', 'Chai Ka Pehla Raaz', 'tea-tray'),
  ch(5, 'p2', 'The Red Umbrella', 'Laal Umbrella', 'cctv-umbrella'),
  ch(6, 'p2', "Arjun's Lie", 'Arjun Ka Jhooth', 'interrogation'),
  ch(7, 'p2', 'Rohan and the Basement', 'Rohan Aur Basement', 'basement-generator'),
  ch(8, 'p2', 'The Wet Paper', 'Geela Kagaz', 'wet-paper'),
  ch(9, 'p2', "Meera's Corridor", 'Meera Ka Corridor', 'corridor-night'),
  ch(10, 'p2', "The Doctor's Bottle", 'Doctor Ki Bottle', 'doctor-bottle'),
  ch(11, 'p2', 'The Clock That Never Stopped', 'Ghadi Jo Shayad Kabhi Ruki Hi Nahi', 'clock-open'),
  ch(12, 'p3', 'The Theory Everyone Believed', 'Woh Theory Jo Sabko Sahi Lag Rahi Thi', 'case-board'),
  ch(13, 'p3', 'The Name of the Poison', 'Zeher Ka Naam', 'lab-glass'),
  ch(14, 'p3', 'Room Number Nine', 'Kamra Number Nau', 'room-nine'),
  ch(15, 'p3', 'The Face Under the Red Umbrella', 'Laal Chhatri Ka Chehra', 'shop-camera'),
  ch(16, 'p3', 'Thirty Tablets', 'Tees Goliyan', 'thirty-tablets'),
  ch(17, 'p3', 'Diesel and Rain', 'Diesel Aur Baarish', 'petrol-pump'),
  ch(18, 'p3', "Arjun's Truth", 'Arjun Ka Sach', 'bolt-door'),
  ch(19, 'p4', 'Two Detectives, One Night', 'Do Jasoos, Ek Raat', 'pantry-tray'),
  ch(20, 'p4', "The Generator's Diary", 'Generator Ki Diary', 'generator-log'),
  ch(21, 'p4', 'Four Suspects, One Truth', 'Chaar Suspects, Ek Sach', 'dining-room'),
  ch(22, 'p4', 'The Real Face', 'Asli Chehra', 'photo-frame'),
  {
    id: 'epilogue',
    partId: null,
    label: L('Epilogue', 'Upsanhaar'),
    title: L('The Clock Ticks Again', 'Ghadi Phir Chal Padi'),
    hero: 'mussoorie-morning',
  },
]

const clue = (id: string, chapterId: string, title: Localized, text: Localized): Clue => ({ id, chapterId, title, text })

const clues: Clue[] = [
  clue(
    'call',
    'ch01',
    L('The call came late', 'Call der se aayi'),
    L(
      'Rohan says he went up to Room 7 at about 10:55. The anonymous call reached reception at 11:07, after the room had already been opened.',
      'Rohan kehta hai woh 10:55 ke aas-paas upar gaya. Anonymous call 11:07 par aayi, yaani kamra khulne ke baad.',
    ),
  ),
  clue(
    'sheet',
    'ch02',
    L('A missing page', 'Gayab panna'),
    L(
      'Fresh ink on Vikram\'s finger and an uncapped fountain pen. The top sheet of the notepad has been torn off, and no written page was found anywhere in the room.',
      'Vikram ki ungli par taaza syahi, fountain pen ka dhakkan khula. Notepad ka upar wala panna gayab hai, aur kamre mein kahin koi likha hua kagaz nahi mila.',
    ),
  ),
  clue(
    'sachet',
    'ch02',
    L('An unopened sachet', 'Bina khula sachet'),
    L(
      'An unopened sugar-free sachet lay on the tea tray next to a half-drunk cup.',
      'Chai ki tray par ek bina khula sugar-free sachet pada tha, aadhe piye cup ke paas.',
    ),
  ),
  clue(
    'fist',
    'ch02',
    L('The clenched fist', 'Band mutthi'),
    L(
      "Vikram's right fist is clenched, and the corner of a scrap of paper shows between his fingers.",
      'Vikram ki daayi mutthi bheechi hui hai. Ungliyon ke beech kagaz ka ek kona dikh raha hai.',
    ),
  ),
  clue(
    'c1',
    'ch04',
    L('Two kinds of tea', 'Do waqt ki chai'),
    L(
      "The doctor says he saw Vikram drinking tea at 9:50. The waiter says the tea was only delivered at 10:05.",
      'Doctor kehta hai usne 9:50 par Vikram ko chai peete dekha. Waiter kehta hai chai 10:05 par pahunchi.',
    ),
  ),
  clue(
    'c2',
    'ch05',
    L('The red umbrella', 'Laal umbrella'),
    L(
      'At 10:14 someone left through the main gate under a red umbrella. Nobody has been able to say who it was.',
      'Kisi ne 10:14 par laal umbrella ke saath main gate se hotel chhoda. Uski pehchaan abhi confirm nahi hai.',
    ),
  ),
  clue(
    'c3',
    'ch07',
    L("Rohan's alibi", 'Rohan ki alibi'),
    L(
      "Part of Rohan's alibi checks out: there is a register entry for 10:12. He also held the master key, and the basement camera was dark from 10:09 to 10:44.",
      'Rohan ki alibi ka kuch hissa verify hota hai (register mein 10:12). Lekin master key uske paas thi, aur basement camera 10:09 se 10:44 tak band tha.',
    ),
  ),
  clue(
    'c4',
    'ch08',
    L('The 10:12 message', '10:12 ka message'),
    L(
      "A threatening message was sent to Arjun from Vikram's phone at 10:12. Nobody has yet proved who typed it.",
      'Vikram ke phone se 10:12 par Arjun ko threatening message gaya. Kisne type kiya, ye abhi prove nahi hua.',
    ),
  ),
  clue(
    'c5',
    'ch09',
    L("Meera's missing minutes", 'Meera ke gayab minute'),
    L(
      'Meera did not tell the whole truth about where she went. She also says Vikram never took sugar or sweetener in his tea.',
      'Meera ne apni movement ka poora sach nahi bataya. Usne yeh bhi kaha ki Vikram chai mein na cheeni leta tha, na sugar-free.',
    ),
  ),
  clue(
    'c6',
    'ch10',
    L("The doctor's bottle", 'Doctor ki bottle'),
    L(
      "The doctor's statement is incomplete. A sealed bottle of Vikram's new prescription was in the desk drawer. On its own, the bottle proves nothing.",
      'Doctor ka bayan adhoora hai. Desk ki daraaz mein Vikram ki nayi dawai ki seal-band bottle mili. Sirf bottle se kuch prove nahi hota.',
    ),
  ),
  clue(
    'clock',
    'ch11',
    L('A dead battery', 'Mari hui battery'),
    L(
      "The clock's battery was dead, and housekeeping saw it showing 10:15 that morning. So 10:15 is not the time of death.",
      'Ghadi ki battery mari hui thi, aur housekeeping ne subah hi ise 10:15 par ruka dekha tha. 10:15 maut ka waqt nahi hai.',
    ),
  ),
  clue(
    'poison',
    'ch13',
    L('Poison in the pot', 'Ketli mein zeher'),
    L(
      'Toxicology found a lethal dose of a heart medicine in Vikram\'s blood, and the same drug in both the teapot and the cup.',
      'Toxicology: Vikram ke khoon mein dil ki dawai ki jaanleva matra, aur wahi dawai ketli aur cup dono mein.',
    ),
  ),
  clue(
    'will',
    'ch13',
    L('A new heir', 'Naya waaris'),
    L(
      'Vikram was going to change his will on the 15th and add "a new heir". He never said who it was.',
      'Vikram 15 tareekh ko will badalne wala tha, "ek naya waaris" jodne. Naam usne kisi ko nahi bataya.',
    ),
  ),
  clue(
    'room9',
    'ch14',
    L('Room 9', 'Kamra number 9'),
    L(
      "Meera spent the night in Dr. Kapoor's room. The two of them are having an affair.",
      'Meera us raat Dr. Kapoor ke kamre mein thi. Dono ka affair hai.',
    ),
  ),
  clue(
    'umbrella-face',
    'ch15',
    L('The face under the umbrella', 'Umbrella ke neeche chehra'),
    L(
      "The man with the red umbrella was Dr. Kapoor, fetching Vikram's medicine from his car at 10:15. He went to Room 7 only once, at 10:22.",
      'Laal umbrella wala aadmi Dr. Kapoor tha. Woh 10:15 par car se Vikram ki dawai laaya, aur Kamra 7 mein sirf ek baar gaya, 10:22 par.',
    ),
  ),
  clue(
    'pink',
    'ch16',
    L('A pink residue', 'Gulabi residue'),
    L(
      "The doctor's bottle is still sealed with all 30 tablets inside. The poison in the teapot left a pink coating residue, which matches neither Vikram's brand nor the doctor's. Vikram was already ill at 10:22, and a dark blazer was standing behind the glass of the service staircase.",
      'Doctor ki bottle seal-band thi, poori 30 goliyan. Ketli ke zeher mein gulabi coating ka residue mila, jo na Vikram ka brand hai na doctor ka. Vikram 10:22 par hi bimaar tha, aur service staircase ke sheeshe ke peeche ek dark blazer khada tha.',
    ),
  ),
  clue(
    'diesel',
    'ch17',
    L('Diesel and rain', 'Diesel aur baarish'),
    L(
      'The scrap from the fist is wet with rainwater and carries traces of diesel. The impressions left on the notepad read: "…tumhari maa…", "…1995…", "…maafi…", "…Sharma ji…".',
      'Mutthi wala kagaz barish ke paani aur diesel se geela tha. Notepad par dabe akshar mile: "…tumhari maa…", "…1995…", "…maafi…", "…Sharma ji…".',
    ),
  ),
  clue(
    'caller',
    'ch17',
    L('The 11:07 caller', '11:07 ka caller'),
    L(
      "The anonymous call came from the landline at Kandiyal Filling Station. Arjun's card was used there at 11:04.",
      'Anonymous call Kandiyal Filling Station ke landline se aayi thi. Wahan 11:04 par Arjun ka card chala.',
    ),
  ),
  clue(
    'bolt',
    'ch18',
    L('The bolt', 'Chitkani'),
    L(
      'Arjun heard Vikram slide the bolt shut from inside at 10:36. Vikram locked his own door, and nobody went in until it was broken open.',
      'Arjun ne 10:36 par andar se chitkani lagne ki awaaz suni. Kamra Vikram ne khud band kiya tha, aur darwaza todne tak koi andar nahi gaya.',
    ),
  ),
  clue(
    'pantry',
    'ch19',
    L('One minute alone', 'Ek minute akeli'),
    L(
      'While Mohan went to the store for the sachet, the tea tray sat unattended in the first-floor pantry for about a minute. Two people were in the pantry at the time.',
      'Sachet laane Mohan store gaya, aur tray first-floor pantry mein lagbhag ek minute akeli rahi. Us waqt pantry mein do log the.',
    ),
  ),
  clue(
    'dg',
    'ch20',
    L("The generator's memory", 'Generator ki yaaddasht'),
    L(
      "The generator's controller logged the test run at 10:41, not 10:12. Someone switched the basement camera off at its own breaker.",
      'Generator ke controller mein test run 10:41 par darj hai, 10:12 par nahi. Basement camera ka MCB haath se band kiya gaya tha.',
    ),
  ),
  clue(
    'pharmacy',
    'ch20',
    L('A name from Dehradun', 'Dehradun ka ek naam'),
    L(
      'Every month a Dehradun pharmacy dispensed the pink tablets to one patient, a woman whose son came in to collect them. She died on 14 October, exactly two years before the murder.',
      'Dehradun ki ek pharmacy har mahine yeh gulabi goliyan ek hi mareez ko deti thi, ek aurat jinka beta dawai lene aata tha. Unki maut 14 October ko hui, murder se theek do saal pehle.',
    ),
  ),
]

const suspects: Suspect[] = [
  {
    id: 'arjun',
    name: 'Arjun Malhotra',
    role: L('Business partner', 'Business partner'),
    summary: L(
      'Vikram\'s partner of twelve years. They had been fighting for months over control of the company and the planned sale of the hotel.',
      'Vikram ka baarah saal purana partner. Company ke control aur hotel ki bikri ko lekar mahino se jhagda chal raha tha.',
    ),
    claim: L('"I left the hotel at 9:45. I didn\'t meet Vikram again that night."', '"Main 9:45 par hotel se nikal gaya tha. Us raat Vikram se dobara mulaqat nahi hui."'),
  },
  {
    id: 'meera',
    name: 'Meera Sethi',
    role: L('Wife', 'Patni'),
    summary: L(
      'Vikram\'s second wife. The staff often heard them arguing, and that week they were sleeping in separate rooms.',
      'Vikram ki doosri patni. Staff ne dono ko aksar ladte suna tha, aur us hafte dono alag kamron mein the.',
    ),
    claim: L('"After ten o\'clock I was in my own room."', '"Main 10 baje ke baad apne kamre mein thi."'),
  },
  {
    id: 'rohan',
    name: 'Rohan Malhotra',
    role: L('Hotel manager', 'Hotel manager'),
    summary: L(
      'A capable, quiet manager who has run Silver Pine for seventeen months. He holds the master key and found the body.',
      'Kaabil, kam bolne wala manager, satrah mahine se Silver Pine chala raha hai. Master key uske paas hai, aur body usi ne discover ki.',
    ),
    claim: L('"Around 10:10 I went down to the basement to check the generator."', '"Main 10:10 ke aas-paas generator check karne basement gaya tha."'),
  },
  {
    id: 'kapoor',
    name: 'Dr. Sameer Kapoor',
    role: L('Family doctor', 'Family doctor'),
    summary: L(
      "Vikram's doctor for fifteen years, and the man who knows his heart condition best. He drove up from Dehradun that evening.",
      'Pandrah saal se Vikram ka doctor. Uski dil ki bimari ke baare mein sabse zyada wahi jaanta hai. Us shaam Dehradun se aaya tha.',
    ),
    claim: L('"I saw Vikram drinking tea at 9:50. He was alive and perfectly normal."', '"Maine Vikram ko 9:50 par chai peete dekha tha. Woh tab zinda aur bilkul normal tha."'),
  },
]

const story: StoryMeta = {
  id: 'kamra-number-7',
  title: L('Room Number 7', 'Kamra Number 7'),
  tagline: L('A locked-room murder in the hills of Mussoorie', 'Mussoorie ke pahadon mein ek locked-room murder'),
  blurb: L(
    "A stormy October night in Mussoorie. Vikram Sethi, owner of the old Silver Pine Hotel, is found dead in Room 7. The door was bolted from the inside and the window was shut. A clock lay broken at 10:15. In his fist was a wet scrap of paper: \"The real face belongs to the one who saw me alive for the last time.\" Four people had reasons to lie that night. Inspector Dev Rathore and his restless partner Kabir Ansari must work out which lie is hiding a murder.",
    'Mussoorie ki ek toofani October raat. Purane Silver Pine Hotel ke maalik Vikram Sethi Kamra Number 7 mein mare hue milte hain. Darwaza andar se band, khidki band, aur 10:15 par ruki ek tooti ghadi. Mutthi mein ek geela kagaz: "Asli chehra usi ka hai, jisne mujhe aakhri baar zinda dekha." Us raat chaar logon ke paas jhooth bolne ki wajah thi. Inspector Dev Rathore aur uske bechain sathi Kabir Ansari ko pata lagana hai ki kaun sa jhooth ek qatl chhupa raha hai.',
  ),
  genres: [L('Locked-room mystery', 'Locked-room mystery'), L('Detective thriller', 'Detective thriller'), L('Psychological', 'Psychological')],
  cover: scenes['cover'],
  readingMinutes: 190,
  parts,
  chapters,
  clues,
  suspects,
  guess: {
    beforeChapterId: 'ch21',
    revealAfterChapterId: 'ch22',
    question: L('Who killed Vikram Sethi?', 'Vikram Sethi ka khooni kaun hai?'),
    intro: L(
      'Dev has gathered everyone in the dining room. You have seen every clue he has seen. Who do you think killed Vikram Sethi?',
      'Dev ne sabko dining room mein bulaya hai. Jo clues Dev ne dekhe, woh sab aapne bhi dekhe hain. Aapke hisaab se Vikram Sethi ka khooni kaun hai?',
    ),
    options: [
      { id: 'arjun', label: 'Arjun Malhotra' },
      { id: 'meera', label: 'Meera Sethi' },
      { id: 'rohan', label: 'Rohan Malhotra' },
      { id: 'kapoor', label: 'Dr. Sameer Kapoor' },
      { id: 'other', label: 'Someone else / Koi aur' },
    ],
    answer: 'cm9oYW4=',
  },
  scenes,
  loadChapter: async (lang: Lang, chapterId: string) => {
    const loader = content[`./content/${lang}/${chapterId}.md`] ?? content[`./content/en/${chapterId}.md`]
    if (!loader) throw new Error(`Missing chapter ${chapterId}`)
    return loader()
  },
}

export default story
