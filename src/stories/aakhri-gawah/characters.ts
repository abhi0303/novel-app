import type { Character, Localized } from '../types'

const L = (en: string, hi: string): Localized => ({ en, hi })

// Each card says only what is known in the chapter where the person first appears.
// Anything learned later goes in `later`, keyed to the chapter where the reader learns it.
const characters: Character[] = [
  {
    id: 'rajiv',
    name: 'Rajiv Sethi',
    chapterId: 'ch01',
    tag: 'victim',
    profession: L('Owner of Sethi Packaging, founder of the Pari Sethi Foundation, 49', 'Sethi Packaging ke maalik, Pari Sethi Foundation ke sansthaapak, 49'),
    relation: L(
      'A respected Lucknow businessman who gives moving speeches about his late daughter. Found dead in his study on the evening of Friday 5 December.',
      'Lucknow ke izzatdaar businessman, jo apni guzri hui beti par dil chhoo lene wale bhaashan dete hain. Shukravaar 5 December ki shaam apni study mein mare hue mile.',
    ),
    later: [
      {
        chapterId: 'ch02',
        text: L(
          'Only Mohan\'s ₹10,000 salary envelope was taken from the desk; his Rolex, wallet and cufflinks were left. Pari\'s photo on his shelf had been laid face down.',
          'Desk se sirf Mohan ki ₹10,000 ki tankhwah ka lifaafa gaya; Rolex, wallet aur cufflinks wahin rahe. Shelf par Pari ki tasveer ulti rakhi gayi thi.',
        ),
      },
      {
        chapterId: 'ch03',
        text: L(
          'Killed by two blows from his own brass "Samaj Ratna" trophy, which was wiped afterwards. Death between 7:30 and 8:30 PM.',
          'Unki apni peetal ki "Samaj Ratna" trophy se do vaar karke maara gaya, aur trophy baad mein ponchh di gayi. Maut 7:30 se 8:30 baje ke beech.',
        ),
      },
      {
        chapterId: 'ch06',
        text: L(
          'Behind the public face, a harsh, controlling father. A school counsellor had once reported bruises on Pari.',
          'Bahar ki chhavi ke peechhe ek sakht, sab kuch apne qaabu mein rakhne wale pita. School counsellor ne ek baar Pari ke neel ki report ki thi.',
        ),
      },
      {
        chapterId: 'ch09',
        text: L(
          'Before punishing his children he took off his gold chain and laid it on the desk: "Is chain ki kasam, ghar ki baat ghar mein."',
          'Bachchon ko saza dene se pehle woh apni sone ki chain utaar kar desk par rakhte the: "Is chain ki kasam, ghar ki baat ghar mein."',
        ),
      },
    ],
  },
  {
    id: 'rahul',
    name: 'Rahul Sethi',
    chapterId: 'ch01',
    tag: 'family',
    profession: L('Class 12 student, 17', 'Class 12 ka chhaatr, 17'),
    relation: L(
      "Rajiv's son and Pari's older brother. Quiet. He froze while giving a speech about Pari at the foundation event.",
      'Rajiv ka beta aur Pari ka bada bhai. Chup rehne wala. Foundation ke event mein Pari par bolte hue ruk gaya.',
    ),
    later: [
      {
        chapterId: 'ch04',
        text: L(
          'Says he spent the evening studying at his friend Aditya\'s flat. Always in full sleeves, never calls his father "Papa", and has an old bruise on his wrist.',
          'Kehta hai shaam dost Aditya ke flat par padh raha tha. Hamesha poori aasteen mein, pita ko kabhi "Papa" nahi kehta, aur kalaai par ek purana neel hai.',
        ),
      },
      {
        chapterId: 'ch06',
        text: L('The doorbell camera shows him leaving home at 6:14 PM in a grey hoodie.', 'Doorbell camera mein woh shaam 6:14 par grey hoodie mein ghar se nikalta dikhta hai.'),
      },
      {
        chapterId: 'ch07',
        tag: 'suspect',
        text: L('Nobody has checked his alibi: the Verma family is away and Aditya\'s phone is off.', 'Uski alibi kisi ne check nahi ki: Verma parivaar bahar hai aur Aditya ka phone band hai.'),
      },
      {
        chapterId: 'ch11',
        text: L(
          'He never reached Aditya\'s. The next morning he asked Aditya to cover for him. He came home at 9:25 in a navy sweater, not the grey hoodie.',
          'Woh Aditya ke ghar kabhi pahuncha hi nahi. Agli subah usne Aditya se jhooth bolne ko kaha. Raat 9:25 par woh grey hoodie nahi, navy sweater mein ghar aaya.',
        ),
      },
      {
        chapterId: 'ch12',
        tag: 'culprit',
        text: L('On the roof at Nani\'s, he told Dev: "Maine hi unhe maara." I killed him.', 'Nani ki chhat par usne Dev se kaha: "Maine hi unhe maara."'),
      },
      {
        chapterId: 'ch14',
        text: L('Dev kept his confession to himself.', 'Dev ne uska kabool-naama apne tak rakha.'),
      },
      {
        chapterId: 'ch16',
        text: L('The case was closed as "untraced". He lives with what he did.', 'Case "untraced" keh kar band kar diya gaya. Jo usne kiya, uske saath woh jeeta hai.'),
      },
    ],
  },
  {
    id: 'pari',
    name: 'Pari Sethi',
    chapterId: 'ch01',
    tag: 'family',
    profession: L('Rajiv\'s daughter, died aged 12', 'Rajiv ki beti, 12 saal ki umar mein guzar gayi'),
    relation: L(
      'Rahul\'s younger sister. She died three years ago; the foundation and its scholarships carry her name.',
      'Rahul ki chhoti behen. Teen saal pehle guzar gayi; foundation aur uski scholarships uske naam par hain.',
    ),
    later: [
      {
        chapterId: 'ch10',
        text: L(
          'She took her own life on 12 December, three years ago. Funny, a mimic, mad about mango. She and Rahul knocked three times on the wall between their rooms to say "main theek hoon".',
          'Teen saal pehle 12 December ko usne apni jaan de di. Hansmukh, sabki nakal utaarne wali, aam ki deewani. Woh aur Rahul apne kamron ki beech wali deewar par teen baar khatkhata kar kehte the "main theek hoon".',
        ),
      },
      {
        chapterId: 'ch15',
        text: L('Three weeks before she died, she begged her Nani for help.', 'Marne se teen hafte pehle usne Nani se madad ki bheekh maangi thi.'),
      },
    ],
  },
  {
    id: 'nandita',
    name: 'Nandita Sethi',
    chapterId: 'ch01',
    tag: 'family',
    profession: L('Senior manager, Avadh Commercial Bank, 42', 'Senior manager, Avadh Commercial Bank, 42'),
    relation: L(
      "Rajiv's second wife and Rahul's stepmother. She missed the foundation event for a bank audit, and found her husband's body when she came home.",
      'Rajiv ki doosri patni aur Rahul ki sauteli maa. Bank audit ki wajah se foundation event mein nahi aayin, aur ghar lautne par pati ki laash unhone hi dekhi.',
    ),
    later: [
      {
        chapterId: 'ch02',
        tag: 'suspect',
        text: L(
          'Says she left the bank at 8:15 and last spoke to Rajiv at six, but her phone shows a four-minute call from him at 7:12.',
          'Kehti hain ki bank se 8:15 par niklin aur Rajiv se aakhri baat chhe baje hui, lekin unke phone par 7:12 par Rajiv ki chaar minute ki call hai.',
        ),
      },
      {
        chapterId: 'ch06',
        text: L(
          'The bank\'s log shows she left at 7:31, not 8:15: sixty-seven minutes she won\'t explain. About how Rajiv treated the children, she will only say "ghar ki baat ghar mein".',
          'Bank ka log kehta hai woh 7:31 par niklin, 8:15 par nahi: sadsath minute jinka woh jawaab nahi detin. Rajiv bachchon ke saath kaisa bartaav karte the, is par bas itna kehti hain: "ghar ki baat ghar mein".',
        ),
      },
      {
        chapterId: 'ch08',
        text: L('Arrested for her husband\'s murder.', 'Pati ke qatl ke ilzaam mein giraftaar.'),
      },
      {
        chapterId: 'ch14',
        tag: 'family',
        text: L(
          'Her car\'s toll and parking records put her alone in a mall car park from 7:41 to 8:14. Released for lack of evidence, and later discharged.',
          'Unki gaadi ke toll aur parking record ke mutaabik woh 7:41 se 8:14 tak ek mall ki parking mein akeli thin. Saboot ki kami mein reha hui, aur baad mein case se bari.',
        ),
      },
    ],
  },
  {
    id: 'mohan',
    name: 'Mohan Lal',
    chapterId: 'ch01',
    tag: 'other',
    profession: L('Household help for nine years, 54', 'Nau saal se ghar ke naukar, 54'),
    relation: L(
      'Cooks and keeps the house. He lives in a quarter in the back yard. Rajiv paid his salary in cash, by hand, every month.',
      'Khaana banaate hain aur ghar sambhaalte hain. Peechhe ke aangan mein quarter mein rehte hain. Rajiv har mahine unki tankhwah haath mein nakad dete the.',
    ),
    later: [
      {
        chapterId: 'ch02',
        tag: 'suspect',
        text: L(
          'Was out from 6:30 to 9:15 and says he went for vegetables. Two years ago he took ₹5,000 from the same drawer; Rajiv kept his signed confession.',
          '6:30 se 9:15 tak bahar the aur kehte hain sabzi lene gaye the. Do saal pehle usi daraaz se ₹5,000 liye the; Rajiv ne unka likha hua kabool-naama rakh liya tha.',
        ),
      },
      {
        chapterId: 'ch05',
        tag: 'witness',
        text: L(
          "Police found Rajiv's repaired gold chain in his trunk. A jeweller's receipt at 7:42 and a payment at a dhaba at 8:21 put him across the city. He had hidden that he was drinking.",
          'Police ko unke trunk mein Rajiv ki theek ki hui sone ki chain mili. 7:42 ki jeweller ki raseed aur 8:21 par dhabe ka payment saabit karte hain ki woh shehar ke doosre kone mein the. Unhone sharaab peena chhupaaya tha.',
        ),
      },
      {
        chapterId: 'ch09',
        text: L(
          'Told Dev what the chain meant in that house, and asked that it go to Rahul.',
          'Dev ko bataaya ki us ghar mein chain ka matlab kya tha, aur kaha ki chain Rahul ko di jaaye.',
        ),
      },
    ],
  },
  {
    id: 'ritu',
    name: 'Ritu Bajpai',
    chapterId: 'ch01',
    tag: 'witness',
    minor: true,
    profession: L('Event manager, Hotel Awadh Regency', 'Event manager, Hotel Awadh Regency'),
    relation: L('Ran the foundation event and saw Rajiv\'s mood change at a message from Nandita.', 'Foundation ka event sambhaala, aur Nandita ke message par Rajiv ka mood badalte dekha.'),
  },
  {
    id: 'ramvilas',
    name: 'Ramvilas',
    chapterId: 'ch01',
    tag: 'other',
    minor: true,
    profession: L('Colony guard, Vipul Khand', 'Colony guard, Vipul Khand'),
    relation: L('Sits at the mouth of the Sethis\' lane.', 'Sethi parivaar ki gali ke muhaane par baithte hain.'),
  },
  {
    id: 'dev',
    name: 'Inspector Dev Rathore',
    chapterId: 'ch02',
    tag: 'investigator',
    profession: L('Crime Branch, Lucknow, 42', 'Crime Branch, Lucknow, 42'),
    relation: L(
      'Leads the investigation, six months after a transfer from Dehradun. He notices the quiet people in a room.',
      'Dehradun se transfer ke chhe mahine baad, investigation unke haath mein. Kamre mein chup rehne waalon par unki nazar sabse pehle jaati hai.',
    ),
    later: [
      {
        chapterId: 'ch14',
        text: L(
          'Kept Rahul\'s confession to himself. He was taken off the case and given a censure in his record.',
          'Rahul ka kabool-naama apne tak rakha. Unhe case se hataaya gaya aur record mein censure mila.',
        ),
      },
    ],
  },
  {
    id: 'kabir',
    name: 'SI Kabir Ansari',
    chapterId: 'ch02',
    tag: 'investigator',
    profession: L("Sub-inspector, Dev's partner, 30", 'Sub-inspector, Dev ke saathi, 30'),
    relation: L('Sharp, careful with records, and reads the line below the one he is shown.', 'Tez, records mein saavdhaan, aur jo line dikhaayi jaaye uske neeche wali bhi padhte hain.'),
    later: [
      {
        chapterId: 'ch14',
        text: L(
          'Objected to Dev\'s silence but did not report him. He asked for a transfer to the Economic Offences Wing.',
          'Dev ki chuppi par aitraaz kiya, lekin unki shikaayat nahi ki. Economic Offences Wing mein transfer maanga.',
        ),
      },
    ],
  },
  {
    id: 'vivek',
    name: 'Vivek Saxena',
    chapterId: 'ch02',
    tag: 'family',
    profession: L('Runs the café Kulhad & Co., Hazratganj, 36', 'Hazratganj mein café Kulhad & Co. chalaate hain, 36'),
    relation: L("Nandita's younger brother. He came to the house after the murder.", 'Nandita ke chhote bhai. Qatl ke baad ghar aaye.'),
    later: [
      {
        chapterId: 'ch03',
        tag: 'suspect',
        text: L(
          'Owes Rajiv ₹18 lakh, lost to betting apps. Rajiv threatened him with a case that afternoon. His café alibi is false, and his white Creta was in the lane from 7:51 to 7:58.',
          'Rajiv ke ₹18 lakh ke karzdaar, jo betting apps mein doob gaye. Usi dopahar Rajiv ne case ki dhamki di thi. Café wali alibi jhoothi hai, aur unki safed Creta 7:51 se 7:58 tak gali mein thi.',
        ),
      },
      {
        chapterId: 'ch06',
        tag: 'witness',
        text: L(
          'The doorbell camera shows he rang, called Rajiv\'s phone, and left at 7:56. The door never opened.',
          'Doorbell camera mein dikhta hai ki unhone ghanti bajaayi, Rajiv ko phone kiya, aur 7:56 par chale gaye. Darwaza kabhi khula hi nahi.',
        ),
      },
    ],
  },
  {
    id: 'sharda',
    name: 'Sharda Devi (Nani)',
    chapterId: 'ch02',
    tag: 'family',
    profession: L('Retired Hindi teacher, Aliganj, 69', 'Retired Hindi teacher, Aliganj, 69'),
    relation: L(
      "Rahul and Pari's maternal grandmother, mother of Rajiv's late first wife. She took Rahul home to Aliganj on the night of the murder.",
      'Rahul aur Pari ki Nani, Rajiv ki guzri hui pehli patni ki maa. Qatl ki raat Rahul ko apne ghar Aliganj le gayin.',
    ),
    later: [
      {
        chapterId: 'ch15',
        text: L(
          'Three weeks before Pari died, Pari begged her for help. Rajiv promised to change, and she believed him and never asked Pari again.',
          'Pari ke marne se teen hafte pehle Pari ne unse madad maangi thi. Rajiv ne badalne ka vaada kiya, unhone yakeen kar liya aur Pari se phir kabhi nahi poochha.',
        ),
      },
    ],
  },
  {
    id: 'anjali',
    name: 'Anjali Sethi',
    chapterId: 'ch02',
    tag: 'family',
    minor: true,
    profession: L("Rajiv's first wife", 'Rajiv ki pehli patni'),
    relation: L("Rahul and Pari's mother. She died of cancer ten years ago.", 'Rahul aur Pari ki maa. Das saal pehle cancer se guzar gayin.'),
  },
  {
    id: 'tiwari',
    name: 'Inspector Brijesh Tiwari',
    chapterId: 'ch02',
    tag: 'investigator',
    minor: true,
    profession: L('SHO, Gomti Nagar police station', 'SHO, Gomti Nagar thana'),
    relation: L('First senior officer at the house.', 'Ghar par pahunchne wale pehle senior officer.'),
  },
  {
    id: 'alok',
    name: 'Dr. Alok Mishra',
    chapterId: 'ch02',
    tag: 'investigator',
    minor: true,
    profession: L('Forensic field unit', 'Forensic field unit'),
    relation: L('Examined the scene in the study.', 'Study mein jagah ki jaanch ki.'),
  },
  {
    id: 'farhana',
    name: 'Dr. Farhana Siddiqui',
    chapterId: 'ch03',
    tag: 'investigator',
    minor: true,
    profession: L('Pathologist, KGMU', 'Pathologist, KGMU'),
    relation: L('Did the autopsy: two blows to the head.', 'Autopsy ki: sir par do vaar.'),
  },
  {
    id: 'khanna',
    name: 'Mr. and Mrs. Khanna',
    chapterId: 'ch03',
    tag: 'witness',
    minor: true,
    profession: L('Neighbours, two doors away', 'Do ghar chhod kar padosi'),
    relation: L('He copied the lane CCTV for the police before anyone asked.', 'Unhone kisi ke kehne se pehle hi police ke liye gali ka CCTV copy kar liya.'),
    later: [
      {
        chapterId: 'ch06',
        text: L('Mrs. Khanna once passed a crying Pari a mango kulfi over the wall.', 'Mrs. Khanna ne ek baar roti hui Pari ko deewar ke upar se aam ki kulfi di thi.'),
      },
    ],
  },
  {
    id: 'imran',
    name: 'Imran',
    chapterId: 'ch03',
    tag: 'witness',
    minor: true,
    profession: L('Barista at Kulhad & Co.', 'Kulhad & Co. ka barista'),
    relation: L('Says Vivek left the café at about 7:30 after a call.', 'Bataata hai ki Vivek ek call ke baad lagbhag 7:30 par café se chale gaye.'),
  },
  {
    id: 'aditya',
    name: 'Aditya Verma',
    chapterId: 'ch04',
    tag: 'witness',
    profession: L("Rahul's friend, 17", 'Rahul ka dost, 17'),
    relation: L('Rahul says he was studying at Aditya\'s flat in Indira Nagar on the evening of the murder.', 'Rahul kehta hai qatl ki shaam woh Indira Nagar mein Aditya ke flat par padh raha tha.'),
    later: [
      {
        chapterId: 'ch11',
        text: L(
          'Rahul never came that Friday. The next morning Rahul texted him: "If anyone asks, say I was at your place."',
          'Us Shukravaar Rahul aaya hi nahi. Agli subah Rahul ne use message kiya: "Agar koi poochhe toh kehna main kal tere ghar tha."',
        ),
      },
    ],
  },
  {
    id: 'ratan',
    name: 'Ratan Lal Soni',
    chapterId: 'ch05',
    tag: 'witness',
    minor: true,
    profession: L('Jeweller, Ratan Jewellers, Aminabad', 'Jeweller, Ratan Jewellers, Aminabad'),
    relation: L('Repaired Rajiv\'s chain. He noted the clasp had been wrenched, not worn out.', 'Rajiv ki chain theek ki. Unhone note kiya ki hook ghis kar nahi, kheench kar toota tha.'),
  },
  {
    id: 'sukhiya',
    name: 'Sukhiya',
    chapterId: 'ch05',
    tag: 'witness',
    minor: true,
    profession: L('Rickshaw mechanic', 'Rickshaw mistri'),
    relation: L("Mohan's old friend, who was drinking with him at the dhaba.", 'Mohan ke purane dost, jo dhabe par unke saath pee rahe the.'),
  },
  {
    id: 'guddi',
    name: 'Guddi',
    chapterId: 'ch05',
    tag: 'family',
    minor: true,
    profession: L('Nursing student', 'Nursing ki padhaai kar rahi hai'),
    relation: L("Mohan's daughter. The ₹5,000 he once took was for her fees.", 'Mohan ki beti. Unhone jo ₹5,000 liye the, woh uski fees ke liye the.'),
  },
  {
    id: 'neha',
    name: 'SI Neha Rizvi',
    chapterId: 'ch06',
    tag: 'investigator',
    minor: true,
    profession: L('Cyber cell', 'Cyber cell'),
    relation: L('Pulled the doorbell camera footage.', 'Doorbell camera ka footage nikaala.'),
    later: [
      {
        chapterId: 'ch14',
        text: L('Found the toll and parking records that cleared Nandita.', 'Woh toll aur parking records dhoondhe jinse Nandita bari hui.'),
      },
    ],
  },
  {
    id: 'dsouza',
    name: "Mrs. Lorraine D'Souza",
    chapterId: 'ch06',
    tag: 'witness',
    minor: true,
    profession: L("School counsellor, St. Aloysius", "School counsellor, St. Aloysius"),
    relation: L('Once reported bruises on Pari, and has carried it ever since.', 'Ek baar Pari ke neel ki report ki thi, aur tab se woh bojh uthaaye hue hain.'),
  },
  {
    id: 'anupama',
    name: 'DCP Anupama Singh',
    chapterId: 'ch07',
    tag: 'investigator',
    minor: true,
    profession: L('DCP (East), Lucknow', 'DCP (East), Lucknow'),
    relation: L("Dev's boss, under pressure from the city to close the case.", 'Dev ki boss, jin par shehar ka case band karne ka dabaav hai.'),
  },
  {
    id: 'tripathi',
    name: 'ACP Rakesh Tripathi',
    chapterId: 'ch07',
    tag: 'investigator',
    minor: true,
    profession: L('Assistant Commissioner', 'Assistant Commissioner'),
    relation: L('Pushes the case against Nandita.', 'Nandita ke khilaaf case ko aage badhaate hain.'),
  },
  {
    id: 'sana',
    name: 'Sana',
    chapterId: 'ch07',
    tag: 'other',
    minor: true,
    profession: L('Class 3 teacher', 'Class 3 ki teacher'),
    relation: L("Kabir's fiancée.", 'Kabir ki mangetar.'),
  },
  {
    id: 'shalini',
    name: 'Mrs. Shalini Verma',
    chapterId: 'ch11',
    tag: 'witness',
    minor: true,
    profession: L("Vice-principal, Aditya's mother", 'Vice-principal, Aditya ki maa'),
    relation: L('Back from a wedding in Bareilly; lets Dev talk to her son.', 'Bareilly ki shaadi se lauti hain; Dev ko bete se baat karne deti hain.'),
  },
  {
    id: 'rekha',
    name: 'SI Rekha Pal',
    chapterId: 'ch14',
    tag: 'investigator',
    minor: true,
    profession: L('Special Juvenile Police Unit', 'Special Juvenile Police Unit'),
    relation: L('Questions Rahul formally, with his grandmother present.', 'Nani ki maujoodgi mein Rahul se baakaayda poochhtaachh karti hain.'),
  },
  {
    id: 'rawat',
    name: 'Inspector Rawat',
    chapterId: 'ch14',
    tag: 'investigator',
    minor: true,
    profession: L('Crime Branch, Lucknow', 'Crime Branch, Lucknow'),
    relation: L('Takes over the case file from Dev.', 'Dev se case ki file le lete hain.'),
  },
  {
    id: 'kamla',
    name: 'Kamla',
    chapterId: 'ch16',
    tag: 'family',
    minor: true,
    profession: L("Mohan's wife", 'Mohan ki patni'),
    relation: L('Lives in the family\'s village house off the Faizabad road.', 'Faizabad road ke paas parivaar ke gaon wale ghar mein rehti hain.'),
  },
]

export default characters
