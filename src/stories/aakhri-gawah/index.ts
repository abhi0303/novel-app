import type { Chapter, Clue, Lang, Localized, Part, StoryMeta, Suspect } from '../types'
import characters from './characters'

const sceneUrls = import.meta.glob<string>('./scenes/*.{svg,webp,png,jpg}', { eager: true, query: '?url', import: 'default' })
const scenes = Object.fromEntries(
  Object.entries(sceneUrls).map(([path, url]) => [path.replace(/^.*\/(.+)\.\w+$/, '$1'), url]),
)

const content = import.meta.glob<string>('./content/*/*.md', { query: '?raw', import: 'default' })

const L = (en: string, hi: string): Localized => ({ en, hi })

const parts: Part[] = [
  { id: 'p1', label: L('Part One', 'Bhaag Ek'), title: L('The Perfect Family', 'Ek Perfect Parivaar') },
  { id: 'p2', label: L('Part Two', 'Bhaag Do'), title: L('The Wrong Answer', 'Galat Jawab') },
  { id: 'p3', label: L('Part Three', 'Bhaag Teen'), title: L('The Dead Girl', 'Jo Ladki Chali Gayi') },
  { id: 'p4', label: L('Part Four', 'Bhaag Chaar'), title: L('The Last Witness', 'Aakhri Gawah') },
]

const ch = (n: number, partId: string, en: string, hi: string, hero: string): Chapter => ({
  id: `ch${String(n).padStart(2, '0')}`,
  partId,
  label: L(`Chapter ${n}`, `Adhyay ${n}`),
  title: L(en, hi),
  hero,
})

const chapters: Chapter[] = [
  ch(1, 'p1', 'The Man Everyone Respected', 'Woh Aadmi Jiski Sab Izzat Karte The', 'ag-rajiv'),
  ch(2, 'p1', 'Ten Thousand Rupees', 'Das Hazaar Rupaye', 'ag-study'),
  ch(3, 'p1', 'A Debt Unpaid', 'Ek Udhaar Jo Chuka Nahi', 'ag-vivek'),
  ch(4, 'p1', 'The Quiet Boy', 'Chup Rehne Wala Ladka', 'ag-rahul'),
  ch(5, 'p2', "The Servant's Past", 'Naukar Ka Ateet', 'ag-chain'),
  ch(6, 'p2', "A Wife's Silence", 'Ek Patni Ki Khamoshi', 'ag-nandita'),
  ch(7, 'p2', 'The Missing Hour', 'Gayab Ghanta', 'ag-dev'),
  ch(8, 'p2', 'The Wrong Answer', 'Galat Jawab', 'ag-house'),
  ch(9, 'p3', 'The Chain', 'Chain', 'ag-locket'),
  ch(10, 'p3', 'The Third Anniversary', 'Teesri Barsi', 'ag-pari'),
  ch(11, 'p3', "The Friend's Answer", 'Dost Ka Jawab', 'ag-walk'),
  ch(12, 'p3', 'The Chain on the Floor', 'Farsh Par Chain', 'ag-rahul-young'),
  ch(13, 'p4', 'Behind the Locked Door', 'Band Darwaze Ke Peechhe', 'ag-window'),
  ch(14, 'p4', "The Detective's Choice", 'Detective Ka Faisla', 'ag-ensemble'),
  ch(15, 'p4', 'What Pari Asked For', 'Pari Ne Kya Maanga Tha', 'ag-sharda'),
  ch(16, 'p4', 'The Last Witness', 'Aakhri Gawah', 'ag-notebook'),
]

const clue = (id: string, chapterId: string, title: Localized, text: Localized): Clue => ({ id, chapterId, title, text })

const clues: Clue[] = [
  clue(
    'photo',
    'ch01',
    L('A photograph face down', 'Ulti padi tasveer'),
    L(
      "In Rajiv's study, the silver frame holding his late daughter Pari's photograph had been laid face down.",
      'Rajiv ki study mein, unki marhoom beti Pari ki tasveer wala chaandi ka frame ulta pada tha.',
    ),
  ),
  clue(
    'envelope',
    'ch02',
    L('Only the envelope', 'Sirf ek lifafa'),
    L(
      'The only thing taken was a white envelope marked "Mohan — Dec": the servant\'s ₹10,000 salary, kept in the top-right drawer. The Rolex, the wallet and the cufflinks were all left behind. Nandita, Mohan and Rahul knew the envelope was there, and probably Vivek too.',
      'Sirf ek safed lifafa gayab tha, jis par likha tha "Mohan — Dec". Naukar ki ₹10,000 ki tankhwah, desk ki upar-daayi daraaz mein. Rolex, wallet, cufflinks sab wahin rahe. Lifafe ke baare mein Nandita, Mohan aur Rahul jaante the, shayad Vivek bhi.',
    ),
  ),
  clue(
    'old-theft',
    'ch02',
    L("Mohan's confession", 'Mohan ka kabool-naama'),
    L(
      "Rajiv's drawer held a confession Mohan had signed two years ago, admitting he stole ₹5,000. Rajiv kept him on but cut his pay.",
      'Rajiv ki daraaz mein Mohan ka do saal purana dastkhat kiya kabool-naama mila: ₹5,000 ki chori. Rajiv ne use rakha, lekin tankhwah kaat di.',
    ),
  ),
  clue(
    'call',
    'ch02',
    L('A call she left out', 'Ek call jo usne nahi bataya'),
    L(
      'Nandita said she last spoke to Rajiv at six. Her own phone shows a four-minute call with him at 7:12 PM.',
      'Nandita ne kaha usne Rajiv se aakhri baar chhe baje baat ki. Uske apne phone mein 7:12 PM ki chaar minute ki call dikhti hai.',
    ),
  ),
  clue(
    'back-gate',
    'ch02',
    L('The back gate', 'Peechhe ka gate'),
    L(
      'The back gate was padlocked. Mohan, Rajiv and Nandita had keys, one hung in the kitchen, and Rahul had one for his bicycle. The garden tap beside the gate was dripping.',
      'Peechhe ka gate taale mein tha. Chaabiyan: Mohan, Rajiv, Nandita, rasoi ki khoonti, aur Rahul ki cycle wali. Gate ke paas garden ka nal tapak raha tha.',
    ),
  ),
  clue(
    'trophy',
    'ch03',
    L('The trophy, wiped clean', 'Saaf poncha hua trophy'),
    L(
      'Two blows to the head, death between 7:30 and 8:30 PM. The brass trophy on the desk had been wiped, but there was blood in the grooves of its base. Diluted blood was found under the garden tap.',
      'Sir par do vaar, maut 7:30 se 8:30 PM ke beech. Desk ka brass trophy poncha gaya tha, lekin base ki daraaron mein khoon tha. Garden ke nal ke neeche dhula hua khoon mila.',
    ),
  ),
  clue(
    'vivek-car',
    'ch03',
    L('Seven minutes in the lane', 'Gali mein saat minute'),
    L(
      'Vivek said he was at his café until 8:30. The lane camera shows his car arriving at 7:51 PM and leaving at 7:58.',
      'Vivek ne kaha woh 8:30 tak café mein tha. Gali ke camera mein uski gaadi 7:51 PM par aati hai aur 7:58 par jaati hai.',
    ),
  ),
  clue(
    'alibi',
    'ch04',
    L("Rahul's evening", 'Rahul ki shaam'),
    L(
      'Rahul says he was studying at his friend Aditya\'s flat in Indira Nagar from 6:30 until about 9:10. He keeps his sleeves pulled over his hands and never once says "Papa".',
      'Rahul kehta hai woh 6:30 se lagbhag 9:10 tak apne dost Aditya ke ghar, Indira Nagar mein padh raha tha. Aasteenein haathon tak kheenche rehta hai, aur ek baar bhi "Papa" nahi kehta.',
    ),
  ),
  clue(
    'knock',
    'ch04',
    L('Three knocks', 'Teen dastak'),
    L(
      'Alone in a room at his grandmother\'s house, Rahul knocked three times on the wall and rested his forehead against it.',
      'Nani ke ghar ke ek kamre mein akele, Rahul ne deewar par teen baar dastak di aur apna maatha usse tika diya.',
    ),
  ),
  clue(
    'chain-found',
    'ch05',
    L('A chain in a trunk', 'Trunk mein chain'),
    L(
      "Rajiv's gold chain was in Mohan's trunk. It had been at the jeweller since 27 November because its clasp was wrenched, not worn. Mohan collected it at 7:42 PM in Aminabad and was drinking at a dhaba there at 8:21. Why he hid it, he won't say.",
      'Rajiv ki sone ki chain Mohan ke trunk mein mili. 27 November se jeweller ke paas thi, clasp ghisa nahi, zor se toda gaya tha. Mohan ne 7:42 PM par Aminabad se li, aur 8:21 par wahin ek dhabe par pee raha tha. Usne chain chhupayi kyun, yeh woh nahi batata.',
    ),
  ),
  clue(
    'doorbell',
    'ch06',
    L('The doorbell camera', 'Doorbell ka camera'),
    L(
      'The doorbell camera shows Rahul leaving at 6:14 PM in a grey hoodie with a backpack, Vivek ringing from 7:53 to 7:56 without ever being let in, and Nandita arriving at 8:39. Nobody else came to the front door.',
      'Doorbell camera: Rahul 6:14 PM par grey hoodie aur backpack mein nikla; Vivek ne 7:53–7:56 ghanti bajayi aur andar nahi gaya; Nandita 8:39 par aayi. Aage ke darwaze par aur koi nahi.',
    ),
  ),
  clue(
    'bank-log',
    'ch06',
    L('Sixty-seven minutes', 'Sadsath minute'),
    L(
      'Nandita said she left the bank at 8:15. The access log shows she swiped out at 7:31 PM.',
      'Nandita ne kaha woh bank se 8:15 par nikli. Access log ke hisaab se 7:31 PM par.',
    ),
  ),
  clue(
    'school',
    'ch06',
    L('A report withdrawn', 'Ek wapas li gayi report'),
    L(
      'Three years ago a teacher reported bruises on Pari. Rajiv, a school trustee, had the report withdrawn, and Nandita told the school Pari was "clumsy".',
      'Teen saal pehle ek teacher ne Pari ke nishaanon ki report ki thi. School trustee Rajiv ne report wapas karwayi, aur Nandita ne kaha Pari "girti-padti" thi.',
    ),
  ),
  clue(
    'unverified',
    'ch07',
    L('An alibi nobody checked', 'Ek alibi jo kisi ne check nahi ki'),
    L(
      "No one has confirmed Rahul's alibi. Aditya's family is away at a wedding until Wednesday, and Dev declined to request the boy's phone records.",
      'Rahul ki alibi kisi ne confirm nahi ki. Aditya ka parivaar budhvaar tak shaadi mein bahar hai, aur Dev ne ladke ke phone records mangwane se mana kar diya.',
    ),
  ),
  clue(
    'too-neat',
    'ch08',
    L('Too neat', 'Kuch zyada hi saaf'),
    L(
      'The case against Nandita accounts for everything except a dead girl\'s photograph turned face down, and a trophy wiped clean by someone whose fingerprints would have been explainable anyway.',
      'Nandita ke khilaaf case sab samjha deta hai, sivaay ek mari hui bachchi ki ulti tasveer ke, aur ek aise trophy ke jise kisi ne saaf kiya jiske nishaan wahan hona waise bhi samajh aata.',
    ),
  ),
  clue(
    'chain-meaning',
    'ch09',
    L('What the chain meant', 'Chain ka matlab'),
    L(
      'Before every punishment Rajiv took off his chain and set it on the glass desk. On 26 November it snapped during one of those nights, and the next morning Rahul\'s wrist was swollen.',
      'Har saza se pehle Rajiv chain utaar kar kaanch ki desk par rakhte the. 26 November ki raat woh toot gayi, aur agli subah Rahul ki kalai suji hui thi.',
    ),
  ),
  clue(
    'anniversary',
    'ch10',
    L('Three years', 'Teen saal'),
    L(
      'Pari took her own life three years ago on 12 December, a week after the date of the murder. Three knocks on the wall was her code with Rahul for "I\'m okay". The foundation event on the day of the murder had used her name again.',
      'Pari ne teen saal pehle 12 December ko apni jaan le li thi, murder se theek ek hafte baad ki tareekh. Deewar par teen dastak Rahul ke saath uska code tha: "main theek hoon". Murder ke din ka foundation event phir uske naam par tha.',
    ),
  ),
  clue(
    'aditya',
    'ch11',
    L("The friend's answer", 'Dost ka jawab'),
    L(
      'Rahul never went to Aditya\'s flat, and the next morning he asked Aditya to lie for him. From 7:38 to 8:04 his phone was on the tower that covers his home. He left in a grey hoodie and came back at 9:25 in a navy sweater.',
      'Rahul kabhi Aditya ke ghar nahi gaya, aur agli subah usne Aditya se jhooth bolne ko kaha. 7:38 se 8:04 tak uska phone ghar wale tower par tha. Grey hoodie mein nikla, 9:25 par navy sweater mein lauta.',
    ),
  ),
]

const suspects: Suspect[] = [
  {
    id: 'nandita',
    name: 'Nandita Sethi',
    role: L('Second wife', 'Doosri patni'),
    summary: L(
      'A senior bank manager, married to Rajiv for eight years. She found the body, and she is careful about what she says.',
      'Bank mein senior manager, Rajiv se aath saal se shaadi. Body usi ne dekhi, aur woh har shabd soch kar bolti hai.',
    ),
    claim: L('"I left the bank at a quarter past eight and came straight home."', '"Main sava aath baje bank se nikli aur seedhi ghar aayi."'),
  },
  {
    id: 'vivek',
    name: 'Vivek Saxena',
    role: L("Nandita's brother", 'Nandita ka bhai'),
    summary: L(
      'He runs a struggling café and owed Rajiv ₹18 lakh. Hours before the murder, they quarrelled in public.',
      'Ek chalta-ladkhadata café chalata hai, Rajiv ka ₹18 lakh ka karzdaar. Murder se kuch ghante pehle dono ka sabke saamne jhagda hua.',
    ),
    claim: L('"I was at the café until half past eight."', '"Main saadhe aath baje tak café mein tha."'),
  },
  {
    id: 'mohan',
    name: 'Mohan Lal',
    role: L('Household help', 'Ghar ka naukar'),
    summary: L(
      'Nine years with the family. He was caught stealing once. The missing money was his salary, and he was out of the house all evening.',
      'Nau saal se parivaar ke saath. Ek baar chori mein pakda gaya tha. Gayab paisa uski tankhwah thi, aur woh poori shaam ghar se bahar tha.',
    ),
    claim: L('"I went to the market for vegetables."', '"Main sabzi lene bazaar gaya tha."'),
  },
  {
    id: 'rahul',
    name: 'Rahul Sethi',
    role: L('Son, 17', 'Beta, 17'),
    summary: L(
      'Quiet and withdrawn. His younger sister Pari died three years ago, and he now stays with his grandmother.',
      'Chup, apne aap mein simta hua. Uski chhoti behen Pari teen saal pehle chali gayi thi. Ab woh Nani ke paas rehta hai.',
    ),
    claim: L('"I was at Aditya\'s place, studying."', '"Main Aditya ke ghar padh raha tha."'),
  },
  {
    id: 'sharda',
    name: 'Sharda Devi',
    role: L("Grandmother (Nani)", 'Nani'),
    summary: L(
      'A retired schoolteacher and the mother of Rajiv\'s first wife. She loves the children fiercely and says very little about the past.',
      'Retired teacher, Rajiv ki pehli patni ki maa. Bachchon se bepanah pyaar karti hain, aur ateet ke baare mein bahut kam bolti hain.',
    ),
    claim: L('"I was at home in Aliganj that evening."', '"Us shaam main Aliganj mein apne ghar thi."'),
  },
]

const story: StoryMeta = {
  id: 'aakhri-gawah',
  title: L('Aakhri Gawah', 'Aakhri Gawah'),
  tagline: L('The Last Witness: a murder, a family\'s silence, and the price of mercy', 'Ek qatl, ek parivaar ki khamoshi, aur raham ki keemat'),
  blurb: L(
    "Rajiv Sethi was the father every parent in Lucknow wanted to be. He set up a foundation in his late daughter's name and gave speeches about listening to children. One December evening his wife came home and found him dead in his study. ₹10,000 was missing, a drawer stood open, and his daughter's photograph had been laid face down. Inspector Dev Rathore has a wife who is lying, a brother-in-law in debt, a servant with a past, and a quiet seventeen-year-old who says he was at a friend's house. Some truths should stay buried. But silence also has a price.",
    'Rajiv Sethi woh pita the jaisa Lucknow ka har maa-baap banna chahta tha. Apni marhoom beti ke naam par foundation, aur bachchon ki baat sunne par bhashan. Ek December ki shaam unki patni ghar lauti aur unhe study mein mara hua paaya. ₹10,000 gayab, ek daraaz khuli, aur beti ki tasveer ulti padi hui. Inspector Dev Rathore ke saamne hai ek patni jo jhooth bol rahi hai, ek saala jo karz mein dooba hai, ek naukar jiska ateet saaf nahi, aur ek chup rehne wala satrah saal ka ladka jo kehta hai ki woh dost ke ghar tha. Kuch sach dabe rehne chahiye. Lekin khamoshi ki bhi ek keemat hoti hai.',
  ),
  genres: [L('Psychological thriller', 'Psychological thriller'), L('Detective mystery', 'Detective mystery'), L('Family drama', 'Family drama')],
  cover: scenes['cover'],
  coverPosition: '50% 47%',
  poster: scenes['cover'],
  readingMinutes: 225,
  parts,
  chapters,
  clues,
  suspects,
  characters,
  guess: {
    beforeChapterId: 'ch11',
    revealAfterChapterId: 'ch12',
    question: L('Who killed Rajiv Sethi?', 'Rajiv Sethi ko kisne maara?'),
    intro: L(
      "Dev is finally on his way to check the one statement nobody has verified. Before he gets there: you have seen every clue he has. Who do you think killed Rajiv Sethi?",
      'Dev aakhirkaar us ek bayan ko check karne ja raha hai jise kisi ne verify nahi kiya. Uske pahunchne se pehle: jo clues Dev ke paas hain, woh sab aapke paas bhi hain. Aapke hisaab se Rajiv Sethi ko kisne maara?',
    ),
    options: [
      { id: 'nandita', label: 'Nandita Sethi' },
      { id: 'vivek', label: 'Vivek Saxena' },
      { id: 'mohan', label: 'Mohan Lal' },
      { id: 'rahul', label: 'Rahul Sethi' },
      { id: 'sharda', label: 'Sharda Devi' },
      { id: 'other', label: 'Someone else / Koi aur' },
    ],
    answer: 'cmFodWw=',
  },
  scenes,
  loadChapter: async (lang: Lang, chapterId: string) => {
    const loader = content[`./content/${lang}/${chapterId}.md`] ?? content[`./content/en/${chapterId}.md`]
    if (!loader) throw new Error(`Missing chapter ${chapterId}`)
    return loader()
  },
}

export default story
