import type { Character, Localized } from '../types'

const L = (en: string, hi: string): Localized => ({ en, hi })

// Each card says only what is known in the chapter where the person first appears.
// Anything learned later goes in `later`, keyed to the chapter where the reader learns it.
const characters: Character[] = [
  {
    id: 'meera',
    name: 'Dr Meera Sanyal',
    chapterId: 'ch01',
    tag: 'lead',
    profession: L('Clinical psychologist in Jaipur, 31', 'Jaipur mein clinical psychologist, 31'),
    relation: L(
      'Receives an anonymous parcel: a cassette, a 2019 photograph of herself at Project Smriti, and a note saying she closed the door that night. In 2019, after her father died, she spent eight weeks at the institute as Dr Ira Sen\'s guest.',
      'Ek anonymous parcel milta hai: ek cassette, Project Smriti mein 2019 ki unki ek tasveer, aur ek parchi ki us raat darwaza unhone hi band kiya tha. 2019 mein pita ki maut ke baad woh aath hafte Dr Ira Sen ki mehmaan banke institute mein rahi thin.',
    ),
    later: [
      {
        chapterId: 'ch02',
        text: L(
          'After she came home in 2019, Ira told her mother to lock her door at night and never let her take sleeping pills. She has locked her own door every night since.',
          '2019 mein ghar lautne ke baad Ira ne unki maa se kaha ki raat ko unka darwaza bahar se band karein aur unhe kabhi neend ki goli na lene dein. Tab se woh khud har raat apna darwaza band karti hain.',
        ),
      },
      {
        chapterId: 'ch08',
        text: L(
          'The photograph was taken at 11:32 PM on 14 September 2019, during a long power cut, not at a farewell evening.',
          'Tasveer 14 September 2019 ki raat 11:32 baje, ek lambe power cut ke dauraan li gayi thi, kisi farewell shaam mein nahi.',
        ),
      },
      {
        chapterId: 'ch12',
        text: L(
          'The records say she was the woman who closed the red door at about 11:46 PM, while Ananya was outside on the cliff path.',
          'Records kehte hain ki lagbhag 11:46 par laal darwaza band karne wali aurat wahi thin, jab Ananya bahar cliff ke raaste par thi.',
        ),
      },
      {
        chapterId: 'ch15',
        text: L(
          'She had sleepwalked out through the red door. Ananya came after her, turned her round and lit her way home, and Meera closed the door because Ananya told her to.',
          'Woh neend mein chalte hue laal darwaze se bahar nikal gayi thin. Ananya unke peechhe aayi, unhe mod kar roshni dikhaate hue ghar ki taraf bheja, aur Meera ne darwaza isliye band kiya kyunki Ananya ne kaha tha.',
        ),
      },
    ],
  },
  {
    id: 'ananya',
    name: 'Ananya Rao ("Gauraiya")',
    chapterId: 'ch01',
    tag: 'missing',
    profession: L('Participant in Project Smriti, 2019, 24', 'Project Smriti ki participant, 2019, 24'),
    relation: L(
      'The girl who called herself Gauraiya and called Meera her sister. She vanished on the last night of the programme. Meera was told she had "flown off into her own sky".',
      'Woh ladki jo khud ko Gauraiya kehti thi aur Meera ko apni behen. Programme ki aakhri raat gayab ho gayi. Meera ko bataaya gaya ki woh "apne aasmaan mein ud gayi".',
    ),
    later: [
      {
        chapterId: 'ch02',
        text: L(
          'A former trainee reporter from Secunderabad, participant P4-05. Officially she left the institute of her own accord on 15 September 2019 and has been missing ever since.',
          'Secunderabad ki purani trainee reporter, participant P4-05. Kaagzon mein woh 15 September 2019 ko apni marzi se institute chhod gayi, aur tab se laapata hai.',
        ),
      },
      {
        chapterId: 'ch10',
        text: L(
          'On her tape she says she stopped taking her night pill so she could stay awake and listen to Meera\'s door.',
          'Apni tape par kehti hai ki usne raat ki goli lena band kiya taaki jaag kar Meera ke darwaze ki aawaaz sun sake.',
        ),
      },
      {
        chapterId: 'ch11',
        text: L('She was secretly engaged to Kabir.', 'Uski Kabir se chupke se sagaai hui thi.'),
      },
      {
        chapterId: 'ch12',
        tag: 'victim',
        text: L(
          'She never left. She died when the cliff path beyond the red door collapsed at about 11:45 PM.',
          'Woh kabhi gayi hi nahi. Lagbhag 11:45 par laal darwaze ke paar cliff ka raasta dhaha, aur uski jaan chali gayi.',
        ),
      },
      {
        chapterId: 'ch15',
        text: L(
          'She had gone out to bring the sleepwalking Meera back, and stood on the outer edge to light her way home.',
          'Woh neend mein chalti Meera ko wapas laane bahar gayi thi, aur kinaare par khadi hokar unke liye roshni kar rahi thi.',
        ),
      },
      {
        chapterId: 'ch16',
        text: L('The SDRF found her torch, marked "6", far below the broken path.', 'SDRF ko toote raaste ke kaafi neeche uski torch mili, jis par "6" likha tha.'),
      },
    ],
  },
  {
    id: 'ira',
    name: 'Dr Ira Sen',
    chapterId: 'ch01',
    tag: 'other',
    profession: L('Ran the Himgiri Institute in the hills in 2019', '2019 mein pahaadon mein Himgiri Institute chalaati thin'),
    relation: L(
      'Meera\'s late father\'s friend of thirty years. She invited Meera to the institute in 2019 as her guest, and at the station told her Gauraiya had "flown off into her own sky".',
      'Meera ke guzre pita ki tees saal purani dost. 2019 mein Meera ko mehmaan banaakar institute bulaya, aur station par kaha ki Gauraiya "apne aasmaan mein ud gayi".',
    ),
    later: [
      {
        chapterId: 'ch03',
        text: L(
          'A psychiatrist, now 58 and retired, who directed Project Smriti. She lives with her sister on Rajpur Road, Dehradun, calls the photograph a farewell evening, and wants to know who sent it.',
          'Psychiatrist, ab 58 aur retired, jo Project Smriti ki director thin. Dehradun ke Rajpur Road par apni behen ke saath rehti hain, tasveer ko farewell ki shaam batati hain, aur jaanna chahti hain ki ise kisne bheja.',
        ),
      },
      {
        chapterId: 'ch14',
        tag: 'culprit',
        text: L(
          'She covered up the night: had the registers rewritten, mis-dated the photograph and the tape, and sent Meera away before the police came. Meera had been given a sleeping drug she never agreed to.',
          'Usne us raat ko chhupaaya: registers dobara likhwaaye, tasveer aur tape par galat tareekh daali, aur police aane se pehle Meera ko bhej diya. Meera ko neend ki dawa di gayi thi jiske liye unhone kabhi haan nahi kaha tha.',
        ),
      },
      {
        chapterId: 'ch15',
        text: L(
          'She knew from the next evening that Meera had gone out: she kept the muddy slipper marked "7".',
          'Agli shaam se hi unhe pata tha ki Meera bahar gayi thin: "7" likhi keechad bhari chappal unhone sambhaal kar rakhi.',
        ),
      },
      {
        chapterId: 'ch16',
        text: L(
          'A police case was registered against her, and the State Medical Council opened an inquiry.',
          'Unke khilaaf police case darj hua, aur State Medical Council ne jaanch shuru ki.',
        ),
      },
    ],
  },
  {
    id: 'kabir',
    name: 'Kabir Qureshi',
    chapterId: 'ch02',
    tag: 'investigator',
    profession: L('Freelance investigative journalist, Delhi, 35', 'Freelance investigative journalist, Delhi, 35'),
    relation: L(
      'Has written for years about Project Smriti and the missing woman. Meera writes to him, and he flies to Jaipur and asks how she came to be in the photograph.',
      'Saalon se Project Smriti aur laapata ladki par likhte aaye hain. Meera unhe likhti hain, aur woh Jaipur aakar poochhte hain ki woh tasveer mein kaise aayin.',
    ),
    later: [
      {
        chapterId: 'ch11',
        text: L(
          'He was Ananya\'s fiancé, and has her letters from the institute. Ira\'s lawyers stopped his 2020 article and he lost his job.',
          'Woh Ananya ke mangetar the, aur institute se aayi uski chitthiyan unke paas hain. Ira ke vakeelon ne 2020 mein unka article rukwaaya aur unki naukri chali gayi.',
        ),
      },
      {
        chapterId: 'ch15',
        text: L(
          'He had kept back the page of her letters that said Meera walked at night.',
          'Ananya ki chitthiyon ka woh panna unhone chhupa ke rakha tha jismein likha tha ki Meera raat ko neend mein chalti hain.',
        ),
      },
    ],
  },
  {
    id: 'sudha',
    name: 'Sudha Sanyal',
    chapterId: 'ch02',
    tag: 'family',
    profession: L("Meera's mother, Bani Park, Jaipur", 'Meera ki maa, Bani Park, Jaipur'),
    relation: L(
      'Shows Meera the family records. On Ira\'s advice she locked Meera\'s door from outside every night for three months after 2019, and never let her take sleeping pills.',
      'Meera ko parivaar ke records dikhaati hain. Ira ki salaah par 2019 ke baad teen mahine tak har raat Meera ka darwaza bahar se band kiya, aur kabhi neend ki goli nahi lene di.',
    ),
  },
  {
    id: 'ashok',
    name: 'Ashok Sanyal',
    chapterId: 'ch02',
    tag: 'family',
    profession: L("Meera's late father", 'Meera ke guzre hue pita'),
    relation: L(
      'Died of a heart attack in his study in February 2019, while Meera was in the next room with headphones on. Ira Sen was his friend for thirty years.',
      'February 2019 mein apni study mein dil ke daure se guzar gaye, jab Meera bagal ke kamre mein headphones lagaaye baithi thin. Ira Sen tees saal se unki dost thin.',
    ),
  },
  {
    id: 'neelam',
    name: 'Neelam Bisht',
    chapterId: 'ch01',
    tag: 'witness',
    profession: L('Project Smriti participant, 2019', 'Project Smriti participant, 2019'),
    relation: L('In the 2019 photograph, with a bandage on her right wrist.', '2019 ki tasveer mein, daayin kalaai par patti bandhi.'),
    later: [
      {
        chapterId: 'ch05',
        text: L(
          'Now teaches at a government girls\' school in Uttarkashi. Without being prompted she uses Ira\'s exact words: Gauraiya "flew off into her own sky".',
          'Ab Uttarkashi ke ek sarkaari girls school mein padhaati hain. Bina poochhe Ira ke wahi shabd dohraati hain: Gauraiya "apne aasmaan mein ud gayi".',
        ),
      },
    ],
  },
  {
    id: 'farhan',
    name: 'Farhan Ali',
    chapterId: 'ch01',
    tag: 'witness',
    profession: L('Project Smriti participant, 2019', 'Project Smriti participant, 2019'),
    relation: L('In the 2019 photograph, pulling a face at the camera.', '2019 ki tasveer mein, camera ki taraf munh banaate hue.'),
    later: [
      {
        chapterId: 'ch05',
        text: L('Now runs his own bakery in Okhla, Delhi. He talks to Meera on a video call.', 'Ab Okhla, Delhi mein apni bakery chalaate hain. Meera se video call par baat karte hain.'),
      },
    ],
  },
  {
    id: 'tenzin',
    name: 'Tenzin Dolma',
    chapterId: 'ch01',
    tag: 'witness',
    profession: L('Project Smriti participant, 2019', 'Project Smriti participant, 2019'),
    relation: L('In the 2019 photograph, in round glasses, laughing.', '2019 ki tasveer mein, gol chashme mein, hanste hue.'),
    later: [
      {
        chapterId: 'ch05',
        text: L(
          'Now a staff nurse on the women\'s ward at Uttarkashi district hospital. She too says Gauraiya "flew off into her own sky".',
          'Ab Uttarkashi district hospital ke mahila ward mein staff nurse hain. Woh bhi kehti hain ki Gauraiya "apne aasmaan mein ud gayi".',
        ),
      },
    ],
  },
  {
    id: 'gaurav',
    name: 'Gaurav Thapliyal',
    chapterId: 'ch01',
    tag: 'witness',
    profession: L('Project Smriti participant, 2019', 'Project Smriti participant, 2019'),
    relation: L('In the 2019 photograph, tall and unsmiling at the back.', '2019 ki tasveer mein, peechhe lamba aur bina muskaan ke.'),
    later: [
      {
        chapterId: 'ch05',
        text: L(
          'Through his wife in Pauri he refuses to talk. Then a second message comes from the same number: "Ask the electrician about the door."',
          'Pauri se unki patni ke zariye baat karne se mana kar dete hain. Phir usi number se doosra message aata hai: "Bijli wale se poochho darwaze ke baare mein."',
        ),
      },
    ],
  },
  {
    id: 'ritika',
    name: 'Ritika Sharma',
    chapterId: 'ch01',
    tag: 'witness',
    profession: L('Project Smriti participant, 2019, the youngest', 'Project Smriti participant, 2019, sabse chhoti'),
    relation: L('In the 2019 photograph, kneeling at the front.', '2019 ki tasveer mein, aage ghutnon ke bal baithi.'),
    later: [
      {
        chapterId: 'ch05',
        text: L('Now works night shifts in a hospital pharmacy in Toronto. She sends Meera fourteen voice notes.', 'Ab Toronto mein ek hospital pharmacy mein raat ki shift karti hain. Meera ko chaudah voice notes bhejti hain.'),
      },
    ],
  },
  {
    id: 'dev',
    name: 'Dev Malik',
    chapterId: 'ch04',
    tag: 'witness',
    profession: L("Caretaker of the old building, 42; the institute's electrician in 2019", 'Purani building ke rakhwale, 42; 2019 mein institute ke electrician'),
    relation: L(
      'Shows Meera and Kabir round the empty institute, days before it is due to be demolished.',
      'Demolition se kuch din pehle Meera aur Kabir ko khaali institute dikhaate hain.',
    ),
    later: [
      {
        chapterId: 'ch07',
        text: L(
          'Says the generator started by itself that night. His own log says it failed at 11:05 PM and he started it by hand at 11:47.',
          'Kehte hain us raat generator apne aap chal gaya. Unka apna log kehta hai ki 11:05 par fail hua aur 11:47 par unhone haath se chalaaya.',
        ),
      },
      {
        chapterId: 'ch12',
        text: L(
          'Saw a torch moving east on the cliff path, heard the crash, then saw "Meera didi" close the red door. For seven years he has believed she shut Ananya out.',
          'Cliff ke raaste par purab ki taraf jaati torch dekhi, dhamaka suna, phir "Meera didi" ko laal darwaza band karte dekha. Saat saal se maante aaye hain ki unhone Ananya ko bahar band kar diya.',
        ),
      },
      {
        chapterId: 'ch14',
        text: L('He sent Meera the parcel.', 'Meera ko parcel unhone hi bheja tha.'),
      },
    ],
  },
  {
    id: 'annamma',
    name: 'Sister Annamma Varghese',
    chapterId: 'ch05',
    tag: 'witness',
    profession: L('Night nurse in 2019, now retired in Kottayam', '2019 mein night nurse, ab Kottayam mein retired'),
    relation: L(
      'On the phone her first question is "Your feet?", and then she says she doesn\'t remember. She kept her own little book.',
      'Phone par unka pehla sawaal hai "Tumhare pair?", aur phir kehti hain ki unhe yaad nahi. Unhone apni ek chhoti notebook rakhi thi.',
    ),
    later: [
      {
        chapterId: 'ch14',
        text: L(
          'Ira made her rewrite the register. She sends Meera photos of her own notebook, every night from August 2019.',
          'Ira ne unse register dobara likhwaaya tha. Woh Meera ko apni notebook ki photos bhejti hain, August 2019 ki har raat ki.',
        ),
      },
      {
        chapterId: 'ch15',
        text: L(
          'Her note from 6:10 AM on 15 September: Meera\'s feet cut, mud to the ankles, and Meera saying "Gauraiya bol rahi thi andar jao".',
          '15 September subah 6:10 ka unka note: Meera ke pair kate hue, takhnon tak keechad, aur Meera keh rahi thin "Gauraiya bol rahi thi andar jao".',
        ),
      },
    ],
  },
  {
    id: 'bhandari',
    name: 'SP Ankita Bhandari',
    chapterId: 'ch13',
    tag: 'investigator',
    profession: L('Superintendent of Police, Uttarkashi', 'Superintendent of Police, Uttarkashi'),
    relation: L(
      'Once commanded the SDRF in Dehradun. Kabir calls her when he finally has "something real", and she hears everyone out.',
      'Kabhi Dehradun mein SDRF ki commandant thin. Jab Kabir ke paas aakhir "kuch asli" hota hai, woh unhe phone karte hain, aur woh sabki baat sunti hain.',
    ),
  },
  {
    id: 'raos',
    name: 'Lakshmi and Venkatesh Rao',
    chapterId: 'ch16',
    tag: 'family',
    profession: L("Ananya's parents, Secunderabad", 'Ananya ke maata-pita, Secunderabad'),
    relation: L(
      'Live in the railway quarters behind Bolarum station. Meera goes to see them.',
      'Bolarum station ke peechhe railway quarters mein rehte hain. Meera unse milne jaati hain.',
    ),
  },
  {
    id: 'rawat',
    name: 'Rawat-ji',
    chapterId: 'ch01',
    tag: 'other',
    minor: true,
    profession: L('Institute driver', 'Institute ke driver'),
    relation: L('Drove Meera down the mountain at dawn on 15 September 2019.', '15 September 2019 ki subah Meera ko pahaad se neeche le gaye.'),
  },
  {
    id: 'joshi',
    name: 'Joshi-ji',
    chapterId: 'ch05',
    tag: 'other',
    minor: true,
    profession: L('Institute office clerk', 'Institute ke office clerk'),
    relation: L('Typed the participants\' statements for the police, which they read and signed.', 'Police ke liye participants ke bayaan type kiye, jinhe unhone padh kar sign kiya.'),
  },
  {
    id: 'kunwar',
    name: 'Kunwar Singh',
    chapterId: 'ch07',
    tag: 'witness',
    minor: true,
    profession: L('Institute gate guard', 'Institute ke gate guard'),
    relation: L('Was sheltering from the rain that night.', 'Us raat baarish se bachne ke liye andar the.'),
  },
]

export default characters
