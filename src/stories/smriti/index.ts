import type { Chapter, Clue, Lang, Localized, Part, StoryMeta, Suspect } from '../types'
import cast from './characters'

// Face crops of characters who appear in the story's art, named by character id.
const portraitUrls = import.meta.glob<string>('./portraits/*.webp', { eager: true, query: '?url', import: 'default' })
const characters = cast.map((c) => ({ ...c, photo: portraitUrls[`./portraits/${c.id}.webp`] }))

const sceneUrls = import.meta.glob<string>('./scenes/*.{svg,webp,png,jpg}', { eager: true, query: '?url', import: 'default' })
const scenes = Object.fromEntries(
  Object.entries(sceneUrls).map(([path, url]) => [path.replace(/^.*\/(.+)\.\w+$/, '$1'), url]),
)

const content = import.meta.glob<string>('./content/*/*.md', { query: '?raw', import: 'default' })

const L = (en: string, hi: string): Localized => ({ en, hi })

const parts: Part[] = [
  { id: 'p1', label: L('Part One', 'Bhaag Ek'), title: L('The Voice', 'Awaaz') },
  { id: 'p2', label: L('Part Two', 'Bhaag Do'), title: L('Seven Versions', 'Saat Bayaan') },
  { id: 'p3', label: L('Part Three', 'Bhaag Teen'), title: L('The Memory', 'Yaad') },
  { id: 'p4', label: L('Part Four', 'Bhaag Chaar'), title: L('The Last Version', 'Aakhri Bayaan') },
]

const ch = (n: number, partId: string, en: string, hi: string, hero: string): Chapter => ({
  id: `ch${String(n).padStart(2, '0')}`,
  partId,
  label: L(`Chapter ${n}`, `Adhyay ${n}`),
  title: L(en, hi),
  hero,
})

const chapters: Chapter[] = [
  ch(1, 'p1', 'The Parcel', 'Parcel', 'sm-parcel'),
  ch(2, 'p1', 'The Girl Who Never Existed', 'Woh Ladki Jo Thi Hi Nahi', 'sm-bani-park'),
  ch(3, 'p1', 'Project Smriti', 'Project Smriti', 'sm-ira'),
  ch(4, 'p1', 'The Red Door', 'Laal Darwaza', 'sm-red-door'),
  ch(5, 'p2', 'Seven People', 'Saat Log', 'sm-seven'),
  ch(6, 'p2', 'The Missing Hour', 'Woh Ghanta Jo Gayab Hai', 'sm-archive'),
  ch(7, 'p2', 'The Caretaker', 'Rakhwala', 'sm-generator'),
  ch(8, 'p2', 'The Photograph', 'Tasveer', 'sm-photograph'),
  ch(9, 'p3', 'What Meera Remembers', 'Meera Ko Kya Yaad Hai', 'sm-corridor'),
  ch(10, 'p3', "Ananya's Voice", 'Ananya Ki Awaaz', 'sm-cassette'),
  ch(11, 'p3', "Kabir's Secret", 'Kabir Ka Raaz', 'sm-kabir'),
  ch(12, 'p3', 'The Wrong Memory', 'Galat Yaad', 'sm-cure-walk'),
  ch(13, 'p4', 'The Official Truth', 'Sarkari Sach', 'sm-timeline'),
  ch(14, 'p4', 'What Was Hidden', 'Jo Chhupaya Gaya', 'sm-sanatorium'),
  ch(15, 'p4', 'The Second Truth', 'Doosra Sach', 'sm-hand-glass'),
  ch(16, 'p4', 'Smriti', 'Smriti', 'sm-jaipur-night'),
]

const clue = (id: string, chapterId: string, title: Localized, text: Localized): Clue => ({ id, chapterId, title, text })

const clues: Clue[] = [
  clue(
    'note',
    'ch01',
    L('The note in the parcel', 'Parcel ka note'),
    L(
      'Written in Hindi in a careful, unpractised hand: "Tum us raat wahan thi. Tumne hi darwaza band kiya tha." You were there that night. You were the one who closed the door.',
      'Hindi mein, ek dhyaan se likhe magar kachche haath se: "Tum us raat wahan thi. Tumne hi darwaza band kiya tha."',
    ),
  ),
  clue(
    'fragments',
    'ch01',
    L('Five things Meera cannot place', 'Paanch cheezein jo Meera ko yaad hain, par samajh nahi aatin'),
    L(
      'For seven years: a red door, a wall clock, a dark corridor, a hand pressed to glass with letters behind it she could never read, and three knocks.',
      'Saat saal se: ek laal darwaza, deewar ki ghadi, ek andhera corridor, kaanch par dabaa ek haath jiske peechhe kuch akshar jo woh kabhi padh nahi paayi, aur teen dastak.',
    ),
  ),
  clue(
    'gauraiya',
    'ch02',
    L('Gauraiya had another name', 'Gauraiya ka asli naam'),
    L(
      'The girl Meera knew only as "Gauraiya" was Ananya Rao, 24, of Secunderabad. She was reported missing from the institute on 15 September 2019. Police concluded she had left of her own accord. She was never found.',
      'Jis ladki ko Meera sirf "Gauraiya" ke naam se jaanti thi, woh Secunderabad ki 24 saal ki Ananya Rao thi. 15 September 2019 ko institute se laapata. Police ke hisaab se woh apni marzi se gayi thi. Kabhi mili nahi.',
    ),
  ),
  clue(
    'lock',
    'ch02',
    L("Ira's instructions to Meera's mother", 'Meera ki maa ko Ira ki hidayat'),
    L(
      'When Meera came home in 2019, Ira told her mother to lock Meera\'s bedroom door at night for a while, and to let her have "no sleeping pills, ever". Her mother also hid a newspaper item about a missing girl.',
      '2019 mein Meera ke ghar lautne par Ira ne unki maa se kaha tha ki kuch din raat ko Meera ke kamre ka darwaza band rakhein, aur "neend ki goli kabhi nahi". Maa ne ek laapata ladki wali khabar bhi chhupa di thi.',
    ),
  ),
  clue(
    'sisters',
    'ch03',
    L('Sisters by choice', 'Chuni hui behnein'),
    L(
      'Meera\'s own diary, 18 August 2019: from that day she and Gauraiya were sisters. "Not like sisters. Sisters. Because we chose." They were not related.',
      'Meera ki apni diary, 18 August 2019: us din se woh aur Gauraiya behnein theen. "Behnon jaisi nahi. Behnein. Kyunki humne chuna." Dono ka koi khooni rishta nahi tha.',
    ),
  ),
  clue(
    'redacted',
    'ch03',
    L('One sentence blacked out', 'Ek line par kaali syahi'),
    L(
      "In the institute's report on the disappearance, released under RTI, one sentence right after the account of the final night is blacked out on grounds of third-party privacy.",
      'Laapata hone par institute ki report ki RTI copy mein aakhri raat ke byore ke theek baad wali ek line "third-party privacy" ke naam par kaali kar di gayi hai.',
    ),
  ),
  clue(
    'red-door',
    'ch04',
    L('The red door is real', 'Laal darwaza sach mein hai'),
    L(
      'At the far east end of the corridor, two metres from Room 7, is a steel service door with a push bar and a small wired-glass window. It is cream on the inside and red on the outside. The official plan calls it "Store (sealed)".',
      'Corridor ke aakhri poorvi sire par, Room 7 se do metre door, ek steel ka service darwaza hai. Andar push bar, aur chhoti si jaali wali kaanch ki khidki. Andar se cream, bahar se laal. Sarkari naqshe mein likha hai "Store (sealed)".',
    ),
  ),
  clue(
    'slippers',
    'ch04',
    L('Numbered slippers', 'Number wali chappalein'),
    L(
      "The institute's blue rubber slippers had each room's number painted in white on the heel. Meera's said 7.",
      'Institute ki neeli rubber chappalon ki edi par har kamre ka number safed rang se likha hota tha. Meera ki chappal par 7.',
    ),
  ),
  clue(
    'phrase',
    'ch05',
    L('The same words', 'Wahi shabd'),
    L(
      'Two former participants, interviewed separately, say exactly the same thing about Gauraiya: "She flew off into her own sky." Ira used the same words.',
      'Do purane participants, alag-alag, Gauraiya ke baare mein hoobahoo ek hi baat kehte hain: "Gauraiya apne aasmaan mein ud gayi." Ira ne bhi yahi kaha tha.',
    ),
  ),
  clue(
    'little-book',
    'ch05',
    L("The nurse's little book", 'Sister ki chhoti diary'),
    L(
      'Sister Annamma, the night nurse, says she wrote every night down in her own notebook as well as the register. She says she no longer knows where it is.',
      'Night nurse Sister Annamma kehti hain ki register ke alawa woh har raat ki baat apni notebook mein bhi likhti thin. Kehti hain ab pata nahi woh kahan hai.',
    ),
  ),
  clue(
    'outage',
    'ch06',
    L('Forty-three minutes in the dark', 'Andhere ke taintaalees minute'),
    L(
      "The maintenance log: mains failed at 23:05. The generator's automatic start failed after three attempts. A manual start at 23:47 put power back on at 23:48. The official account says a brief fluctuation, 23:05 to 23:15.",
      'Maintenance log: 23:05 par bijli gayi. Generator teen koshishon ke baad bhi apne aap start nahi hua. 23:47 par haath se start kiya gaya, 23:48 par bijli wapas. Sarkari bayaan: 23:05 se 23:15 tak "thodi der ki fluctuation".',
    ),
  ),
  clue(
    'r7-dressing',
    'ch06',
    L('Room 7, 06:15', 'Room 7, subah 06:15'),
    L(
      'The morning after, the pharmacy register issued dressings and a tetanus injection for R7. The medical register has no entry for R7 that day.',
      'Agli subah pharmacy register mein R7 ke liye patti aur tetanus ka injection darj hai. Medical register mein us din R7 ki koi entry nahi.',
    ),
  ),
  clue(
    'connection',
    'ch07',
    L('The short way down', 'Neeche jaane ka chhota raasta'),
    L(
      'The red door opens onto an iron landing. A stair drops to the generator room, and an old cliff path runs east. The official plan shows none of it.',
      'Laal darwaza ek lohe ke landing par khulta hai. Wahan se seedhi generator room tak jaati hai, aur ek purana pahadi raasta poorab ki taraf. Sarkari naqshe mein inmein se kuch nahi.',
    ),
  ),
  clue(
    'slipper-found',
    'ch07',
    L('A slipper on the broken path', 'Toote raaste par ek chappal'),
    L(
      'The morning after, Dev found one blue slipper at the edge where the path had fallen away. He says it was Gauraiya\'s.',
      'Agli subah Dev ko jahan raasta dhans gaya tha wahan kinare par ek neeli chappal mili. Uske hisaab se woh Gauraiya ki thi.',
    ),
  ),
  clue(
    'photo-date',
    'ch08',
    L('Not the thirteenth', 'Terah tareekh nahi'),
    L(
      "Neelam's bandaged wrist, the banner, the lanterns and the clock at 11:32 place the photograph on the night of 14 September, during the power cut. The back says 13 September.",
      'Neelam ki bandhi kalai, banner, lanterns, aur 11:32 par ghadi: tasveer 14 September ki raat, bijli jaane ke dauraan ki hai. Peechhe likha hai 13 September.',
    ),
  ),
  clue(
    'tape-two',
    'ch10',
    L('Two recordings on one tape', 'Ek tape, do recordings'),
    L(
      "Part of the tape was recorded on the last night, minutes before the power failed. The date on its label is in the same handwriting as the photograph's caption.",
      'Tape ka ek hissa aakhri raat, bijli jaane se kuch minute pehle record hua tha. Label par likhi tareekh usi haath ki hai jisne tasveer ke peechhe likha.',
    ),
  ),
  clue(
    'letters',
    'ch11',
    L("Ananya's letters", 'Ananya ki chitthiyan'),
    L(
      'Kabir has three letters from Ananya, with her copy of pharmacy entries showing night tablets for R2, R6 and R7 (zolpidem 10 mg for R7). The last one says: "If anything goes wrong on the last night, ask M. what she remembers."',
      'Kabir ke paas Ananya ki teen chitthiyan hain. Saath mein pharmacy entries ki uski haath se ki hui copy: R2, R6 aur R7 ko raat ki goliyan (R7 ko zolpidem 10 mg). Aakhri chitthi mein: "Agar aakhri raat kuch galat ho jaaye, toh M. se poochhna use kya yaad hai."',
    ),
  ),
  clue(
    'gaze',
    'ch12',
    L('Looking at Meera', 'Meera ko dekhti hui'),
    L(
      'In the photograph, everyone faces the camera except Ananya. She is looking at Meera.',
      'Tasveer mein Ananya ke siwa sab camera ki taraf dekh rahe hain. Ananya Meera ko dekh rahi hai.',
    ),
  ),
]

const suspects: Suspect[] = [
  {
    id: 'kabir',
    name: 'Kabir Qureshi',
    role: L('Journalist, 35', 'Patrakar, 35'),
    summary: L(
      'Has spent years writing about Project Smriti. He arrived in Jaipur within hours of her email and knows more names than he should.',
      'Saalon se Project Smriti par likh raha hai. Meera ke email ke kuch ghanton mein Jaipur pahunch gaya, aur jitne naam use pata hone chahiye usse zyada jaanta hai.',
    ),
    claim: L('"I only want to know what happened to her."', '"Main bas jaanna chahta hoon ki uske saath kya hua."'),
  },
  {
    id: 'ira',
    name: 'Dr Ira Sen',
    role: L('Former director, Project Smriti', 'Project Smriti ki purani director'),
    summary: L(
      "A psychiatrist and memory researcher, and an old friend of Meera's late father. She took Meera in as her guest in 2019. Composed, precise, and unwilling to discuss the final night.",
      'Psychiatrist aur memory researcher, Meera ke marhoom pita ki purani dost. 2019 mein Meera ko apni mehmaan bana kar rakha tha. Shaant, nap-tula, aur aakhri raat ki baat se inkaar.',
    ),
    claim: L('"You slept through it, Meera. Everyone did."', '"Tum so rahi thi, Meera. Sab so rahe the."'),
  },
  {
    id: 'dev',
    name: 'Dev Malik',
    role: L('Caretaker, 42', 'Rakhwala, 42'),
    summary: L(
      "The institute's former technician. He now guards the empty building until it comes down, and knows every passage in it.",
      'Institute ka purana technician. Ab khaali imaarat ki rakhwali karta hai jab tak woh gir na jaaye. Har raasta jaanta hai.',
    ),
    claim: L('"The power went for a little while. I was at the generator."', '"Bijli thodi der ke liye gayi thi. Main generator par tha."'),
  },
  {
    id: 'annamma',
    name: 'Sister Annamma Varghese',
    role: L('Night nurse, 2019', 'Night nurse, 2019'),
    summary: L(
      'Was on duty on the last night and saw everyone to bed. Now retired in Kerala.',
      'Aakhri raat duty par thin, sabko kamron tak chhoda tha. Ab Kerala mein retired.',
    ),
    claim: L('"I don\'t remember, mol. It was a long time ago."', '"Mujhe yaad nahi, mol. Bahut purani baat hai."'),
  },
  {
    id: 'meera',
    name: 'Dr Meera Sanyal',
    role: L('Herself', 'Khud'),
    summary: L(
      'A clinical psychologist who knows how memory fails, and who cannot account for one night of her own.',
      'Ek clinical psychologist jo jaanti hai yaadein kaise dhokha deti hain, aur jo apni hi ek raat ka hisaab nahi de sakti.',
    ),
    claim: L('"I slept. That is what I was told, and that is what I remember."', '"Main so rahi thi. Mujhe yahi bataya gaya, aur mujhe yahi yaad hai."'),
  },
]

const story: StoryMeta = {
  id: 'smriti',
  title: L('Smriti', 'Smriti'),
  tagline: L('What was not remembered', 'Jo yaad nahi tha'),
  blurb: L(
    'In Jaipur, clinical psychologist Meera Sanyal receives an anonymous parcel: an old cassette recorder, a tape, a photograph of seven people, and a note. "You were there that night. You were the one who closed the door." On the tape, a voice she somehow knows says, "I\'m Ananya. Your sister." Meera has no sister. Seven years ago she spent eight weeks at a memory-research institute in the hills of Uttarakhand, where a young woman vanished on the programme\'s last night. In seven days the building will be demolished. All Meera has of that night are fragments: a red door, a clock, a dark corridor, a hand on glass, and three knocks.',
    'Jaipur mein clinical psychologist Meera Sanyal ko ek gumnaam parcel milta hai: ek purana cassette recorder, ek tape, saat logon ki ek tasveer, aur ek note. "Tum us raat wahan thi. Tumne hi darwaza band kiya tha." Tape par ek awaaz, jo use na jaane kyun jaani-pehchaani lagti hai, kehti hai: "Main Ananya hoon. Tumhari behen." Meera ki koi behen nahi. Saat saal pehle usne Uttarakhand ke pahadon mein ek memory-research institute mein aath hafte bitaaye the, jahan programme ki aakhri raat ek ladki gayab ho gayi thi. Saat din baad woh imaarat gira di jaayegi. Us raat ki Meera ke paas bas kuch tukde hain: ek laal darwaza, ek ghadi, ek andhera corridor, kaanch par ek haath, aur teen dastak.',
  ),
  genres: [L('Psychological thriller', 'Psychological thriller'), L('Mystery', 'Mystery'), L('Memory', 'Yaadein')],
  cover: scenes['cover'],
  coverPosition: '50% 30%',
  poster: scenes['cover'],
  readingMinutes: 245,
  parts,
  chapters,
  clues,
  suspects,
  characters,
  guess: {
    beforeChapterId: 'ch15',
    revealAfterChapterId: 'ch15',
    question: L('Why did Ananya go through the red door that night?', 'Us raat Ananya laal darwaze ke bahar kyun gayi?'),
    intro: L(
      'Meera now knows where Ananya died, and that she herself closed the red door. One question is left, and every clue you need has already appeared. Why did Ananya go out?',
      'Meera ab jaanti hai ki Ananya ki maut kahan hui, aur yeh bhi ki laal darwaza usne khud band kiya tha. Ek sawaal bacha hai, aur iska jawab dhoondhne ke liye har zaroori clue aapke saamne aa chuka hai. Ananya bahar kyun gayi?',
    ),
    options: [
      { id: 'leave', label: 'To leave the programme for good / Hamesha ke liye jaane' },
      { id: 'evidence', label: 'To get her evidence out / Saboot bahar le jaane' },
      { id: 'meet', label: 'To meet someone on the road / Kisi se milne' },
      { id: 'bring', label: 'To bring someone back / Kisi ko wapas laane' },
      { id: 'forced', label: 'Someone forced her out / Kisi ne zabardasti bheja' },
      { id: 'other', label: 'Something else / Kuch aur' },
    ],
    answer: 'YnJpbmc=',
    right: L(
      'You saw it before Meera did. It was there from the first chapter.',
      'Aapne Meera se pehle dekh liya. Sach pehle adhyay se saamne tha.',
    ),
    wrong: L(
      "Not this time. Go back to Chapter 1: Meera's habits, the slippers, and the letters she could never read.",
      'Is baar nahi. Pehla adhyay phir dekhiye: Meera ki aadatein, chappalein, aur woh akshar jo woh kabhi padh nahi paayi.',
    ),
  },
  scenes,
  loadChapter: async (lang: Lang, chapterId: string) => {
    const loader = content[`./content/${lang}/${chapterId}.md`] ?? content[`./content/en/${chapterId}.md`]
    if (!loader) throw new Error(`Missing chapter ${chapterId}`)
    return loader()
  },
}

export default story
