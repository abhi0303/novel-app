import type { Localized } from '../../stories/types'
import type { GameMeta, GameNode, Hotspot, Item, Option, Person, Question, Report } from '../types'
import { splitSections } from '../engine'

const imageUrls = import.meta.glob<string>('./images/*.{webp,png,jpg}', { eager: true, query: '?url', import: 'default' })
const images = Object.fromEntries(Object.entries(imageUrls).map(([p, url]) => [p.replace(/^.*\/(.+)\.\w+$/, '$1'), url]))

const texts = import.meta.glob<string>('./content/*/*.md', { query: '?raw', import: 'default' })

const L = (en: string, hi: string): Localized => ({ en, hi })

// ---------------------------------------------------------------- casebook items

const item = (
  id: string,
  kind: Item['kind'],
  title: Localized,
  text: Localized,
  extra: Partial<Pick<Item, 'pic' | 'time'>> = {},
): Item => ({ id, kind, title, text, ...extra })

const items: Item[] = [
  // Observations: things you saw or heard yourself.
  item('o-kozhikode', 'observation', L('Farida knows the tree', 'Farida ped ko jaanti hain'), L(
    'At the jetty Farida named the othalanga tree at once: "We had one behind my grandmother\'s house in Kozhikode. We were told never to touch the fruit."',
    'Jetty par Farida ne othalanga ka ped turant pehchaana: "Kozhikode mein meri naani ke ghar ke peechhe ek tha. Hamein kaha gaya tha phal kabhi mat chhoona."',
  ), { time: [1, '16:40'] }),
  item('o-three-fruits', 'observation', L('Three green fruits', 'Teen hare phal'), L(
    'On Saturday afternoon three green fruits hung on the othalanga\'s low branch, by the boathouse.',
    'Shanivaar dopahar boathouse ke paas othalanga ki neechi daal par teen hare phal latke the.',
  ), { time: [1, '16:45'] }),
  item('o-argument', 'observation', L('Words on the lighthouse stairs', 'Lighthouse ki seedhiyon par baatein'), L(
    'Going down the lighthouse stairs, you heard Farida above you: "Not now, Madhav. Not like this. You will destroy me." And your uncle: "Twenty years, Farida."',
    'Lighthouse ki seedhiyan utarte hue aapne upar Farida ko suna: "Abhi nahi, Madhav. Aise nahi. Tum mujhe barbaad kar doge." Aur aapke Kaka: "Bees saal, Farida."',
  ), { time: [1, '17:10'] }),
  item('o-thumb', 'observation', L('A plaster on Farida\'s thumb', 'Farida ke angoothe par plaster'), L(
    'At dinner Farida had a fresh plaster on her left thumb. "Paper cut," she said, before anyone asked.',
    'Dinner par Farida ke baayein angoothe par taaza plaster tha. "Kagaz se kat gaya," unhone kisi ke poochhne se pehle hi kaha.',
  ), { time: [1, '20:05'] }),
  item('o-nandini-porch', 'observation', L('Nandini on the porch', 'Porch par Nandini'), L(
    'Nandini sat with you on the front porch from about 9:30 to 10:15. She never left your sight.',
    'Nandini lagbhag 9:30 se 10:15 tak aapke saath saamne ke porch par baithi rahin. Ek pal bhi nazar se ojhal nahi huin.',
  ), { time: [1, '21:30'] }),
  item('o-commander-radio', 'observation', L('The Commander at the radio', 'Radio par Commander'), L(
    'The Commander was at the radio with you from about 9:35 to 10:10, talking to the Coast Guard most of that time.',
    'Commander lagbhag 9:35 se 10:10 tak aapke saath radio par the, zyaadatar waqt Coast Guard se baat karte hue.',
  ), { time: [1, '21:35'] }),
  item('o-footsteps', 'observation', L('Footsteps on the verandah', 'Verandah par kadmon ki aawaaz'), L(
    'At about 9:55, from your room, you heard quick light footsteps on the wet verandah boards going towards the study, a door, and a few minutes later the same steps coming back.',
    'Lagbhag 9:55 par apne kamre se aapne geele verandah ke takhton par study ki taraf jaate tez, halke kadam sune, ek darwaza, aur kuch minute baad wahi kadam wapas aate.',
  ), { time: [1, '21:55'] }),
  item('o-death', 'observation', L('Not a simple heart attack', 'Seedha heart attack nahi'), L(
    'Dead since about 2 or 3 am. He vomited several times in the night and his heart slowed. In a man on digoxin that looks like an overdose of his own pills, but his pill count is right.',
    'Raat lagbhag 2 ya 3 baje se mrit. Raat mein kai baar ulti hui aur dil dheema pada. Digoxin lene wale aadmi mein yeh apni hi goliyon ka overdose lagta hai, lekin goliyon ki ginti sahi hai.',
  ), { time: [2, '02:30'] }),
  item('o-sandals-gone', 'observation', L('Farida\'s sandals are gone', 'Farida ki sandals gayab'), L(
    'Farida\'s sandals are not in her room. She says she threw them out on Sunday morning, "ruined by the salt water".',
    'Farida ki sandals kamre mein nahi hain. Kehti hain Ravivaar subah phenk di, "khaare paani se kharab ho gayi thin".',
  )),

  item('o-ribbon-gone', 'observation', L('The ribbon is gone', 'Ribbon gayab hai'), L(
    'By Sunday afternoon someone had taken the ribbon out of the Olivetti. Every word your uncle typed went with it.',
    'Ravivaar dopahar tak kisi ne Olivetti se ribbon nikaal liya tha. Kaka ka type kiya har shabd uske saath chala gaya.',
  )),
  item('o-cut', 'observation', L('Not a paper cut', 'Kagaz ka kata nahi'), L(
    'Under the plaster: a straight, clean cut across the pad of Farida\'s thumb, about a day old. A small sharp blade did that, not paper.',
    'Plaster ke neeche: Farida ke angoothe par seedha, saaf kata hua nishaan, lagbhag ek din purana. Yeh kisi chhote tez blade ka kaam hai, kagaz ka nahi.',
  )),
  item('o-torch', 'observation', L('A torch in the night', 'Raat mein torch'), L(
    'At about 1:35 on Monday morning a torch moved past the study windows, along the verandah towards the staff rooms, and came back ten minutes later.',
    'Somvaar raat lagbhag 1:35 par ek torch study ki khidkiyon ke saamne se verandah par staff ke kamron ki taraf gayi, aur das minute baad wapas aayi.',
  ), { time: [3, '01:35'] }),

  item('o-two-fruits', 'observation', L('One fruit is missing', 'Ek phal kam hai'), L(
    'Yesterday afternoon there were three green fruits on the low branch. Now there are two. Someone picked one in between.',
    'Kal dopahar neechi daal par teen hare phal the. Ab do hain. Beech mein kisi ne ek toda.',
  )),

  // Physical evidence.
  item('e-glass', 'evidence', L('The solkadhi glass', 'Solkadhi ka gilaas'), L(
    'Madhav\'s own glass of solkadhi, a third full. A thick pink sediment with pale grit at the bottom, and a bitter smell under the garlic.',
    'Madhav ka apna solkadhi ka gilaas, ek-tihaai bhara. Neeche gaadha gulaabi jamaav aur usmein peeli kirkiri, aur lehsun ke neeche ek kadvi gandh.',
  ), { pic: { image: 'i-study', x: 60, y: 64 } }),
  item('e-spoon', 'evidence', L('The silver spoon', 'Chaandi ka chammach'), L(
    'The spoon from his desk tray. Pale grit has dried in its bowl, the same as the sediment in the glass.',
    'Unki desk ki tray ka chammach. Uske gaddhe mein wahi peeli kirkiri sookhi hai jo gilaas mein hai.',
  )),
  item('e-pills', 'evidence', L('The pill organiser', 'Goliyon ka dabba'), L(
    'The 10:30 PM slot is empty: he took his night pills. His digoxin strip has exactly as many tablets left as it should. No extra dose.',
    'Raat 10:30 ka khaana khaali hai: unhone raat ki goliyan li thin. Digoxin ki strip mein theek utni hi goliyan bachi hain jitni honi chahiye. Koi extra dose nahi.',
  ), { time: [1, '22:30'] }),
  item('e-medical', 'evidence', L('An oncology report', 'Cancer ki report'), L(
    'Tata Memorial Hospital, May 2026: pancreatic cancer, stage four. Months, not years. Nobody on the island mentioned it.',
    'Tata Memorial Hospital, May 2026: pancreas ka cancer, chautha stage. Mahine, saal nahi. Dweep par kisi ne iska zikr nahi kiya.',
  )),
  item('e-cover', 'evidence', L('The cover page', 'Pehla panna'), L(
    '"A Statement by Madhav Kamat. For release on 14 June 2026." Only the cover page is left on the desk. The pages under it are gone.',
    '"Madhav Kamat ka bayaan. 14 June 2026 ko jaari karne ke liye." Desk par sirf pehla panna bacha hai. Uske neeche ke panne gayab hain.',
  )),
  item('e-ribbon', 'evidence', L('The typewriter ribbon', 'Typewriter ka ribbon'), L(
    'The fabric ribbon from his old Olivetti. Every letter he typed on it is pressed into the cloth, back to front.',
    'Unke purane Olivetti ka kapde ka ribbon. Usne jo bhi type kiya, har akshar kapde mein ulta dabaa hua hai.',
  )),
  item('e-safe', 'evidence', L('The open safe', 'Khula safe'), L(
    'The study safe stands open a few inches. Bundles of cash are missing. His wife\'s jewellery, inside the same safe, has not been touched.',
    'Study ka safe kuch inch khula hai. Note ki gaddiyan gayab hain. Usi safe mein rakhe unki patni ke gehne kisi ne nahi chhue.',
  )),
  item('e-verandah', 'evidence', L('The verandah door', 'Verandah ka darwaza'), L(
    'The study\'s door onto the side verandah is unlatched. Just inside it, a half-dried print of a woman\'s flat sandal, with sand in it.',
    'Study ka side verandah wala darwaza khula hai. Uske theek andar ek aurat ki chapti sandal ka aadha-sookha nishaan, usmein ret.',
  )),
  item('e-mortar', 'evidence', L('The stone mortar', 'Patthar ka khal-batta'), L(
    'The kitchen\'s big stone mortar. In its grooves, a pale, oily, bitter paste that is not masala.',
    'Rasoi ka bada patthar ka khal-batta. Uske khaanchon mein ek peela, tailiya, kadva lep, jo masala nahi hai.',
  ), { pic: { image: 'i-kitchen', x: 28, y: 63 } }),
  item('e-knife', 'evidence', L('A missing knife', 'Gayab chaaku'), L(
    'The small vegetable knife is missing from its hook under the wall cupboard.',
    'Deewar ki almari ke neeche ke hook se sabzi kaatne ka chhota chaaku gayab hai.',
  )),
  item('e-knife-found', 'evidence', L('The knife in the lantern box', 'Lantern box mein chaaku'), L(
    'The kitchen\'s missing vegetable knife, hidden in the lantern box on the jetty. Dried white sap on the blade, and near the handle, a thin brown smear of blood.',
    'Rasoi ka gayab sabzi wala chaaku, jetty ke lantern box mein chhupa. Blade par sookha safed ras, aur handle ke paas khoon ka ek patla bhoora dhabba.',
  ), { pic: { image: 'i-jetty', x: 59, y: 37 } }),
  item('e-ash', 'evidence', L('Burnt pages', 'Jale hue panne'), L(
    'In the firebox of the wood-fired water heater: charred scraps of typed paper. On one: "...Anant Kamat was not drunk...". On another: "...certificate dated...".',
    'Lakdi wale paani ke heater ke chulhe mein typed kagaz ke jale tukde. Ek par: "...Anant Kamat was not drunk...". Doosre par: "...certificate dated...".',
  )),
  item('e-tree', 'evidence', L('The othalanga tree', 'Othalanga ka ped'), L(
    'Cerbera odollam, the "suicide tree". Its seed stops the heart, and the poison looks like a heart attack. On the low branch, a stalk has been freshly snapped and its milky sap has dried.',
    'Cerbera odollam, "suicide tree". Iska beej dil rok deta hai, aur zehar heart attack jaisa dikhta hai. Neechi daal par ek dandi haal hi mein todi gayi hai aur uska doodhiya ras sookh gaya hai.',
  ), { pic: { image: 'i-jetty', x: 17, y: 46 } }),
  item('e-logbook', 'evidence', L('Madhav\'s lighthouse notebook', 'Madhav ki lighthouse wali diary'), L(
    'The last entry, 13 June, 21:50: "Told F. this afternoon. She begged. I won\'t. Anant deserves his name back."',
    'Aakhri entry, 13 June, 21:50: "Aaj dopahar F. ko bataya. Woh gidgidaayi. Main nahi rukunga. Anant ko uska naam wapas milna chahiye."',
  ), { time: [1, '21:50'] }),
  item('e-cash', 'evidence', L('Cash in Sid\'s bag', 'Sid ke bag mein paise'), L(
    'Eight lakh rupees in bank-strapped bundles, at the bottom of Sid\'s duffel bag. The bands are from his father\'s bank.',
    'Sid ke duffel bag ki tah mein aath lakh rupaye, bank ki patti wali gaddiyon mein. Pattiyan unke pita ke bank ki hain.',
  )),
  item('e-threats', 'evidence', L('Messages on Sid\'s phone', 'Sid ke phone par message'), L(
    'From a number saved as "Bhau": "Monday. All of it. Or your knees." Sent on Friday.',
    '"Bhau" naam se save number se: "Somvaar. Poora. Warna tere ghutne." Shukravaar ko bheja.',
  )),
  item('e-will-mail', 'evidence', L('An email to Sid', 'Sid ko ek email'), L(
    'From Farida Shaikh to Sid, Thursday 11 June: "Your father has asked me to bring a new will to the island. Half the estate is to go to the families of the Neelkanth crew. I thought you should know before Sunday."',
    'Farida Shaikh se Sid ko, Guruvaar 11 June: "Aapke pita ne mujhe dweep par naya will laane ko kaha hai. Aadhi jaaydaad Neelkanth ke crew ke parivaaron ko jaayegi. Socha aapko Ravivaar se pehle pata hona chahiye."',
  )),
  item('e-divorce', 'evidence', L('Divorce papers', 'Talaaq ke kagaz'), L(
    'A draft petition, Nandini Kamat versus Madhav Kamat, dated 2 June 2026. Unsigned.',
    'Ek draft arzi, Nandini Kamat banaam Madhav Kamat, 2 June 2026 ki tareekh. Bina sign.',
  )),
  item('e-green', 'evidence', L('Nandini\'s saree', 'Nandini ki saadi'), L(
    'The green silk saree she wore on Saturday night, hung up to air. There is nothing white in her wardrobe at all.',
    'Shanivaar raat pehni hari silk ki saadi, hawa lagne ke liye tangi. Unki almari mein ek bhi safed kapda nahi.',
  )),
  item('e-crew-photo', 'evidence', L('A photograph of the crew', 'Crew ki tasveer'), L(
    'The trawler Neelkanth, 2006. Four men on its deck. One is your father. On the back: "Papa — Joseph Fernandes".',
    'Trawler Neelkanth, 2006. Deck par chaar aadmi. Ek aapke pita hain. Peechhe likha hai: "Papa — Joseph Fernandes".',
  )),
  item('e-tara-notes', 'evidence', L('Tara\'s notebook', 'Tara ki notebook'), L(
    'Her shorthand for Saturday: "21:30 Sir\'s solkadhi, no sugar, extra chilli, tasted ✓. 21:45 on his desk, covered with saucer."',
    'Shanivaar ka unka shorthand: "21:30 Sir ki solkadhi, cheeni nahi, mirch zyada, chakhi ✓. 21:45 unki desk par, plate se dhaki."',
  ), { time: [1, '21:45'] }),
  item('e-navy-book', 'evidence', L('A naval manual', 'Navy ki kitaab'), L(
    '"Poisonous Plants of the Malabar Coast", 1979, Indian Navy. A fresh bookmark at the page on Cerbera odollam.',
    '"Poisonous Plants of the Malabar Coast", 1979, Indian Navy. Cerbera odollam wale panne par taaza bookmark.',
  )),
  item('e-share', 'evidence', L('A share transfer from 2006', '2006 ka share transfer'), L(
    'Five per cent of Kamat Marine transferred to Cdr Vinod Rane, dated 3 July 2006. Three weeks after the Neelkanth sank.',
    'Kamat Marine ka paanch pratishat Cdr Vinod Rane ke naam, 3 July 2006 ki tareekh. Neelkanth doobne ke teen hafte baad.',
  )),
  item('e-radio-notes', 'evidence', L('The Commander\'s radio notes', 'Commander ke radio notes'), L(
    'In his neat Navy hand: "13 Jun. MRCC Malvan. 2142 wx report. 2150 to 2202 long call, small craft warning. 2205 acknowledged." The Coast Guard log will say the same.',
    'Unki saaf Navy likhaavat mein: "13 Jun. MRCC Malvan. 2142 mausam report. 2150 se 2202 lambi call, chhoti naav ki chetavni. 2205 pushti." Coast Guard ka log bhi yahi kahega.',
  ), { time: [1, '21:42'] }),
  item('e-sandals', 'evidence', L('Farida\'s sandals', 'Farida ki sandals'), L(
    'White leather flat sandals. Sand in the stitching, and on one strap a dried, sticky white smear, like sap.',
    'Safed chamde ki chapti sandals. Silai mein ret, aur ek patti par sookha, chipchipa safed dhabba, ras jaisa.',
  ), { pic: { image: 'i-room-farida', x: 42, y: 88 } }),
  item('e-elevation', 'evidence', L('A confidential letter', 'Ek gopniya chitthi'), L(
    'The High Court collegium\'s recommendation, May 2026: Senior Advocate Farida Shaikh, for appointment as a judge.',
    'High Court collegium ki sifaarish, May 2026: Senior Advocate Farida Shaikh, judge banaane ke liye.',
  )),
  item('e-first-aid', 'evidence', L('Farida\'s first-aid pouch', 'Farida ka first-aid pouch'), L(
    'In her suitcase: a box of plasters, opened, one missing, and a tube of antiseptic with the cap still wet.',
    'Unke suitcase mein: plaster ka dabba, khula, ek kam, aur antiseptic ki tube jiska dhakkan ab bhi geela hai.',
  )),
  item('e-husk', 'evidence', L('An othalanga fruit, cut open', 'Kata hua othalanga phal'), L(
    'A green Cerbera fruit split with a knife, the kernel scooped out. The sap on the cut is still wet: it was cut hours ago, not days.',
    'Chaaku se cheera hua hara Cerbera phal, beej nikaala hua. Kate hisse par ras ab bhi geela hai: ise ghanton pehle kaata gaya, dinon pehle nahi.',
  ), { time: [3, '01:40'] }),

  // Testimony: what others told you.
  item('t-tara-tasted', 'testimony', L('Tara tasted it at 9:30', 'Tara ne 9:30 par chakhi thi'), L(
    '"I made his solkadhi at half past nine and tasted it, like always. It was fine. I left it covered on his desk at a quarter to ten."',
    '"Maine saadhe nau baje unki solkadhi banaayi aur hamesha ki tarah chakhi. Theek thi. Paune das baje unki desk par dhak kar rakh di."',
  ), { time: [1, '21:30'] }),
  item('t-mortar-time', 'testimony', L('Nandini: the mortar was clean at 9:20', 'Nandini: 9:20 par khal-batta saaf tha'), L(
    '"I washed the mortar myself at twenty past nine, after I ground my turmeric, and turned it upside down to dry. Whatever is in it now was put there after."',
    '"Maine sava nau ke baad, apni haldi peesne ke baad, khal-batta khud dhoya aur sookhne ke liye ulta rakha. Ab usmein jo bhi hai, baad mein aaya."',
  ), { time: [1, '21:20'] }),
  item('t-sid-sighting', 'testimony', L('Sid: a woman in white', 'Sid: safed kapdon mein aurat'), L(
    '"At about five to ten a woman in white, with a long dupatta blowing about in the wind, went into the study by the verandah door. She was out again in three or four minutes."',
    '"Lagbhag paune das baje ek safed kapdon wali aurat, hawa mein udte lambe dupatte ke saath, verandah wale darwaze se study mein gayi. Teen-chaar minute mein bahar aa gayi."',
  ), { time: [1, '21:55'] }),
  item('t-tara-voices', 'testimony', L('Tara: voices through the wall', 'Tara: deewar ke paar aawaazein'), L(
    '"At about twenty past ten I heard Sir through the wall, louder than I had ever heard him: \'Twenty years, Farida!\'"',
    '"Lagbhag sava das baje maine deewar ke paar Sir ki aawaaz suni, itni oonchi jitni kabhi nahi suni: \'Bees saal, Farida!\'"',
  ), { time: [1, '22:20'] }),
  item('t-night-visit', 'testimony', L('Farida at Tara\'s door', 'Tara ke darwaze par Farida'), L(
    'At 1:40 on Monday morning you caught Farida outside Tara\'s room in the dark, with a cut othalanga fruit in her hand.',
    'Somvaar raat 1:40 par aapne Farida ko andhere mein Tara ke kamre ke bahar pakda, haath mein kata hua othalanga phal.',
  ), { time: [3, '01:40'] }),
  item('t-plant-proof', 'testimony', L('The fruit was planted', 'Phal rakha gaya tha'), L(
    'You searched Tara\'s bag on Sunday afternoon and it held only chargers and a diary. On Monday morning a freshly cut fruit is in it. Someone put it there in the night.',
    'Aapne Ravivaar dopahar Tara ka bag dekha tha, usmein sirf charger aur ek diary thi. Somvaar subah usmein taaza kata phal hai. Kisi ne raat mein rakha.',
  ), { time: [3, '07:00'] }),
]

// ---------------------------------------------------------------- reports (others' points of view)

const reports: Report[] = [
  { id: 'r-invite', title: L('The invitation', 'Nyota'), by: L('Madhav Kamat', 'Madhav Kamat'), text: 'r-invite' },
  { id: 'r-clipping', title: L('A newspaper clipping, 2006', 'Akhbaar ki katran, 2006'), by: L('Sindhudurg Times', 'Sindhudurg Times'), text: 'r-clipping' },
  { id: 'r-doctor', title: L('Medical notes on the death', 'Maut par medical notes'), by: L('Dr. {{name}} Kamat (you)', 'Dr. {{name}} Kamat (aap)'), text: 'r-doctor' },
  { id: 'r-cg', title: L('Coast Guard radio log', 'Coast Guard radio log'), by: L('Coast Guard station, Malvan', 'Coast Guard station, Malvan'), text: 'r-cg' },
  { id: 'r-nandini', title: L('Statement: Nandini Kamat', 'Bayaan: Nandini Kamat'), by: L('Nandini Kamat', 'Nandini Kamat'), text: 'r-nandini' },
  { id: 'r-sid', title: L('Statement: Siddharth Kamat', 'Bayaan: Siddharth Kamat'), by: L('Siddharth Kamat', 'Siddharth Kamat'), text: 'r-sid' },
  { id: 'r-sid-2', title: L('Revised statement: Siddharth Kamat', 'Badla hua bayaan: Siddharth Kamat'), by: L('Siddharth Kamat', 'Siddharth Kamat'), text: 'r-sid-2' },
  { id: 'r-tara', title: L('Statement: Tara Fernandes', 'Bayaan: Tara Fernandes'), by: L('Tara Fernandes', 'Tara Fernandes'), text: 'r-tara' },
  { id: 'r-commander', title: L('Statement: Cdr Vinod Rane', 'Bayaan: Cdr Vinod Rane'), by: L('Cdr Vinod Rane (retd.)', 'Cdr Vinod Rane (retd.)'), text: 'r-commander' },
  { id: 'r-farida', title: L('Statement: Farida Shaikh', 'Bayaan: Farida Shaikh'), by: L('Adv. Farida Shaikh', 'Adv. Farida Shaikh'), text: 'r-farida' },
  { id: 'r-confession', title: L('Madhav\'s statement, read from the ribbon', 'Ribbon se padha gaya Madhav ka bayaan'), by: L('Madhav Kamat', 'Madhav Kamat'), text: 'r-confession' },
  { id: 'r-commander-2006', title: L('What happened in 2006', '2006 mein kya hua'), by: L('Cdr Vinod Rane (retd.)', 'Cdr Vinod Rane (retd.)'), text: 'r-commander-2006' },
]

// ---------------------------------------------------------------- people

const people: Person[] = [
  { id: 'madhav', name: L('Madhav Kamat', 'Madhav Kamat'), role: L('Your uncle, 66 · the host', 'Aapke Kaka, 66 · mezbaan'), summary: L(
    'Founder of Kamat Marine Exports and owner of the island. Your father\'s elder brother. You have barely spoken in twenty years.',
    'Kamat Marine Exports ke sansthaapak aur dweep ke maalik. Aapke pita ke bade bhai. Bees saal se aap dono ne mushkil se baat ki hai.',
  ) },
  { id: 'nandini', name: L('Nandini Kamat', 'Nandini Kamat'), role: L('His wife, 58', 'Unki patni, 58'), summary: L(
    'His second wife, married in 2009. Runs the family\'s hotels. Gracious, guarded, and very tired of something.',
    'Doosri patni, 2009 mein shaadi. Parivaar ke hotel sambhaalti hain. Shaalin, chaukanni, aur kisi baat se bahut thaki hui.',
  ) },
  { id: 'sid', name: L('Siddharth "Sid" Kamat', 'Siddharth "Sid" Kamat'), role: L('His son, 31 · your cousin', 'Unka beta, 31 · aapka cousin'), summary: L(
    'Son of Madhav\'s first wife. His food-delivery startup is failing. Charming when he tries, and he has stopped trying.',
    'Madhav ki pehli patni ka beta. Uska food-delivery startup doob raha hai. Koshish kare toh charming, aur ab koshish nahi karta.',
  ) },
  { id: 'tara', name: L('Tara Fernandes', 'Tara Fernandes'), role: L('His assistant, 29', 'Unki assistant, 29'), summary: L(
    'From Vengurla. Three years as his executive assistant. Knows his schedule, his pills and his moods to the minute.',
    'Vengurla se. Teen saal se unki executive assistant. Unka schedule, goliyan aur mood minute tak jaanti hain.',
  ) },
  { id: 'commander', name: L('Cdr Vinod Rane (retd.)', 'Cdr Vinod Rane (retd.)'), role: L('His oldest friend, 70', 'Unke sabse purane dost, 70'), summary: L(
    'Retired Navy. Marine superintendent of Kamat Marine in the 2000s. Brought you over in his boat, Saagarika.',
    'Retired Navy officer. 2000 ke dashak mein Kamat Marine ke marine superintendent. Apni boat Saagarika mein aapko laaye.',
  ) },
  { id: 'farida', name: L('Adv. Farida Shaikh', 'Adv. Farida Shaikh'), role: L('His lawyer, 52', 'Unki vakil, 52'), summary: L(
    'Senior advocate in Mumbai, originally from Kozhikode. Has handled the family\'s legal affairs for twenty-five years.',
    'Mumbai mein senior advocate, asal mein Kozhikode se. Pachchees saal se parivaar ke kanooni maamle dekhti hain.',
  ) },
  { id: 'you', name: L('Dr. {{name}} Kamat', 'Dr. {{name}} Kamat'), role: L('You, 34', 'Aap, 34'), summary: L(
    'An emergency doctor in Mumbai. {{Son|Daughter}} of Anant Kamat, skipper of the trawler Neelkanth, which sank with four men aboard in 2006.',
    'Mumbai mein emergency doctor. Anant Kamat {{ke bete|ki beti}}, jo trawler Neelkanth ke skipper the. Woh trawler 2006 mein chaar aadmiyon ke saath dooba.',
  ) },
]

// ---------------------------------------------------------------- nodes

const nodes: Record<string, GameNode> = {}
const add = (id: string, n: GameNode) => (nodes[id] = n)
const story = (act: string, id: string, next: string, extra: Partial<Extract<GameNode, { kind: 'story' }>> = {}) =>
  add(id, { act, kind: 'story', text: id, next, ...extra })
const opt = (en: string, hi: string, next: string, extra: Partial<Option> = {}): Option => ({ label: L(en, hi), next, ...extra })
const spot = (id: string, x: number, y: number, en: string, hi: string, extra: Partial<Hotspot> = {}): Hotspot => ({ id, x, y, label: L(en, hi), text: `h-${id}`, ...extra })
const q = (id: string, en: string, hi: string, extra: Partial<Question> = {}): Question => ({ id, label: L(en, hi), text: `q-${id}`, ...extra })

// ACT 1 — Arrival
add('a1-player', { act: 'a1', kind: 'player', text: 'a1-player', next: 'a1-boat' })
story('a1', 'a1-boat', 'a1-island', { image: 'g-arrival', give: ['r-invite', 'r-clipping'] })
story('a1', 'a1-island', 'a1-walk')
add('a1-walk', { act: 'a1', kind: 'choice', text: 'a1-walk', prompt: L('The afternoon walk', 'Dopahar ki sair'), options: [
  opt('Walk down to the jetty with the others', 'Baaki logon ke saath jetty tak jaayein', 'a1-jetty'),
  opt('Climb the lighthouse with your uncle', 'Kaka ke saath lighthouse chadhein', 'a1-lighthouse'),
] })
story('a1', 'a1-jetty', 'a1-storm', { give: ['o-kozhikode', 'o-three-fruits'] })
story('a1', 'a1-lighthouse', 'a1-storm', { image: 'g-lighthouse', give: ['o-argument'] })
story('a1', 'a1-storm', 'a1-dinner', { image: 'g-2006' })
story('a1', 'a1-dinner', 'a1-evening', { image: 'g-dinner', give: ['o-thumb'] })
add('a1-evening', { act: 'a1', kind: 'choice', text: 'a1-evening', prompt: L('After dinner, where do you go?', 'Dinner ke baad aap kahan {{jaate|jaati}} hain?'), options: [
  opt('Sit on the front porch with Nandini', 'Saamne ke porch par Nandini ke saath baithein', 'a1-porch'),
  opt('Keep the Commander company at the radio', 'Radio par Commander ka saath dein', 'a1-radio'),
  opt('Go to your room', 'Apne kamre mein jaayein', 'a1-room'),
] })
story('a1', 'a1-porch', 'a1-night', { give: ['o-nandini-porch'] })
story('a1', 'a1-radio', 'a1-night', { give: ['o-commander-radio'] })
story('a1', 'a1-room', 'a1-night', { give: ['o-footsteps'] })
story('a1', 'a1-night', 'a2-scream')

// ACT 2 — The Body
story('a2', 'a2-scream', 'a2-study', { image: 'g-storm' })
// The study is searched on Sunday morning, and again on Sunday afternoon if the player goes back.
// On the second visit only what was missed is still there, and the typewriter depends on who had the key.
const studySpots = (later: boolean): Hotspot[] => {
  const missed = (id: string): Partial<Hotspot> => (later ? { show: { lacks: [id] } } : {})
  return [
    later
      ? spot('daybed', 44, 54, 'The empty daybed', 'Khaali diwan', { text: 'h-daybed' })
      : spot('body', 44, 54, 'The daybed', 'Diwan', { give: ['o-death'] }),
    spot('glass', 60, 64, 'The glass on the desk', 'Desk par gilaas', { give: ['e-glass'], ...missed('e-glass') }),
    spot('spoon', 70, 78, 'The tray and spoon', 'Tray aur chammach', { give: ['e-spoon'], ...missed('e-spoon') }),
    spot('pills', 31, 75, 'The pill organiser', 'Goliyon ka dabba', { give: ['e-pills'], ...missed('e-pills') }),
    later
      ? spot('tw-late', 46, 71, 'The typewriter', 'Typewriter', { give: ['e-cover', 'e-ribbon'], show: { lacks: ['e-ribbon'], flags: ['studyLocked'] } })
      : spot('typewriter', 46, 71, 'The typewriter', 'Typewriter', { give: ['e-cover', 'e-ribbon'] }),
    ...(later
      ? [
          spot('tw-gone-cdr', 46, 71, 'The typewriter', 'Typewriter', { give: ['e-cover', 'o-ribbon-gone'], show: { lacks: ['e-ribbon'], flags: ['keyCommander'] } }),
          spot('tw-gone-open', 46, 71, 'The typewriter', 'Typewriter', { give: ['e-cover', 'o-ribbon-gone'], show: { lacks: ['e-ribbon'], notFlags: ['studyLocked', 'keyCommander'] } }),
        ]
      : []),
    spot('drawer', 52, 91, 'The desk drawer', 'Desk ki daraaz', { give: ['e-medical'], ...missed('e-medical') }),
    spot('safe', 88, 72, 'The safe', 'Safe', { give: ['e-safe'], ...missed('e-safe') }),
    spot('door', 82, 40, 'The verandah door', 'Verandah ka darwaza', { give: ['e-verandah'], ...missed('e-verandah') }),
  ]
}
add('a2-study', { act: 'a2', kind: 'investigate', text: 'a2-study', image: 'i-study', spots: studySpots(false), need: ['body'], next: 'a2-assess' })
story('a2', 'a2-assess', 'a2-announce', { give: ['r-doctor'] })
add('a2-announce', { act: 'a2', kind: 'choice', prompt: L('Everyone is looking at you. What do you tell them?', 'Sab aapko dekh rahe hain. Aap kya {{kehte|kehti}} hain?'), options: [
  opt('"This may not be his heart. I think he was poisoned."', '"Shayad yeh unka dil nahi tha. Mujhe lagta hai unhe zehar diya gaya."', 'a2-ann-yes', { set: ['announced'] }),
  opt('"It looks like his heart." Keep your suspicion to yourself for now.', '"Dil lagta hai." Abhi shak apne paas rakhein.', 'a2-ann-no'),
] })
story('a2', 'a2-ann-yes', 'a2-key', { give: ['t-tara-tasted'] })
story('a2', 'a2-ann-no', 'a2-key')
add('a2-key', { act: 'a2', kind: 'choice', text: 'a2-key', prompt: L('The study has a key. Who keeps it?', 'Study ki ek chaabi hai. Kaun rakhe?'), options: [
  opt('Lock it and keep the key yourself', 'Taala lagaakar chaabi khud rakhein', 'a2-radio', { set: ['studyLocked'] }),
  opt('Give the key to the Commander', 'Chaabi Commander ko dein', 'a2-radio', { set: ['keyCommander'] }),
  opt('Leave it open. You need their trust more than a lock', 'Khula chhod dein. Taale se zyada unka bharosa chahiye', 'a2-radio'),
] })
add('a2-radio', { act: 'a2', kind: 'choice', text: 'a2-radio', prompt: L('Someone has to call the Coast Guard.', 'Kisi ko Coast Guard ko bulaana hoga.'), options: [
  opt('Ask the Commander. It is his radio and his sea', 'Commander se kahein. Radio unka hai, samundar bhi', 'a2-cg', { set: ['trustCommander'] }),
  opt('Do it yourself', 'Khud karein', 'a2-cg'),
  opt('Let Sid do it. He needs something to do', 'Sid ko karne dein. Use kuch karne ko chahiye', 'a2-cg-sid'),
] })
story('a2', 'a2-cg-sid', 'a2-cg')
story('a2', 'a2-cg', 'a3-start', { give: ['r-cg'] })

// ACT 3 — The Rooms
story('a3', 'a3-start', 'a3-hub', { image: 'g-hall' })
const ROOMS = ['s-sid', 's-nandini', 's-tara', 's-cdr', 's-farida']
add('a3-hub', { act: 'a3', kind: 'choice', text: 'a3-hub', prompt: L('The day is short. Where do you look?', 'Din chhota hai. Kahan dekhein?'), options: [
  opt('The kitchen', 'Rasoi', 'a3-kitchen', { set: ['v-kitchen'], when: { notFlags: ['v-kitchen'] } }),
  opt('The jetty and the tree', 'Jetty aur ped', 'a3-jetty', { set: ['v-jetty'], when: { notFlags: ['v-jetty'] } }),
  opt('The lighthouse', 'Lighthouse', 'a3-lighthouse', { set: ['v-lh'], when: { notFlags: ['v-lh'] } }),
  opt('Go back into the study', 'Study mein wapas jaayein', 'a3-study', { set: ['v-study'], when: { notFlags: ['v-study'] } }),
  opt('Search a bedroom (time for three)', 'Ek bedroom ki talaashi (teen ka waqt hai)', 'a3-rooms', { when: { countBelow: { flags: ROOMS, n: 3 } } }),
  opt('Talk to someone', 'Kisi se baat karein', 'a3-talk'),
  opt('It is four o\'clock. The sea is rising. Go to the hall', 'Chaar baj gaye. Samundar chadh raha hai. Hall mein jaayein', 'a3-end'),
] })
add('a3-study', { act: 'a3', kind: 'investigate', text: 'a3-study', image: 'i-study', spots: studySpots(true), next: 'a3-hub' })

add('a3-kitchen', { act: 'a3', kind: 'investigate', text: 'a3-kitchen', image: 'i-kitchen', next: 'a3-hub', spots: [
  spot('mortar', 28, 63, 'The stone mortar', 'Patthar ka khal-batta', { give: ['e-mortar'] }),
  spot('knives', 31, 43, 'The knife strip', 'Chaaku ki patti', { give: ['e-knife'] }),
  spot('fridge', 63, 55, 'The fridge', 'Fridge'),
  spot('heater', 86, 56, 'The back door and the water heater', 'Peechhe ka darwaza aur paani ka heater', { give: ['e-ash'] }),
] })
add('a3-jetty', { act: 'a3', kind: 'investigate', text: 'a3-jetty', image: 'i-jetty', next: 'a3-hub', spots: [
  spot('tree', 17, 46, 'The othalanga tree', 'Othalanga ka ped', { give: ['e-tree'], show: { lacks: ['o-three-fruits'] } }),
  spot('tree-count', 17, 46, 'The othalanga tree', 'Othalanga ka ped', { give: ['e-tree', 'o-two-fruits'], show: { has: ['o-three-fruits'] } }),
  spot('boathouse', 77, 30, 'The boathouse', 'Boathouse'),
  spot('box', 59, 37, 'The lantern box', 'Lantern ka box', { give: ['e-knife-found'] }),
  spot('path', 56, 86, 'The path and the rocks', 'Raasta aur chattanein'),
] })
add('a3-lighthouse', { act: 'a3', kind: 'investigate', text: 'a3-lighthouse', image: 'i-lighthouse', next: 'a3-hub', spots: [
  spot('logbook', 51, 62, 'The desk and notebook', 'Desk aur diary', { give: ['e-logbook'] }),
  spot('lens', 53, 8, 'The lamp overhead', 'Upar ka lamp'),
  spot('chair', 41, 68, 'His chair', 'Unki kursi'),
  spot('window', 25, 33, 'The window', 'Khidki'),
] })

add('a3-rooms', { act: 'a3', kind: 'choice', text: 'a3-rooms', prompt: L('Whose room?', 'Kiska kamra?'), options: [
  opt('Sid\'s room', 'Sid ka kamra', 'a3-room-sid', { set: ['s-sid'], when: { notFlags: ['s-sid'], countBelow: { flags: ROOMS, n: 3 } } }),
  opt('Nandini\'s room', 'Nandini ka kamra', 'a3-room-nandini', { set: ['s-nandini'], when: { notFlags: ['s-nandini'], countBelow: { flags: ROOMS, n: 3 } } }),
  opt('Tara\'s room', 'Tara ka kamra', 'a3-room-tara', { set: ['s-tara'], when: { notFlags: ['s-tara'], countBelow: { flags: ROOMS, n: 3 } } }),
  opt('The Commander\'s room', 'Commander ka kamra', 'a3-room-cdr', { set: ['s-cdr'], when: { notFlags: ['s-cdr'], countBelow: { flags: ROOMS, n: 3 } } }),
  opt('Farida\'s room', 'Farida ka kamra', 'a3-room-farida', { set: ['s-farida'], when: { notFlags: ['s-farida'], countBelow: { flags: ROOMS, n: 3 } } }),
  opt('Back', 'Wapas', 'a3-hub'),
] })
add('a3-room-sid', { act: 'a3', kind: 'investigate', text: 'a3-room-sid', image: 'i-room-sid', next: 'a3-rooms', spots: [
  spot('sid-bag', 9, 86, 'The duffel bag', 'Duffel bag', { give: ['e-cash'] }),
  spot('sid-phone', 64, 38, 'His phone', 'Uska phone', { give: ['e-threats'] }),
  spot('sid-laptop', 54, 30, 'The laptop', 'Laptop', { give: ['e-will-mail'] }),
] })
add('a3-room-nandini', { act: 'a3', kind: 'investigate', text: 'a3-room-nandini', image: 'i-room-nandini', next: 'a3-rooms', spots: [
  spot('nan-table', 22, 47, 'The side table', 'Side table', { give: ['e-divorce'] }),
  spot('nan-saree', 43, 80, 'The saree', 'Saadi', { give: ['e-green'] }),
  spot('nan-wardrobe', 77, 40, 'The wardrobe', 'Almari'),
] })
add('a3-room-tara', { act: 'a3', kind: 'investigate', text: 'a3-room-tara', image: 'i-room-tara', next: 'a3-rooms', spots: [
  spot('tara-photo', 34, 17, 'The framed photograph', 'Framed tasveer', { give: ['e-crew-photo'] }),
  spot('tara-notes', 52, 53, 'The notebooks', 'Notebooks', { give: ['e-tara-notes'] }),
  spot('tara-bag', 86, 70, 'The tote bag', 'Jhola', { set: ['taraBagChecked'] }),
] })
add('a3-room-cdr', { act: 'a3', kind: 'investigate', text: 'a3-room-cdr', image: 'i-room-commander', next: 'a3-rooms', spots: [
  spot('cdr-books', 24, 18, 'The bookshelf', 'Kitaabon ki shelf', { give: ['e-navy-book'] }),
  spot('cdr-ship', 80, 49, 'The ship model', 'Jahaaz ka model', { give: ['e-share'] }),
  spot('cdr-table', 58, 40, 'The table', 'Table', { give: ['e-radio-notes'] }),
] })
add('a3-room-farida', { act: 'a3', kind: 'investigate', text: 'a3-room-farida', image: 'i-room-farida', next: 'a3-rooms', spots: [
  spot('far-sandals', 42, 88, 'The sandals', 'Sandals', { give: ['e-sandals'], show: { notFlags: ['announced'] } }),
  spot('far-nosandals', 42, 88, 'The shoe rack', 'Joote ki rack', { give: ['o-sandals-gone'], show: { flags: ['announced'] } }),
  spot('far-desk', 13, 62, 'The desk', 'Desk', { give: ['e-elevation'] }),
  spot('far-case', 87, 79, 'The suitcase', 'Suitcase', { give: ['e-first-aid'] }),
] })

add('a3-talk', { act: 'a3', kind: 'choice', text: 'a3-talk', prompt: L('Who do you talk to?', 'Kisse baat karein?'), options: [
  opt('Nandini', 'Nandini', 'a3-iv-nandini'),
  opt('Sid', 'Sid', 'a3-iv-sid'),
  opt('Tara', 'Tara', 'a3-iv-tara'),
  opt('The Commander', 'Commander', 'a3-iv-cdr'),
  opt('Farida', 'Farida', 'a3-iv-farida'),
  opt('Back', 'Wapas', 'a3-hub'),
] })
add('a3-iv-nandini', { act: 'a3', kind: 'interview', person: 'nandini', text: 'a3-iv-nandini', next: 'a3-talk', give: ['r-nandini'], questions: [
  q('nan-evening', 'Where were you last night after dinner?', 'Kal raat dinner ke baad aap kahan thin?'),
  q('nan-marriage', 'How were things between you and him?', 'Aap dono ke beech sab kaisa tha?'),
  q('nan-announce', 'Did you know what he meant to announce?', 'Kya aapko pata tha woh kya elaan karne wale the?'),
  q('nan-divorce', 'Show her the divorce papers', 'Unhe talaaq ke kagaz dikhaayein', { when: { has: ['e-divorce'] } }),
  q('nan-mortar', 'Ask about the stone mortar', 'Khal-batte ke baare mein poochhein', { when: { has: ['e-mortar'] }, give: ['t-mortar-time'] }),
] })
add('a3-iv-sid', { act: 'a3', kind: 'interview', person: 'sid', text: 'a3-iv-sid', next: 'a3-talk', give: ['r-sid'], questions: [
  q('sid-night', 'Where were you last night?', 'Kal raat tum kahan the?'),
  q('sid-father', 'When did you last talk to your father?', 'Pita se aakhri baar kab baat hui?'),
  q('sid-will', 'Did you know about the new will?', 'Naye will ke baare mein pata tha?'),
  q('sid-cash', 'Ask him about the money from the safe', 'Safe ke paison ke baare mein poochhein', { when: { hasAny: ['e-cash', 'e-safe'] }, give: ['t-sid-sighting', 'r-sid-2'] }),
] })
add('a3-iv-tara', { act: 'a3', kind: 'interview', person: 'tara', text: 'a3-iv-tara', next: 'a3-talk', give: ['r-tara'], questions: [
  q('tara-ritual', 'Tell me about his solkadhi', 'Unki solkadhi ke baare mein bataiye'),
  q('tara-who', 'Who knew he drank it at half past ten?', 'Kise pata tha woh saadhe das baje peete the?'),
  q('tara-statement', 'What was the statement he was going to read?', 'Woh kaun sa bayaan padhne wale the?'),
  q('tara-night', 'Did you hear anything in the night?', 'Raat mein kuch suna?', { give: ['t-tara-voices'] }),
  q('tara-photo', 'Show her the crew photograph', 'Unhe crew ki tasveer dikhaayein', { when: { has: ['e-crew-photo'] } }),
] })
add('a3-iv-cdr', { act: 'a3', kind: 'interview', person: 'commander', text: 'a3-iv-cdr', next: 'a3-talk', give: ['r-commander'], questions: [
  q('cdr-radio', 'Where were you between half past nine and half past ten?', 'Saadhe nau se saadhe das ke beech aap kahan the?'),
  q('cdr-tree', 'What is that tree by the jetty?', 'Jetty ke paas woh ped kya hai?'),
  q('cdr-2006', 'What happened to the Neelkanth?', 'Neelkanth ke saath kya hua tha?'),
  q('cdr-book', 'Show him the naval manual', 'Unhe navy ki kitaab dikhaayein', { when: { has: ['e-navy-book'] } }),
  q('cdr-share', 'Show him the 2006 share transfer', 'Unhe 2006 ka share transfer dikhaayein', { when: { has: ['e-share'] } }),
] })
add('a3-iv-farida', { act: 'a3', kind: 'interview', person: 'farida', text: 'a3-iv-farida', next: 'a3-talk', give: ['r-farida'], questions: [
  q('far-evening', 'When did you see him last?', 'Aapne unhe aakhri baar kab dekha?'),
  q('far-before', 'Where were you from half past nine to a quarter past ten?', 'Saadhe nau se sava das tak aap kahan thin?'),
  q('far-announce', 'What was he going to announce?', 'Woh kya elaan karne wale the?'),
  q('far-thumb', 'Ask to look at her thumb', 'Unka angootha dekhne ko kahein', { when: { has: ['o-thumb'] }, give: ['o-cut'] }),
  q('far-sandals', 'Show her the sandals', 'Unhe sandals dikhaayein', { when: { has: ['e-sandals'] } }),
  q('far-argument', 'Ask about the argument on the lighthouse', 'Lighthouse wali bahas ke baare mein poochhein', { when: { hasAny: ['o-argument', 'e-logbook', 't-tara-voices'] } }),
] })
story('a3', 'a3-end', 'a4-start')

// ACT 4 — The Second Night
story('a4', 'a4-start', 'a4-r1', { image: 'g-night' })
add('a4-r1', { act: 'a4', kind: 'route', routes: [
  { when: { has: ['e-ribbon'] }, next: 'a4-ribbon' },
  { when: { flags: ['studyLocked'] }, next: 'a4-fetch' },
], next: 'a4-r2' })
story('a4', 'a4-fetch', 'a4-ribbon', { give: ['e-cover', 'e-ribbon'] })
story('a4', 'a4-ribbon', 'a4-r2', { give: ['r-confession'] })
add('a4-r2', { act: 'a4', kind: 'route', next: 'a4-watch', routes: [
  { when: { flags: ['trustCommander'] }, next: 'a4-commander' },
  { when: { has: ['e-share'] }, next: 'a4-commander' },
] })
story('a4', 'a4-commander', 'a4-watch', { give: ['r-commander-2006'] })
add('a4-watch', { act: 'a4', kind: 'choice', text: 'a4-watch', prompt: L('Where do you spend the night?', 'Raat kahan bitaayein?'), options: [
  opt('Sit up in the corridor, outside Tara\'s door', 'Corridor mein Tara ke darwaze ke bahar jaagein', 'a4-guard-tara'),
  opt('Sit up in the study, with the evidence', 'Study mein saboot ke saath jaagein', 'a4-guard-study'),
  opt('Lock your door and sleep. You are no use exhausted', 'Darwaza band karke soyein. Thake hue kisi kaam ke nahi', 'a4-sleep'),
] })
story('a4', 'a4-guard-tara', 'a4-caught', { give: ['t-night-visit', 'e-husk'] })
story('a4', 'a4-guard-study', 'a4-morning', { give: ['o-torch'] })
story('a4', 'a4-sleep', 'a4-morning')
story('a4', 'a4-caught', 'a5-start')
story('a4', 'a4-morning', 'a4-r3', { give: ['e-husk'] })
add('a4-r3', { act: 'a4', kind: 'route', routes: [{ when: { flags: ['taraBagChecked'] }, next: 'a4-planted' }], next: 'a4-tara-blamed' })
story('a4', 'a4-planted', 'a5-start', { give: ['t-plant-proof'] })
story('a4', 'a4-tara-blamed', 'a5-start')

// ACT 5 — The Accusation
story('a5', 'a5-start', 'a5-accuse', { image: 'g-accusation' })
add('a5-accuse', { act: 'a5', kind: 'accuse', text: 'a5-accuse' })
add('end-justice', { act: 'a5', kind: 'ending', ending: 'justice', text: 'end-justice', image: 'g-epilogue' })
add('end-notproven', { act: 'a5', kind: 'ending', ending: 'notproven', text: 'end-notproven', image: 'g-hall' })
add('end-tara', { act: 'a5', kind: 'ending', ending: 'tara', text: 'end-tara', image: 'g-coastguard' })
add('end-sid', { act: 'a5', kind: 'ending', ending: 'sid', text: 'end-sid', image: 'g-coastguard' })
add('end-nandini', { act: 'a5', kind: 'ending', ending: 'nandini', text: 'end-nandini', image: 'g-coastguard' })
add('end-commander', { act: 'a5', kind: 'ending', ending: 'commander', text: 'end-commander', image: 'g-coastguard' })
add('end-none', { act: 'a5', kind: 'ending', ending: 'none', text: 'end-none', image: 'g-coastguard' })

// ---------------------------------------------------------------- the game

const game: GameMeta = {
  id: 'neelkanth',
  title: L('Neelkanth Dweep', 'Neelkanth Dweep'),
  tagline: L('Seven on an island. One is dead. One is a killer. One is you.', 'Ek dweep par saat log. Ek mara hua. Ek qaatil. Aur ek aap.'),
  blurb: L(
    'June 2026. The first great storm of the monsoon is coming in off the Arabian Sea. Your uncle Madhav, who you have barely spoken to in twenty years, has asked you to Sunday lunch on his private island off the Konkan coast. Sunday is the twentieth anniversary of the night your father drowned, skippering one of Madhav\'s trawlers. He says he owes you the truth. By morning he is dead in his study, the sea has closed behind you, and six of you are left on the island. You are a doctor. You know it was not his heart.',
    'June 2026. Arabian Sea se monsoon ka pehla bada toofan aa raha hai. Aapke Kaka Madhav, jinse bees saal se mushkil se baat hui hai, ne aapko Konkan ke paas apne niji dweep par Ravivaar ke lunch par bulaya hai. Ravivaar us raat ki beesvi barsi hai jab aapke pita Madhav ke ek trawler ko chalaate hue doob gaye the. Kehte hain, woh aapko sach bataana chahte hain. Subah tak woh apni study mein mare pade hain, samundar ne laut ka raasta band kar diya hai, aur dweep par aap chhe log bache hain. Aap doctor hain. Aapko pata hai ki yeh dil ka daura nahi tha.',
  ),
  genres: [L('Murder mystery', 'Murder mystery'), L('Decisions', 'Faisle'), L('Island', 'Dweep')],
  cover: images['cover'],
  coverPosition: '50% 8%',
  minutes: 90,
  players: { m: 'Rudra', f: 'Riya' },
  acts: [
    { id: 'a1', label: L('Act One', 'Bhaag Ek'), title: L('Arrival', 'Aagman'), start: 'a1-player' },
    { id: 'a2', label: L('Act Two', 'Bhaag Do'), title: L('The Body', 'Laash'), start: 'a2-scream' },
    { id: 'a3', label: L('Act Three', 'Bhaag Teen'), title: L('The Rooms', 'Kamre'), start: 'a3-start' },
    { id: 'a4', label: L('Act Four', 'Bhaag Chaar'), title: L('The Second Night', 'Doosri Raat'), start: 'a4-start' },
    { id: 'a5', label: L('Act Five', 'Bhaag Paanch'), title: L('The Accusation', 'Ilzaam'), start: 'a5-start' },
  ],
  nodes,
  items,
  reports,
  people,
  endings: [
    { id: 'justice', title: L('The truth, and justice', 'Sach, aur insaaf'), justice: true },
    { id: 'notproven', title: L('Not proven', 'Saabit nahi hua'), justice: false },
    { id: 'tara', title: L('The wrong hands: Tara', 'Galat haath: Tara'), justice: false },
    { id: 'sid', title: L('The wrong hands: Sid', 'Galat haath: Sid'), justice: false },
    { id: 'nandini', title: L('The wrong hands: Nandini', 'Galat haath: Nandini'), justice: false },
    { id: 'commander', title: L('The wrong hands: the Commander', 'Galat haath: Commander'), justice: false },
    { id: 'none', title: L('Heart failure', 'Dil ka daura'), justice: false },
  ],
  accusation: {
    who: [
      { id: 'nandini', label: L('Nandini Kamat', 'Nandini Kamat') },
      { id: 'sid', label: L('Sid Kamat', 'Sid Kamat') },
      { id: 'tara', label: L('Tara Fernandes', 'Tara Fernandes') },
      { id: 'commander', label: L('Cdr Vinod Rane', 'Cdr Vinod Rane') },
      { id: 'farida', label: L('Farida Shaikh', 'Farida Shaikh') },
    ],
    how: [
      { id: 'cerbera', label: L('Othalanga seed ground into his own glass of solkadhi', 'Othalanga ka beej peeskar unke apne solkadhi ke gilaas mein') },
      { id: 'digoxin', label: L('An overdose of his own heart pills', 'Unki dil ki goliyon ka overdose') },
      { id: 'curry', label: L('Poison in the fish curry at dinner', 'Dinner ki machhli curry mein zehar') },
      { id: 'smother', label: L('Smothered in his sleep', 'Neend mein dam ghonta gaya') },
    ],
    why: [
      { id: 'confession', label: L('To stop his confession about the Neelkanth', 'Neelkanth ke baare mein unka kabool-naama rokne ke liye') },
      { id: 'inheritance', label: L('For the inheritance, before a new will', 'Naye will se pehle virasat ke liye') },
      { id: 'revenge', label: L('Revenge for a father who drowned in 2006', '2006 mein doobe pita ka badla') },
      { id: 'divorce', label: L('To leave the marriage with the money', 'Paise ke saath shaadi se nikalne ke liye') },
      { id: 'debts', label: L('To pay off dangerous debts', 'Khatarnaak karz chukaane ke liye') },
    ],
    judge: ({ who, how, why }, owns) => {
      if (who === 'none') return 'end-none'
      if (who !== 'farida') return `end-${who}`
      if (how !== 'cerbera' || why !== 'confession') return 'end-notproven'
      const method = owns('e-glass') && (owns('e-mortar') || owns('e-tree'))
      const motive = owns('r-confession') || owns('r-commander-2006') || (owns('e-ash') && owns('e-logbook'))
      const link = ['e-sandals', 't-sid-sighting', 't-night-visit', 't-plant-proof'].some(owns) || (owns('e-knife-found') && owns('o-cut'))
      return method && motive && link ? 'end-justice' : 'end-notproven'
    },
  },
  images,
  loadText: async (lang) => {
    const files = Object.entries(texts).filter(([path]) => path.includes(`/content/${lang}/`))
    const raws = await Promise.all(files.map(([, load]) => load()))
    return Object.assign({}, ...raws.map(splitSections))
  },
}

export default game
