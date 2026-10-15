import type { Character, Localized } from '../types'

const L = (en: string, hi: string): Localized => ({ en, hi })

// Each card says only what is known in the chapter where the person first appears.
// Anything learned later goes in `later`, keyed to the chapter where the reader learns it.
const characters: Character[] = [
  {
    id: 'vikram',
    name: 'Vikram Sethi',
    chapterId: 'prologue',
    tag: 'victim',
    profession: L('Owner of the Silver Pine Hotel, businessman, 58', 'Silver Pine Hotel ke maalik, businessman, 58'),
    relation: L(
      'Found dead in Room 7 on the night of 14 October, with the door bolted from inside and a broken clock showing 10:15. He had a heart condition.',
      '14 October ki raat Kamra Number 7 mein mare hue mile. Darwaza andar se band tha aur tooti ghadi 10:15 dikha rahi thi. Dil ke mareez the.',
    ),
    later: [
      {
        chapterId: 'ch02',
        text: L(
          'He had been writing with his fountain pen just before he died, but the top sheet of his notepad is missing. A wet scrap of paper was in his fist.',
          'Marne se theek pehle woh fountain pen se kuch likh rahe the, lekin notepad ka upar wala panna gayab hai. Mutthi mein ek geela kagaz tha.',
        ),
      },
      {
        chapterId: 'ch08',
        text: L(
          'Phone records: he called Arjun at 9:54 to say "Come back", and a threatening message went to Arjun from his phone at 10:12.',
          'Phone records: 9:54 par unhone Arjun ko call karke kaha "wapas aao", aur 10:12 par unke phone se Arjun ko dhamki ka message gaya.',
        ),
      },
      {
        chapterId: 'ch13',
        text: L(
          'He was poisoned: a heart drug was in his blood, the teapot and the cup. He planned to change his will on the 15th to add a new heir.',
          'Unhe zeher diya gaya tha: dil ki dawa unke khoon, chaidaani aur cup mein mili. 15 tareekh ko will badal kar ek naya waaris jodne wale the.',
        ),
      },
      {
        chapterId: 'ch22',
        text: L(
          "Rohan's father. In 1995 he left Rohan's pregnant mother, Sunita, at Dehradun station and never came back. His last letter was to Rohan.",
          'Rohan ke pita. 1995 mein unhone Rohan ki maa Sunita ko pregnant haalat mein Dehradun station par chhoda aur kabhi nahi laute. Unki aakhri chitthi Rohan ke naam thi.',
        ),
      },
    ],
  },
  {
    id: 'rohan',
    name: 'Rohan Malhotra',
    chapterId: 'prologue',
    tag: 'witness',
    profession: L('Hotel manager, 30, in a maroon blazer', 'Hotel manager, 30, maroon blazer mein'),
    relation: L(
      'Has run Silver Pine for seventeen months and holds the master key. He went up with the guard when Vikram stopped answering his phone, and found the body.',
      'Satrah mahine se Silver Pine chala rahe hain aur master key unke paas hai. Jab Vikram ne phone nahi uthaya, woh guard ke saath upar gaye aur body unhone hi dekhi.',
    ),
    later: [
      {
        chapterId: 'ch03',
        tag: 'suspect',
        text: L(
          'Says he went down to the basement at about 10:10 to check the generator. He took the morning of the 14th off for a "barsi", a death anniversary.',
          'Kehte hain lagbhag 10:10 par generator check karne basement gaye the. 14 tareekh ki subah unhone ek "barsi" ke liye chhutti li thi.',
        ),
      },
      {
        chapterId: 'ch07',
        text: L(
          'His register shows a generator check from 10:12, but the basement camera was off from 10:09 to 10:44. He hid Arjun\'s return, and says he saw the doctor carry a small bottle to Room 7 "around 9:50".',
          'Register mein 10:12 se generator check likha hai, lekin basement camera 10:09 se 10:44 tak band tha. Unhone Arjun ke lautne ki baat chhupaayi, aur kehte hain ki unhone doctor ko "9:50 ke aas-paas" ek chhoti bottle Kamra 7 le jaate dekha.',
        ),
      },
      {
        chapterId: 'ch12',
        text: L(
          'His staff file: mother "Late Smt. S. Malhotra, Dehradun", father\'s name left blank. Arjun recommended him for the job.',
          'Staff file mein: maa "Late Smt. S. Malhotra, Dehradun", pita ka naam khaali. Naukri ke liye Arjun ne unki sifaarish ki thi.',
        ),
      },
      {
        chapterId: 'ch22',
        tag: 'culprit',
        text: L(
          "Vikram's abandoned son, and the killer. He stirred his late mother's heart tablets into the 10:05 tea, then took his father's letter from the dead man's fist.",
          'Vikram ke chhode hue bete, aur qaatil. Unhone apni maa ki bachi hui dil ki goliyan 10:05 wali chai mein milaayin, aur phir pita ki mutthi se unki chitthi nikaal li.',
        ),
      },
      {
        chapterId: 'epilogue',
        text: L(
          'In Sudhowala jail awaiting trial, with a copy of his father\'s letter.',
          'Sudhowala jail mein trial ka intezaar kar rahe hain, pita ki chitthi ki copy ke saath.',
        ),
      },
    ],
  },
  {
    id: 'meera',
    name: 'Meera Sethi',
    chapterId: 'prologue',
    tag: 'family',
    profession: L("Vikram's wife, 40", 'Vikram ki patni, 40'),
    relation: L(
      'His second wife, married in 2018. The staff often heard them arguing, and that week they were sleeping in separate rooms.',
      'Doosri patni, 2018 mein shaadi hui. Staff ne dono ko aksar ladte suna tha, aur us hafte dono alag kamron mein so rahe the.',
    ),
    later: [
      {
        chapterId: 'ch03',
        tag: 'suspect',
        text: L('Says she was in her own room, Room 5, after ten o\'clock.', 'Kehti hain ki 10 baje ke baad woh apne kamre, Number 5, mein thin.'),
      },
      {
        chapterId: 'ch09',
        text: L(
          'Seen near Room 7 at 10:20. She says Vikram never took sugar or sweetener in his tea.',
          '10:20 par Kamra 7 ke paas dekhi gayin. Kehti hain ki Vikram chai mein kabhi cheeni ya sugar-free nahi lete the.',
        ),
      },
      {
        chapterId: 'ch13',
        text: L('She had phoned Vikram\'s lawyer on the 12th to ask about the new will.', '12 tareekh ko unhone naye will ke baare mein Vikram ke vakil ko phone kiya tha.'),
      },
      {
        chapterId: 'ch14',
        text: L(
          'She was having an affair with Dr. Kapoor, and was in his room, Room 9, from 10:20 until the scream at 11:08.',
          'Dr. Kapoor ke saath unka affair tha. 10:20 se 11:08 ki cheekh tak woh unke kamre, Number 9, mein thin.',
        ),
      },
      {
        chapterId: 'epilogue',
        text: L(
          'Inherited everything under the old will. She kept Silver Pine, paid the staff through the winter, and set up a scholarship in Sunita Malhotra\'s name.',
          'Purane will se sab kuch unhe mila. Unhone Silver Pine nahi becha, sardiyon mein staff ko poori tankhwah di, aur Sunita Malhotra ke naam par scholarship shuru ki.',
        ),
      },
    ],
  },
  {
    id: 'arjun',
    name: 'Arjun Malhotra',
    chapterId: 'prologue',
    tag: 'other',
    profession: L("Vikram's business partner, 45", 'Vikram ke business partner, 45'),
    relation: L(
      'Partner of twelve years. They had been fighting for months over control of the company and the planned sale of the hotel. He left after the evening meeting.',
      'Baarah saal ke partner. Company ke control aur hotel ki bikri ko lekar mahinon se jhagda chal raha tha. Shaam ki meeting ke baad chale gaye the.',
    ),
    later: [
      {
        chapterId: 'ch03',
        tag: 'suspect',
        text: L('Says he left the hotel at 9:45 and never saw Vikram again that night.', 'Kehte hain 9:45 par hotel se nikal gaye aur us raat Vikram se dobara nahi mile.'),
      },
      {
        chapterId: 'ch06',
        text: L(
          'Parking records show he came back at 10:03 and left at 10:41. He admits returning but denies going up to Room 7.',
          'Parking records ke mutaabik woh 10:03 par laute aur 10:41 par gaye. Lautna maante hain, lekin Kamra 7 jaane se inkaar karte hain.',
        ),
      },
      {
        chapterId: 'ch18',
        text: L(
          'Confessed to taking ₹4.2 crore through a fake vendor. He was in Room 7 from 10:28 to 10:36, saw Vikram was sick, heard him bolt the door, and made the anonymous 11:07 call from a petrol pump.',
          'Ek nakli vendor ke zariye ₹4.2 crore nikaalna kabool kiya. 10:28 se 10:36 tak Kamra 7 mein the, dekha ki Vikram beemar hain, unhe darwaza band karte suna, aur 11:07 ki anonymous call ek petrol pump se unhone hi ki thi.',
        ),
      },
      {
        chapterId: 'epilogue',
        text: L('In jail awaiting trial for fraud.', 'Fraud ke case mein jail mein trial ka intezaar.'),
      },
    ],
  },
  {
    id: 'kapoor',
    name: 'Dr. Sameer Kapoor',
    chapterId: 'prologue',
    tag: 'other',
    profession: L('Family doctor from Dehradun, 54', 'Dehradun ke family doctor, 54'),
    relation: L(
      "Vikram's doctor for fifteen years, who knows his heart condition best. He drove up from Dehradun that evening and stayed the night.",
      'Pandrah saal se Vikram ke doctor, unki dil ki beemari sabse achhi tarah jaante hain. Us shaam Dehradun se aaye aur raat hotel mein ruke.',
    ),
    later: [
      {
        chapterId: 'ch03',
        tag: 'suspect',
        text: L('Says he saw Vikram drinking tea at 9:50, alive and normal.', 'Kehte hain 9:50 par unhone Vikram ko chai peete dekha, zinda aur bilkul theek.'),
      },
      {
        chapterId: 'ch04',
        text: L('But the waiter only delivered that tea at 10:05.', 'Lekin waiter ne woh chai 10:05 par pahunchaayi thi.'),
      },
      {
        chapterId: 'ch10',
        text: L(
          'A sealed bottle of Vikram\'s new heart tablets, which he had brought, was found in the desk drawer.',
          'Vikram ki nayi dil ki goliyon ki ek sealed bottle, jo woh laaye the, desk ki daraaz mein mili.',
        ),
      },
      {
        chapterId: 'ch15',
        text: L(
          'He was the man under the red umbrella at 10:14, fetching that bottle from his car. He went to Room 7 at 10:22.',
          '10:14 par laal chhatri ke neeche wahi the, gaadi se woh bottle laane gaye the. 10:22 par woh Kamra 7 gaye.',
        ),
      },
      {
        chapterId: 'ch16',
        text: L(
          'The bottle was untouched, 30 of 30. At 10:22 Vikram was already sick and he missed it. He saw a dark blazer behind the glass of the service-stair door.',
          'Bottle ko kisi ne nahi chhua tha, 30 mein se 30. 10:22 par Vikram pehle se beemar the aur doctor ye pehchaan nahi paaye. Unhone service-staircase ke darwaze ke shishe ke peechhe ek gehre rang ka blazer dekha.',
        ),
      },
      {
        chapterId: 'epilogue',
        text: L(
          'Reported himself to the Medical Council, closed his clinic, and now works for free at a village dispensary.',
          'Khud Medical Council ko likha, apna clinic band kiya, aur ab ek gaon ke dispensary mein muft kaam karte hain.',
        ),
      },
    ],
  },
  {
    id: 'neelam',
    name: 'Neelam',
    chapterId: 'prologue',
    tag: 'witness',
    profession: L('Night receptionist, 28', 'Night receptionist, 28'),
    relation: L(
      'Alone at the front desk that night. She took the anonymous phone call at 11:07 telling someone to hurry to Room 7.',
      'Us raat front desk par akeli thin. 11:07 par anonymous call unhone hi uthaayi, jismein kaha gaya ki jaldi Kamra 7 jaao.',
    ),
    later: [
      {
        chapterId: 'ch03',
        text: L(
          'Says Rohan took a printout up to Vikram at about 9:10, and that Rohan had the morning of the 14th off for a death anniversary.',
          'Bataati hain ki lagbhag 9:10 par Rohan Vikram ke liye ek printout upar le gaye the, aur 14 ki subah Rohan ne ek barsi ke liye chhutti li thi.',
        ),
      },
    ],
  },
  {
    id: 'bahadur',
    name: 'Bahadur',
    chapterId: 'prologue',
    tag: 'witness',
    profession: L('Night guard, ex-army, 55', 'Night guard, purane fauji, 55'),
    relation: L(
      'Went up to Room 7 with Rohan when Vikram stopped answering his phone.',
      'Jab Vikram ne phone nahi uthaya, Rohan ke saath Kamra 7 upar gaye.',
    ),
    later: [
      {
        chapterId: 'ch02',
        text: L(
          'He and Rohan broke the door open. Rohan then sent him to Room 9 for the doctor, so for a minute or so Rohan was alone with the body.',
          'Unhone aur Rohan ne darwaza toda. Phir Rohan ne unhe doctor ko bulaane Kamra 9 bheja, yaani ek-aadh minute Rohan body ke saath akele the.',
        ),
      },
    ],
  },
  {
    id: 'mohan',
    name: 'Mohan',
    chapterId: 'ch01',
    tag: 'witness',
    profession: L('Waiter, 26', 'Waiter, 26'),
    relation: L('On duty at the hotel that night.', 'Us raat hotel mein duty par the.'),
    later: [
      {
        chapterId: 'ch04',
        text: L(
          'He took Vikram\'s tea up at 10:05 (ordered at 9:58, "no sugar"). On the way he was sent down to the store for a sugar-free sachet.',
          'Vikram ki chai 10:05 par upar le gaye (9:58 ka order, "cheeni nahi"). Raaste mein unhe neeche store se sugar-free sachet laane bheja gaya.',
        ),
      },
      {
        chapterId: 'ch19',
        text: L(
          'Admits the tray stood alone in the first-floor pantry for about a minute while he fetched the sachet.',
          'Maante hain ki jab woh sachet laane gaye, tray lagbhag ek minute pehli manzil ki pantry mein akeli rahi.',
        ),
      },
    ],
  },
  {
    id: 'dev',
    name: 'Inspector Dev Rathore',
    chapterId: 'ch01',
    tag: 'investigator',
    profession: L('Crime Branch, Dehradun, 42', 'Crime Branch, Dehradun, 42'),
    relation: L(
      'Leads the investigation. Patient, quiet, and convinced that every lie keeps one true detail.',
      'Investigation unke haath mein hai. Sabr wale, kam bolne wale, aur maante hain ki har jhooth mein ek sach chhupa hota hai.',
    ),
  },
  {
    id: 'kabir',
    name: 'SI Kabir Ansari',
    chapterId: 'ch01',
    tag: 'investigator',
    profession: L("Sub-inspector, Dev's partner, 29", 'Sub-inspector, Dev ke saathi, 29'),
    relation: L(
      "Dev's restless junior partner: sometimes a disciple, sometimes the younger brother who loves to prove him wrong.",
      'Dev ke bechain junior saathi: kabhi shishya, kabhi woh chhota bhai jo unhe galat saabit karne ka koi mauka nahi chhodta.',
    ),
    later: [
      {
        chapterId: 'ch12',
        text: L('Backs the theory that Arjun and Rohan did it together.', 'Is theory ke saath hain ki Arjun aur Rohan ne milkar kiya.'),
      },
    ],
  },
  {
    id: 'pooja',
    name: 'Pooja',
    chapterId: 'ch10',
    tag: 'witness',
    profession: L('Housekeeping, day shift, 22', 'Housekeeping, din ki shift, 22'),
    relation: L(
      'Told Dev that the brass clock in Room 7 had stopped in the morning, not at night.',
      'Dev ko bataaya ki Kamra 7 ki peetal ki ghadi raat ko nahi, subah hi ruk gayi thi.',
    ),
    later: [
      {
        chapterId: 'ch11',
        text: L(
          'She had written it in the maintenance register that morning, and Rohan ticked it "seen" without changing the battery.',
          'Usi subah unhone maintenance register mein likha tha, aur Rohan ne bina battery badle "seen" ka tick laga diya.',
        ),
      },
      {
        chapterId: 'ch14',
        text: L('She found a gold earring with a blue stone in Room 9 and handed it in.', 'Kamra 9 mein neele nag wala sone ka jhumka mila, jo unhone jama kiya.'),
      },
    ],
  },
  {
    id: 'sharma',
    name: 'Adv. R.K. Sharma',
    chapterId: 'ch13',
    tag: 'witness',
    profession: L("Vikram's lawyer for 25 years, 60", 'Pachchees saal se Vikram ke vakil, 60'),
    relation: L(
      'Says Vikram called him on 10 October wanting to "add a new heir" to his will on the 15th, but wouldn\'t say who.',
      'Bataate hain ki 10 October ko Vikram ne phone karke 15 tareekh ko will mein "ek naya waaris jodne" ki baat kahi, lekin naam nahi bataaya.',
    ),
  },
  {
    id: 'sunita',
    name: 'Sunita Malhotra',
    chapterId: 'ch22',
    tag: 'other',
    profession: L('Patient of Doon Medicos, Dehradun', 'Doon Medicos, Dehradun ki mareez'),
    relation: L(
      'The patient whose pink-coated heart tablets were dispensed until October 2024. She died on 14 October 2024.',
      'Woh mareez jinki gulaabi coating wali dil ki goliyan October 2024 tak di gayin. 14 October 2024 ko unka dehaant hua.',
    ),
    later: [
      {
        chapterId: 'ch22',
        tag: 'family',
        text: L(
          "Rohan's mother, a schoolteacher. Vikram left her pregnant at Dehradun station in 1995. The night of the murder was her second death anniversary.",
          'Rohan ki maa, ek school teacher. 1995 mein Vikram unhe pregnant haalat mein Dehradun station par chhod gaye. Qatl ki raat unki doosri barsi thi.',
        ),
      },
    ],
  },
  {
    id: 'rawat',
    name: 'SI Rawat',
    chapterId: 'ch01',
    tag: 'investigator',
    minor: true,
    profession: L('Mussoorie police station', 'Mussoorie thana'),
    relation: L('First on the scene. He sealed Room 7 and kept everyone in the hotel overnight.', 'Sabse pehle pahunche. Kamra 7 seal kiya aur raat bhar sabko hotel mein roke rakha.'),
  },
  {
    id: 'negi',
    name: 'Mr. and Mrs. Negi',
    chapterId: 'prologue',
    tag: 'other',
    minor: true,
    profession: L('Elderly guests in Room 10', 'Kamra 10 ke buzurg mehmaan'),
    relation: L('They come every October. They slept through the whole night.', 'Har October aate hain. Poori raat sote rahe.'),
  },
  {
    id: 'thapa',
    name: 'Chef Thapa',
    chapterId: 'ch01',
    tag: 'other',
    minor: true,
    profession: L('Cook', 'Rasoiya'),
    relation: L('Runs the hotel kitchen, where Vikram\'s tea was made.', 'Hotel ki rasoi sambhaalte hain, jahan Vikram ki chai bani.'),
  },
  {
    id: 'anita',
    name: 'Dr. Anita Joshi',
    chapterId: 'ch04',
    tag: 'investigator',
    minor: true,
    profession: L('Forensic pathologist, Doon Hospital', 'Forensic pathologist, Doon Hospital'),
    relation: L('Did the post-mortem. An old friend of Dev who finds the living more tiring than the dead.', 'Post-mortem kiya. Dev ki purani dost, jinhe zinda log murdon se zyaada thakaate hain.'),
  },
  {
    id: 'bhatt',
    name: 'Mr. Bhatt',
    chapterId: 'ch08',
    tag: 'investigator',
    minor: true,
    profession: L('Questioned-document examiner, State FSL', 'Document examiner, State FSL'),
    relation: L('Examines the handwriting and ink on the wet scrap of paper.', 'Geele kagaz ki likhaavat aur syaahi ki jaanch karte hain.'),
  },
  {
    id: 'bisht',
    name: 'Mr. Bisht',
    chapterId: 'ch20',
    tag: 'witness',
    minor: true,
    profession: L('Pharmacist, Doon Medicos, Dehradun', 'Pharmacist, Doon Medicos, Dehradun'),
    relation: L(
      'Writes every customer\'s name in a ledger by hand. He recognised the torn tablet strip and its one patient.',
      'Har grahak ka naam haath se register mein likhte hain. Unhone phati hui goli ki strip aur uski ek mareez ko pehchaana.',
    ),
  },
]

export default characters
