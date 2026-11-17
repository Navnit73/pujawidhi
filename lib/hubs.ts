import type { CategoryKey } from "./categories";

/** Unique hub intro copy (>= 150 words per language; enforced by scripts/check-content.ts). */
export interface HubCopy {
  description: { hinglish: string; hi: string };
  intro: { hinglish: string; hi: string };
  /** Related category hubs to link to. */
  related: CategoryKey[];
}

export const HUBS: Record<CategoryKey, HubCopy> = {
  "durga-maa": {
    description: {
      hinglish: "Durga Maa ki aarti, ghar par Durga Puja vidhi, samagri list, chandi path aur pandal guide. Hinglish aur Hindi mein, saaf aur step-by-step jaankari.",
      hi: "दुर्गा माँ की आरती, घर पर दुर्गा पूजा विधि, सामग्री सूची, चंडी पाठ और पंडाल गाइड। हिंग्लिश और हिंदी में, साफ़ और स्टेप-बाय-स्टेप जानकारी। सरल भाषा में।",
    },
    intro: {
      hinglish: "Durga Maa ka yeh hub un sab logon ke liye hai jo aarti gaana, ghar par puja karna ya Durga Puja ke utsav ko samajhna chahte hain. Yahan sabse pehle aapko Jai Ambe Gauri wali aarti milegi, jo Devanagari aur Hinglish dono mein padhi ja sakti hai, aur reader mode mein bade font ke saath auto-scroll bhi hoti hai. Uske baad ghar par Durga Puja ki poori vidhi aati hai: kalash, sankalp, avahan, shodashopachar aur visarjan ka kram, har mantra ke saath. Hamne samagri ki printable list alag di hai taaki bazaar jaane se pehle aap tick karke dekh sakein. Chandi Path aur Durga Saptashati ke pages batate hain ki path kab aur kitni baar kiya jaata hai. Mahashtami, Sandhi Puja aur Kanya Pujan jaise vishesh dinon ke liye alag guide hain. Pandal wale pages sirf wahi jaankari dikhate hain jo verify ho chuki ho. Har vidhi page ek jaankar reviewer dekhta hai, aur jahan parampara ya kshetra ke hisaab se antar hota hai wahan hum 'common version' likhkar batate hain. Neeche se apna page chuniye.",
      hi: "दुर्गा माँ का यह हब उन सभी के लिए है जो आरती गाना, घर पर पूजा करना या दुर्गा पूजा के उत्सव को समझना चाहते हैं। यहाँ सबसे पहले आपको जय अम्बे गौरी वाली आरती मिलेगी, जिसे देवनागरी और हिंग्लिश दोनों में पढ़ा जा सकता है, और रीडर मोड में बड़े फ़ॉन्ट के साथ ऑटो-स्क्रॉल भी होती है। उसके बाद घर पर दुर्गा पूजा की पूरी विधि आती है: कलश, संकल्प, आवाहन, षोडशोपचार और विसर्जन का क्रम, हर मंत्र के साथ। हमने सामग्री की प्रिंट करने योग्य सूची अलग दी है ताकि बाज़ार जाने से पहले आप टिक करके देख सकें। चंडी पाठ और दुर्गा सप्तशती के पेज बताते हैं कि पाठ कब और कितनी बार किया जाता है। महाअष्टमी, संधि पूजा और कन्या पूजन जैसे विशेष दिनों के लिए अलग गाइड हैं। पंडाल वाले पेज केवल वही जानकारी दिखाते हैं जो जाँची जा चुकी हो। हर विधि पेज को एक जानकार समीक्षक देखता है, और जहाँ परंपरा या क्षेत्र के अनुसार अंतर होता है वहाँ हम 'प्रचलित रूप' लिखकर बताते हैं। नीचे से अपना पेज चुनिए।",
    },
    related: ["navratri-devi", "puja-basics", "local"],
  },
  "navratri-devi": {
    description: {
      hinglish: "Navratri puja vidhi, kalash sthapana, nau Durga ke roop, vrat niyam aur Devi stotra. Ambe aarti aur Mata Sherawali aarti Hinglish aur Hindi mein padhein.",
      hi: "नवरात्रि पूजा विधि, कलश स्थापना, नौ दुर्गा के रूप, व्रत नियम और देवी स्तोत्र। अम्बे आरती और माता शेरावाली आरती हिंग्लिश और हिंदी में पढ़ें। सरल भाषा में।",
    },
    intro: {
      hinglish: "Navratri ke nau din ek hi puja nahi, balki nau alag roopon ki upasana ka kram hain, aur is hub mein hamne use sahi tarah se sajaya hai. Pehle aap Ambe Tu Hai Jagdambe Kali aur Mata Sherawali ki aarti padh sakte hain, jinko ghar ya mandir mein gaane ke liye bade font mein dikhaya gaya hai. Phir Navratri puja ka nau din ka plan aata hai, jisme har din ka roop, mantra, bhog aur rang ek saath milta hai. Kalash sthapana ka page batata hai ki kalash kaise sajaya jaata hai aur kaun si samagri chahiye. Jo log vrat rakhte hain unke liye vrat katha, niyam aur falahar ka guide hai, jo sirf aam jaankari deta hai aur koi medical daava nahi karta. Mahalaya, Mangala Gauri aur Kali Puja jaise doosre Devi parvon ke pages bhi yahin hain. Aigiri Nandini aur Siddha Kunjika jaise stotra ke pages path ki vidhi aur arth ke saath diye jaate hain. Kisi bhi vidhi mein kshetra ke hisaab se antar ho sakta hai, isliye hum prachlit roop likhkar badi vividhtaon ka zikr karte hain.",
      hi: "नवरात्रि के नौ दिन एक ही पूजा नहीं, बल्कि नौ अलग रूपों की उपासना का क्रम हैं, और इस हब में हमने उसे सही तरह से सजाया है। पहले आप अम्बे तू है जगदम्बे काली और माता शेरावाली की आरती पढ़ सकते हैं, जिन्हें घर या मंदिर में गाने के लिए बड़े फ़ॉन्ट में दिखाया गया है। फिर नवरात्रि पूजा का नौ दिन का प्लान आता है, जिसमें हर दिन का रूप, मंत्र, भोग और रंग एक साथ मिलता है। कलश स्थापना का पेज बताता है कि कलश कैसे सजाया जाता है और कौन सी सामग्री चाहिए। जो लोग व्रत रखते हैं उनके लिए व्रत कथा, नियम और फलाहार का गाइड है, जो सिर्फ़ आम जानकारी देता है और कोई चिकित्सीय दावा नहीं करता। महालया, मंगला गौरी और काली पूजा जैसे दूसरे देवी पर्वों के पेज भी यहीं हैं। अयि गिरिनन्दिनि और सिद्ध कुंजिका जैसे स्तोत्र के पेज पाठ की विधि और अर्थ के साथ दिए जाते हैं। किसी भी विधि में क्षेत्र के अनुसार अंतर हो सकता है, इसलिए हम प्रचलित रूप लिखकर बड़ी विविधताओं का ज़िक्र करते हैं।",
    },
    related: ["durga-maa", "puja-basics", "other-devi-devta"],
  },
  "ganesh-ji": {
    description: {
      hinglish: "Ganesh Ji ki aarti, Ganpati aarti, Ganesh puja vidhi, sthapana, chaturthi aur samagri list. Hinglish aur Hindi mein, ghar par karne layak saaf guide.",
      hi: "गणेश जी की आरती, गणपति आरती, गणेश पूजा विधि, स्थापना, चतुर्थी और सामग्री सूची। हिंग्लिश और हिंदी में, घर पर करने लायक साफ़ गाइड। सरल भाषा में।",
    },
    intro: {
      hinglish: "Har shubh kaam Ganesh Ji ke smaran se shuru hota hai, isliye yeh hub rozmarra ki puja aur bade utsav, dono ko dhyan mein rakhkar banaya gaya hai. Aarti ke liye do alag pages hain: Jai Ganesh Jai Ganesh Deva wali aarti aur Maharashtra mein prachlit Sukhkarta Dukhharta wali Ganpati aarti. Dono mein lyrics Devanagari aur Hinglish mein hain, aur reader mode se aap mobile ko hath mein pakde bina bhi padh sakte hain. Puja vidhi ke page mein aachman se visarjan tak har charan, mantra aur samagri ke saath diya gaya hai. Ghar par sthapana karne waalon ke liye murti ka aakar, disha aur niyam ka guide hai, aur Ganesh Chaturthi ke muhurat ke liye panchang se milaan karne ki salaah di gayi hai. Sankashti Chaturthi aur Vinayaka Chaturthi ke vrat alag pages mein samjhaye gaye hain. Jo log roz paanch minute ki chhoti puja karna chahte hain, unke liye daily vidhi bhi shamil hai. Kai jagah paddhati alag hoti hai, isliye hum prachlit roop likhte hain aur antar bata dete hain.",
      hi: "हर शुभ काम गणेश जी के स्मरण से शुरू होता है, इसलिए यह हब रोज़मर्रा की पूजा और बड़े उत्सव, दोनों को ध्यान में रखकर बनाया गया है। आरती के लिए दो अलग पेज हैं: जय गणेश जय गणेश देवा वाली आरती और महाराष्ट्र में प्रचलित सुखकर्ता दुखहर्ता वाली गणपति आरती। दोनों में बोल देवनागरी और हिंग्लिश में हैं, और रीडर मोड से आप मोबाइल को हाथ में पकड़े बिना भी पढ़ सकते हैं। पूजा विधि के पेज में आचमन से विसर्जन तक हर चरण, मंत्र और सामग्री के साथ दिया गया है। घर पर स्थापना करने वालों के लिए मूर्ति का आकार, दिशा और नियम का गाइड है, और गणेश चतुर्थी के मुहूर्त के लिए पंचांग से मिलान करने की सलाह दी गई है। संकष्टी चतुर्थी और विनायक चतुर्थी के व्रत अलग पेजों में समझाए गए हैं। जो लोग रोज़ पाँच मिनट की छोटी पूजा करना चाहते हैं, उनके लिए दैनिक विधि भी शामिल है। कई जगह पद्धति अलग होती है, इसलिए हम प्रचलित रूप लिखते हैं और अंतर बता देते हैं।",
    },
    related: ["lakshmi-vishnu", "puja-basics", "local"],
  },
  "shiv-ji": {
    description: {
      hinglish: "Shiv Ji ki aarti, shivling abhishek vidhi, Somvar vrat, Maha Shivratri puja, Rudrabhishek aur mantra jaap. Hinglish aur Hindi mein saaf jaankari.",
      hi: "शिव जी की आरती, शिवलिंग अभिषेक विधि, सोमवार व्रत, महाशिवरात्रि पूजा, रुद्राभिषेक और मंत्र जाप। हिंग्लिश और हिंदी में साफ़ जानकारी। सरल भाषा में।",
    },
    intro: {
      hinglish: "Shiv Ji ki upasana saral bhi hai aur gehri bhi, aur is hub ka maksad dono taraf ke padhne waalon ko raasta dikhana hai. Jo log bas aarti padhna chahte hain unke liye Om Jai Shiv Omkara aur Shankar Bhagwan ki aarti ke pages hain. Jo ghar par jal, doodh aur bel patra se abhishek karna chahte hain, unke liye abhishek ki vidhi, kya chadhaya jaata hai aur kya nahi, ye sab kram se samjhaya jaayega. Somvar vrat, Pradosh vrat aur Sawan ke Somvar ke alag guide hain, taaki aap apni parampara ke hisaab se chun sakein. Maha Shivratri ke char prahar ki puja aur Rudrabhishek jaise bade anushthan ke pages samagri aur samay ka andaza dete hain. Maha Mrityunjaya, Om Namah Shivaya aur Shiv Tandav Stotram jaise mantra aur stotra ke pages mein uchcharan, arth aur jaap ki vidhi milegi. Dhyan rahe ki yeh sabhi pages shraddha aur jaankari ke liye hain, kisi phal ki guarantee ke liye nahi. Tithi aur muhurat ke liye hamesha panchang se milaan kijiye.",
      hi: "शिव जी की उपासना सरल भी है और गहरी भी, और इस हब का मक़सद दोनों तरफ़ के पढ़ने वालों को रास्ता दिखाना है। जो लोग बस आरती पढ़ना चाहते हैं उनके लिए ॐ जय शिव ओंकारा और शंकर भगवान की आरती के पेज हैं। जो घर पर जल, दूध और बेल पत्र से अभिषेक करना चाहते हैं, उनके लिए अभिषेक की विधि, क्या चढ़ाया जाता है और क्या नहीं, ये सब क्रम से समझाया जाएगा। सोमवार व्रत, प्रदोष व्रत और सावन के सोमवार के अलग गाइड हैं, ताकि आप अपनी परंपरा के हिसाब से चुन सकें। महाशिवरात्रि के चार प्रहर की पूजा और रुद्राभिषेक जैसे बड़े अनुष्ठान के पेज सामग्री और समय का अंदाज़ा देते हैं। महामृत्युंजय, ॐ नमः शिवाय और शिव तांडव स्तोत्र जैसे मंत्र और स्तोत्र के पेजों में उच्चारण, अर्थ और जाप की विधि मिलेगी। ध्यान रहे कि ये सभी पेज श्रद्धा और जानकारी के लिए हैं, किसी फल की गारंटी के लिए नहीं। तिथि और मुहूर्त के लिए हमेशा पंचांग से मिलान कीजिए।",
    },
    related: ["hanuman-ram", "navratri-devi", "puja-basics"],
  },
  "hanuman-ram": {
    description: {
      hinglish: "Hanuman Chalisa, Hanuman Ji ki aarti, Sunderkand path vidhi, Ram aarti, Ramcharitmanas path niyam aur Ram Navami puja. Hinglish aur Hindi mein.",
      hi: "हनुमान चालीसा, हनुमान जी की आरती, सुंदरकांड पाठ विधि, राम आरती, रामचरितमानस पाठ नियम और राम नवमी पूजा। हिंग्लिश और हिंदी में। हिंदी और हिंग्लिश में।",
    },
    intro: {
      hinglish: "Hanuman Ji aur Shri Ram ki bhakti ka sabse bada ang path hai, aur is hub mein path ko aasan aur anushasit tarike se karne ki jaankari ek jagah rakhi gayi hai. Hanuman Chalisa aur Hanuman Ji ki aarti ke pages mein Devanagari paath, Hinglish uchcharan aur doha-chaupai ke arth diye jaayenge. Sunderkand path ke liye alag guide hai jo batata hai ki path kab shuru karte hain, kitna samay lagta hai aur ghar par kaun si samagri rakhni chahiye. Jo parivaar Akhand Ramayan path karwana chahte hain unke liye vidhi, niyam aur kharche ka andaza ek page par milega. Mangalvar aur Shanivar ki Hanuman puja, Hanuman Jayanti aur Ram Navami ke pages tyohaar ke hisaab se saaf kram dete hain. Bajrang Baan aur Hanuman Ashtak jaise paathon ke saath unki vidhi aur arth bhi diya jaayega. Ramcharitmanas path ke niyam ghar ke liye vyavharik roop mein likhe gaye hain. Tulsidas ji ki rachnaon ke alag-alag sanskaran milte hain, isliye hum chhape hue strot se milaan karke hi paath dete hain.",
      hi: "हनुमान जी और श्री राम की भक्ति का सबसे बड़ा अंग पाठ है, और इस हब में पाठ को आसान और अनुशासित तरीक़े से करने की जानकारी एक जगह रखी गई है। हनुमान चालीसा और हनुमान जी की आरती के पेजों में देवनागरी पाठ, हिंग्लिश उच्चारण और दोहा-चौपाई के अर्थ दिए जाएँगे। सुंदरकांड पाठ के लिए अलग गाइड है जो बताता है कि पाठ कब शुरू करते हैं, कितना समय लगता है और घर पर कौन सी सामग्री रखनी चाहिए। जो परिवार अखंड रामायण पाठ करवाना चाहते हैं उनके लिए विधि, नियम और खर्चे का अंदाज़ा एक पेज पर मिलेगा। मंगलवार और शनिवार की हनुमान पूजा, हनुमान जयंती और राम नवमी के पेज त्योहार के हिसाब से साफ़ क्रम देते हैं। बजरंग बाण और हनुमान अष्टक जैसे पाठों के साथ उनकी विधि और अर्थ भी दिया जाएगा। रामचरितमानस पाठ के नियम घर के लिए व्यावहारिक रूप में लिखे गए हैं। तुलसीदास जी की रचनाओं के अलग-अलग संस्करण मिलते हैं, इसलिए हम छपे हुए स्रोत से मिलान करके ही पाठ देते हैं।",
    },
    related: ["shiv-ji", "krishna-radha", "surya-shani-navgraha"],
  },
  "lakshmi-vishnu": {
    description: {
      hinglish: "Lakshmi ji ki aarti, Lakshmi Ganesh puja Diwali, Satyanarayan katha, Vishnu aarti, Ekadashi vrat aur Tulsi Vivah vidhi. Hinglish aur Hindi mein.",
      hi: "लक्ष्मी जी की आरती, लक्ष्मी गणेश पूजा दिवाली, सत्यनारायण कथा, विष्णु आरती, एकादशी व्रत और तुलसी विवाह विधि। हिंग्लिश और हिंदी में। सरल भाषा में।",
    },
    intro: {
      hinglish: "Lakshmi, Vishnu aur Tulsi ki puja ghar ke shubh avsaron se jude hain: Diwali, Satyanarayan katha, Ekadashi aur Tulsi Vivah. Is hub mein in sabhi ko ek jagah rakha gaya hai taaki aap tyohaar ke hisaab se seedha apna page khol sakein. Lakshmi ji ki aarti aur Om Jai Jagdish Hare jaise paath Devanagari aur Hinglish mein milenge. Diwali ki Lakshmi Ganesh puja ka page choti ghar ki puja se lekar poori vidhi tak ek kram mein samjhata hai, aur muhurat ke liye panchang dekhne ki salaah deta hai. Satyanarayan puja mein vidhi aur katha dono hain, taaki parivaar saath baithkar padh sake. Ekadashi vrat ke page mein vrat ke niyam aur calendar ka tareeka hai, aur Dev Uthani Ekadashi tatha Tulsi Vivah is samay ke hisaab se khaas hain. Tulsi Mata ki aarti aur Shri Suktam jaise paath arth ke saath diye jaayenge. Hum kisi bhi vrat ya mantra se dhan ya labh ki guarantee nahi dete. Yeh pages shraddha, parampara aur vidhi ki jaankari ke liye hain.",
      hi: "लक्ष्मी, विष्णु और तुलसी की पूजा घर के शुभ अवसरों से जुड़ी है: दिवाली, सत्यनारायण कथा, एकादशी और तुलसी विवाह। इस हब में इन सभी को एक जगह रखा गया है ताकि आप त्योहार के हिसाब से सीधे अपना पेज खोल सकें। लक्ष्मी जी की आरती और ॐ जय जगदीश हरे जैसे पाठ देवनागरी और हिंग्लिश में मिलेंगे। दिवाली की लक्ष्मी गणेश पूजा का पेज छोटी घर की पूजा से लेकर पूरी विधि तक एक क्रम में समझाता है, और मुहूर्त के लिए पंचांग देखने की सलाह देता है। सत्यनारायण पूजा में विधि और कथा दोनों हैं, ताकि परिवार साथ बैठकर पढ़ सके। एकादशी व्रत के पेज में व्रत के नियम और कैलेंडर का तरीक़ा है, और देवउठनी एकादशी तथा तुलसी विवाह इस समय के हिसाब से ख़ास हैं। तुलसी माता की आरती और श्री सूक्त जैसे पाठ अर्थ के साथ दिए जाएँगे। हम किसी भी व्रत या मंत्र से धन या लाभ की गारंटी नहीं देते। ये पेज श्रद्धा, परंपरा और विधि की जानकारी के लिए हैं।",
    },
    related: ["ganesh-ji", "krishna-radha", "puja-basics"],
  },
  "krishna-radha": {
    description: {
      hinglish: "Krishna Ji ki aarti Kunj Bihari, Janmashtami puja vidhi, Laddu Gopal seva, Radha Ashtami, Govardhan puja aur Gita path guide. Hinglish aur Hindi mein.",
      hi: "कृष्ण जी की आरती कुंज बिहारी, जन्माष्टमी पूजा विधि, लड्डू गोपाल सेवा, राधा अष्टमी, गोवर्धन पूजा और गीता पाठ गाइड। हिंग्लिश और हिंदी में। सरल भाषा में।",
    },
    intro: {
      hinglish: "Krishna bhakti ghar mein do roopon mein dikhti hai: tyohaar ki dhoom aur Laddu Gopal ki roz ki seva. Is hub mein dono ke liye jagah hai. Aarti Kunj Bihari Ki ka page Devanagari aur Hinglish mein lyrics deta hai, aur mandir jaisa ahsaas dene ke liye bada font aur auto-scroll bhi. Janmashtami ke page mein madhyaratri ki puja ka kram, abhishek, jhula aur bhog ki taiyari samjhayi jaayegi, aur tithi ke liye panchang se milaan karne ka suggestion diya jaayega. Laddu Gopal seva ka guide un parivaron ke liye hai jo ghar mein bal roop ki roz seva karte hain: subah snan, shringar, bhog aur shayan ka saral niyam. Radha Ashtami aur Govardhan puja tatha Annakut ke alag pages hain. Bhagavad Gita ka daily path guide roz ek adhyay padhne ki saral yojna deta hai, aur Hare Krishna mahamantra ke jaap ki vidhi alag page par hai. Sampradaya ke hisaab se seva ki riti badal sakti hai, isliye hum prachlit roop likhkar vividhtaon ko bhi sammaan se darj karte hain.",
      hi: "कृष्ण भक्ति घर में दो रूपों में दिखती है: त्योहार की धूम और लड्डू गोपाल की रोज़ की सेवा। इस हब में दोनों के लिए जगह है। आरती कुंज बिहारी की का पेज देवनागरी और हिंग्लिश में बोल देता है, और मंदिर जैसा एहसास देने के लिए बड़ा फ़ॉन्ट और ऑटो-स्क्रॉल भी। जन्माष्टमी के पेज में मध्यरात्रि की पूजा का क्रम, अभिषेक, झूला और भोग की तैयारी समझाई जाएगी, और तिथि के लिए पंचांग से मिलान करने का सुझाव दिया जाएगा। लड्डू गोपाल सेवा का गाइड उन परिवारों के लिए है जो घर में बाल रूप की रोज़ सेवा करते हैं: सुबह स्नान, शृंगार, भोग और शयन का सरल नियम। राधा अष्टमी और गोवर्धन पूजा तथा अन्नकूट के अलग पेज हैं। भगवद्गीता का दैनिक पाठ गाइड रोज़ एक अध्याय पढ़ने की सरल योजना देता है, और हरे कृष्ण महामंत्र के जाप की विधि अलग पेज पर है। संप्रदाय के हिसाब से सेवा की रीति बदल सकती है, इसलिए हम प्रचलित रूप लिखकर विविधताओं को भी सम्मान से दर्ज करते हैं।",
    },
    related: ["lakshmi-vishnu", "hanuman-ram", "other-devi-devta"],
  },
  "other-devi-devta": {
    description: {
      hinglish: "Saraswati puja, Santoshi Mata vrat katha, Vaishno Devi aarti, Gayatri mantra, Hartalika Teej, Karwa Chauth aur Sai Baba aarti. Hinglish aur Hindi mein.",
      hi: "सरस्वती पूजा, संतोषी माता व्रत कथा, वैष्णो देवी आरती, गायत्री मंत्र, हरतालिका तीज, करवा चौथ और साईं बाबा आरती। हिंग्लिश और हिंदी में। सरल भाषा में।",
    },
    intro: {
      hinglish: "Har ghar ke apne ishtadev aur apne vrat hote hain, aur yeh hub unhi ke liye hai jo bade deity hubs mein poori tarah nahi aate. Yahan Saraswati puja aur Basant Panchami ki vidhi, Santoshi Mata ka vrat aur katha, Vaishno Devi ki aarti aur Sai Baba ki aarti ke pages milenge. Gayatri mantra ka page uchcharan, arth aur jaap ki saral vidhi batata hai. Mahilaon ke vrat jaise Hartalika Teej aur Karwa Chauth ke liye puja ka kram, samagri aur katha ek saath diye jaayenge, aur chaand ya muhurat ke samay ke liye panchang se milaan karne ki salaah rahegi. Vyasa Puja aur Guru Purnima ka page guru ke prati sammaan ko saral vidhi se vyakt karne ka tareeka batata hai. Vrat ke niyam parivaar aur kshetra ke hisaab se badalte hain, isliye hum 'prachlit roop' likhte hain aur zaroori ho to apne parivar ke bade-buzurgon ya pandit ji se poochne ko kehte hain. Kisi vrat se fal ki guarantee ka daava yahan nahi kiya jaata.",
      hi: "हर घर के अपने इष्टदेव और अपने व्रत होते हैं, और यह हब उन्हीं के लिए है जो बड़े देवता हबों में पूरी तरह नहीं आते। यहाँ सरस्वती पूजा और बसंत पंचमी की विधि, संतोषी माता का व्रत और कथा, वैष्णो देवी की आरती और साईं बाबा की आरती के पेज मिलेंगे। गायत्री मंत्र का पेज उच्चारण, अर्थ और जाप की सरल विधि बताता है। महिलाओं के व्रत जैसे हरतालिका तीज और करवा चौथ के लिए पूजा का क्रम, सामग्री और कथा एक साथ दिए जाएँगे, और चाँद या मुहूर्त के समय के लिए पंचांग से मिलान करने की सलाह रहेगी। व्यास पूजा और गुरु पूर्णिमा का पेज गुरु के प्रति सम्मान को सरल विधि से व्यक्त करने का तरीक़ा बताता है। व्रत के नियम परिवार और क्षेत्र के हिसाब से बदलते हैं, इसलिए हम 'प्रचलित रूप' लिखते हैं और ज़रूरी हो तो अपने परिवार के बड़े-बुज़ुर्गों या पंडित जी से पूछने को कहते हैं। किसी व्रत से फल की गारंटी का दावा यहाँ नहीं किया जाता।",
    },
    related: ["navratri-devi", "lakshmi-vishnu", "puja-basics"],
  },
  "surya-shani-navgraha": {
    description: {
      hinglish: "Surya Dev aarti aur arghya vidhi, Chhath Puja guide, Shani Dev aarti, Shani Chalisa, Navgraha puja aur Pitru Paksha shraddh tarpan vidhi, Hinglish mein.",
      hi: "सूर्य देव आरती और अर्घ्य विधि, छठ पूजा गाइड, शनि देव आरती, शनि चालीसा, नवग्रह पूजा और पितृ पक्ष श्राद्ध तर्पण विधि। साफ़, भरोसेमंद और आसान जानकारी।",
    },
    intro: {
      hinglish: "Surya, Shani, Navgraha aur pitron ki puja prakriti, anushasan aur kritagyata se jude hain, aur is hub mein inhe ek jagah rakha gaya hai. Surya Dev ki aarti aur arghya ki vidhi mein jal chadhane ka samay, disha aur saral mantra samjhaye jaayenge. Chhath Puja ka char din ka guide nahay-khay se paran tak ka kram batata hai, aur ghat par jaane ke niyam, samagri aur safai ki zaroori baatein bhi. Shani Dev ki aarti aur Shani Chalisa ke pages Shanivar ki puja ke saath diye jaayenge, bina kisi darr ya bhay dikhaye, kyunki Shani ki upasana anushasan aur nyay ki bhavna se ki jaati hai. Navgraha puja ka page nau grahon ke mantra aur saral vidhi ka parichay deta hai. Pitru Paksha ka page shraddh aur tarpan ki vidhi, tithi chunne ka tareeka aur parivar ki zimmedariyon ko saral bhasha mein batata hai. Yeh kriyayen kshetra aur parivar ki parampara ke hisaab se badalti hain, isliye gyani pandit ji se salaah lena hamesha achha rehta hai. Tithiyon ke liye licensed panchang hi aadhaar hai.",
      hi: "सूर्य, शनि, नवग्रह और पितरों की पूजा प्रकृति, अनुशासन और कृतज्ञता से जुड़ी है, और इस हब में इन्हें एक जगह रखा गया है। सूर्य देव की आरती और अर्घ्य की विधि में जल चढ़ाने का समय, दिशा और सरल मंत्र समझाए जाएँगे। छठ पूजा का चार दिन का गाइड नहाय-खाय से पारण तक का क्रम बताता है, और घाट पर जाने के नियम, सामग्री और सफ़ाई की ज़रूरी बातें भी। शनि देव की आरती और शनि चालीसा के पेज शनिवार की पूजा के साथ दिए जाएँगे, बिना किसी डर या भय दिखाए, क्योंकि शनि की उपासना अनुशासन और न्याय की भावना से की जाती है। नवग्रह पूजा का पेज नौ ग्रहों के मंत्र और सरल विधि का परिचय देता है। पितृ पक्ष का पेज श्राद्ध और तर्पण की विधि, तिथि चुनने का तरीक़ा और परिवार की ज़िम्मेदारियों को सरल भाषा में बताता है। ये क्रियाएँ क्षेत्र और परिवार की परंपरा के हिसाब से बदलती हैं, इसलिए ज्ञानी पंडित जी से सलाह लेना हमेशा अच्छा रहता है। तिथियों के लिए लाइसेंस प्राप्त पंचांग ही आधार है।",
    },
    related: ["hanuman-ram", "shiv-ji", "puja-basics"],
  },
  "puja-basics": {
    description: {
      hinglish: "Puja samagri list, puja thali, mandir ki disha, sankalp, aarti sangrah, panchang, rahu kaal, aarti reader mode aur printable aarti sheets, ek hi jagah.",
      hi: "पूजा सामग्री सूची, पूजा थाली, मंदिर की दिशा, संकल्प, आरती संग्रह, पंचांग, राहु काल, आरती रीडर मोड और प्रिंट करने योग्य आरती शीट, एक ही जगह। सरल भाषा में।",
    },
    intro: {
      hinglish: "Yeh hub puja ke wo saare hisse sametta hai jo har deity ke liye samaan hote hain: samagri, niyam, thali, sankalp aur samay. Agar aap pehli baar ghar par puja kar rahe hain to Beginners Guide se shuru kijiye, jo roz ki puja ka saral kram batata hai. Puja Samagri Master List ek printable suchi hai jise aap bazaar le jaa sakte hain, aur har deity ke apne samagri pages bhi isse jude honge. Aarti Sangrah mein sabhi devi-devtaon ki aarti ek jagah milti hai. Tools ke pages sabse upyogi hain: Reader Mode mein bada font aur auto-scroll hai, jo mandir mein signal na hone par bhi kaam karta hai kyunki yeh site offline save ho sakti hai. Printable Aarti Sheets se aap A4 ya A5 par apni pasand ki aartiyan chhaap sakte hain. Panchang aur Rahu Kaal ke pages shehar ke hisaab se samay dikhate hain. Puja ke niyam, jaise shuddhi, aasan aur vastra, ek chhote Do's and Don'ts page mein diye gaye hain. Hamari koshish hai ki har suchi aur niyam saral rahe, aur jahan parampara alag ho wahan vividhta ko ginaya jaye.",
      hi: "यह हब पूजा के वो सारे हिस्से समेटता है जो हर देवता के लिए समान होते हैं: सामग्री, नियम, थाली, संकल्प और समय। अगर आप पहली बार घर पर पूजा कर रहे हैं तो बिगिनर्स गाइड से शुरू कीजिए, जो रोज़ की पूजा का सरल क्रम बताता है। पूजा सामग्री मास्टर लिस्ट एक प्रिंट करने योग्य सूची है जिसे आप बाज़ार ले जा सकते हैं, और हर देवता के अपने सामग्री पेज भी इससे जुड़े होंगे। आरती संग्रह में सभी देवी-देवताओं की आरती एक जगह मिलती है। टूल्स के पेज सबसे उपयोगी हैं: रीडर मोड में बड़ा फ़ॉन्ट और ऑटो-स्क्रॉल है, जो मंदिर में सिग्नल न होने पर भी काम करता है क्योंकि यह साइट ऑफ़लाइन सहेजी जा सकती है। प्रिंट करने योग्य आरती शीट से आप A4 या A5 पर अपनी पसंद की आरतियाँ छाप सकते हैं। पंचांग और राहु काल के पेज शहर के हिसाब से समय दिखाते हैं। पूजा के नियम, जैसे शुद्धि, आसन और वस्त्र, एक छोटे क्या करें और क्या न करें पेज में दिए गए हैं। हमारी कोशिश है कि हर सूची और नियम सरल रहे, और जहाँ परंपरा अलग हो वहाँ विविधता को गिनाया जाए।",
    },
    related: ["durga-maa", "ganesh-ji", "shiv-ji"],
  },
  local: {
    description: {
      hinglish: "Durga Puja aur Ganpati pandal ke shahar-wise guide, thermocol Durga murti aur eco-friendly mitti Ganesh murti ke craft idea. Sirf verified details.",
      hi: "दुर्गा पूजा और गणपति पंडाल के शहर-वार गाइड, थर्मोकोल दुर्गा मूर्ति और इको-फ्रेंडली मिट्टी गणेश मूर्ति के क्राफ्ट आइडिया। सिर्फ़ जाँची हुई जानकारी के साथ।",
    },
    intro: {
      hinglish: "Pandal dekhne jaana aur apne haathon se murti banana, dono tyohaar ka hissa hain, aur is hub mein dono ke liye madad hai. Shahar-wise pandal guide mein Kolkata, Delhi, Mumbai, Lucknow, Patna aur Guwahati ke Durga Puja pandal, aur Mumbai tatha Pune ke Ganpati pandal shamil honge. Ek zaroori baat: pandal ki jaankari har saal badalti hai, isliye hum ek page tabhi index karwate hain jab uska naam, ilaaka, samay, map ka link aur 'aakhri baar kab jaanchi' wali tareekh verified ho jaye. Tab tak woh page 'taiyaar ho raha hai' ke roop mein rehta hai, taaki aap purani ya galat jaankari par bharosa na karein. Craft ke pages un parivaron ke liye hain jo bachchon ke saath ghar par kuch banana chahte hain: thermocol se Durga ka mukh banane ke idea aur mitti ki eco-friendly Ganesh murti ghar par banane ka saral tareeka. Mitti ki murti ka visarjan ghar ke bartan mein bhi kiya ja sakta hai, jisse nadiyon ka pradushan kam hota hai.",
      hi: "पंडाल देखने जाना और अपने हाथों से मूर्ति बनाना, दोनों त्योहार का हिस्सा हैं, और इस हब में दोनों के लिए मदद है। शहर-वार पंडाल गाइड में कोलकाता, दिल्ली, मुंबई, लखनऊ, पटना और गुवाहाटी के दुर्गा पूजा पंडाल, और मुंबई तथा पुणे के गणपति पंडाल शामिल होंगे। एक ज़रूरी बात: पंडाल की जानकारी हर साल बदलती है, इसलिए हम एक पेज तभी इंडेक्स करवाते हैं जब उसका नाम, इलाक़ा, समय, मैप का लिंक और 'आख़िरी बार कब जाँची' वाली तारीख़ जाँच ली जाए। तब तक वह पेज 'तैयार हो रहा है' के रूप में रहता है, ताकि आप पुरानी या ग़लत जानकारी पर भरोसा न करें। क्राफ़्ट के पेज उन परिवारों के लिए हैं जो बच्चों के साथ घर पर कुछ बनाना चाहते हैं: थर्मोकोल से दुर्गा का मुख बनाने के आइडिया और मिट्टी की इको-फ्रेंडली गणेश मूर्ति घर पर बनाने का सरल तरीक़ा। मिट्टी की मूर्ति का विसर्जन घर के बर्तन में भी किया जा सकता है, जिससे नदियों का प्रदूषण कम होता है।",
    },
    related: ["durga-maa", "ganesh-ji", "puja-basics"],
  },
};
