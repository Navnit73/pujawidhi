import type { Lang } from "@/lib/schema";
import { SITE_NAME } from "@/lib/site";

const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

export const LEGAL_TITLE = {
  privacy: { hinglish: "Privacy Policy", hi: "गोपनीयता नीति" },
  contact: { hinglish: "Contact", hi: "संपर्क" },
  about: { hinglish: "PujaWidhi ke baare mein", hi: "PujaWidhi के बारे में" },
  terms: { hinglish: "Terms of Use", hi: "उपयोग की शर्तें" },
};

export function AboutBody({ lang }: { lang: Lang }) {
  if (lang === "hi") {
    return (
      <>
        <p>{SITE_NAME} घर की पूजा के लिए आरती, पूजा विधि, पाठ, चालीसा और व्रत की जानकारी हिंदी और हिंग्लिश (रोमन लिपि में हिंदी) में देने वाली साइट है। मक़सद यह है कि मोबाइल पर, थाली हाथ में होते हुए भी, साफ़ और भरोसेमंद जानकारी मिल जाए।</p>
        <h2 id="kya-milta-hai">यहाँ क्या मिलता है</h2>
        <ul>
          <li>देवनागरी और हिंग्लिश में पूरी आरती, अर्थ के साथ, बड़े फ़ॉन्ट वाले रीडर मोड में।</li>
          <li>घर पर पूजा की स्टेप-बाय-स्टेप विधि, सामग्री सूची और मंत्र।</li>
          <li>आज का पंचांग, राहु काल, और प्रिंट करने लायक आरती शीट।</li>
        </ul>
        <h2 id="samiksha">पेज की समीक्षा कैसे होती है</h2>
        <p>विधि, पाठ, मंत्र, चालीसा और स्तोत्र वाले पेजों पर समीक्षक का नाम और आख़िरी अपडेट की तारीख़ दिखती है। जिस पेज की समीक्षा बाकी है, उस पर साफ़ लिखा रहता है कि पंडित समीक्षक की मंज़ूरी बाकी है। जो पेज अभी तैयार हो रहे हैं, उन्हें खोज इंजनों से दूर रखा जाता है।</p>
        <h2 id="parampara">परंपरा और क्षेत्र का फ़र्क़</h2>
        <p>पूजा की विधि परंपरा और क्षेत्र के अनुसार बदलती है। हम प्रचलित रूप देते हैं। अपने परिवार या पंडित जी की परंपरा अलग हो तो उसी का पालन करें। तिथि और मुहूर्त के लिए अपने पंचांग से मिलान करें।</p>
        <h2 id="sudhaar">ग़लती मिले तो</h2>
        <p>कोई ग़लती, छूटी हुई पंक्ति या अलग परंपरा का रूप दिखे तो संपर्क पेज से बताइए। हम जाँचकर पेज अपडेट करते हैं। साइट पर कोई खाता, लॉगिन, भुगतान या विज्ञापन नहीं है।</p>
      </>
    );
  }
  return (
    <>
      <p>{SITE_NAME} ghar ki puja ke liye aarti, puja vidhi, path, chalisa aur vrat ki jaankari Hindi aur Hinglish (Roman lipi mein Hindi) mein dene waali site hai. Maqsad yeh hai ki mobile par, thaali haath mein hote hue bhi, saaf aur bharosemand jaankari mil jaaye.</p>
      <h2 id="kya-milta-hai">Yahan kya milta hai</h2>
      <ul>
        <li>Devanagari aur Hinglish mein poori aarti, arth ke saath, bade font waale reader mode mein.</li>
        <li>Ghar par puja ki step-by-step vidhi, samagri list aur mantra.</li>
        <li>Aaj ka panchang, rahu kaal, aur print karne laayak aarti sheets.</li>
      </ul>
      <h2 id="samiksha">Pages ka review kaise hota hai</h2>
      <p>Vidhi, path, mantra, chalisa aur stotra waale pages par reviewer ka naam aur aakhri update ki tareekh dikhti hai. Jis page ka review baaki hai, us par saaf likha rehta hai ki pandit reviewer ka sign-off baaki hai. Jo pages abhi taiyaar ho rahe hain, unhe search engines se door rakha jaata hai.</p>
      <h2 id="parampara">Parampara aur kshetra ka farq</h2>
      <p>Puja ki vidhi parampara aur kshetra ke hisaab se badalti hai. Hum prachlit roop dete hain. Aapke parivaar ya pandit ji ki parampara alag ho to usi ka paalan karein. Tithi aur muhurat ke liye apne panchang se milaan karein.</p>
      <h2 id="sudhaar">Galti mile to</h2>
      <p>Koi galti, chhooti hui pankti ya alag parampara ka roop dikhe to Contact page se bataiye. Hum jaanchkar page update karte hain. Site par koi account, login, payment ya ad nahi hai.</p>
    </>
  );
}

export function TermsBody({ lang }: { lang: Lang }) {
  if (lang === "hi") {
    return (
      <>
        <p>{SITE_NAME} का उपयोग करके आप इन सरल शर्तों से सहमत होते हैं।</p>
        <h2 id="jaankari">सिर्फ़ जानकारी के लिए</h2>
        <p>यहाँ की सामग्री धार्मिक और सांस्कृतिक जानकारी के लिए है। पूजा की विधि परंपरा और क्षेत्र के अनुसार बदलती है, इसलिए अपने परिवार या पंडित जी की सलाह को प्राथमिकता दें।</p>
        <h2 id="panchang">पंचांग और समय</h2>
        <p>तिथि, नक्षत्र, राहु काल, सूर्योदय और सूर्यास्त के समय गणना से निकाले गए अनुमानित समय हैं। व्रत, त्योहार या मुहूर्त जैसे ज़रूरी फ़ैसलों से पहले अपने पंचांग से मिलान करें।</p>
        <h2 id="istemal">सामग्री का उपयोग</h2>
        <p>आरती, चालीसा और मंत्र पारंपरिक पाठ हैं। साइट का लेआउट, व्याख्या और अनुवाद {SITE_NAME} की मेहनत है। निजी और घरेलू उपयोग, प्रिंट और WhatsApp पर साझा करना ठीक है। थोक में नकल करके दोबारा प्रकाशित न करें।</p>
        <h2 id="badlav">बदलाव</h2>
        <p>हम ये शर्तें समय-समय पर बदल सकते हैं। नया रूप इसी पेज पर दिखेगा। गोपनीयता की जानकारी के लिए गोपनीयता नीति देखें।</p>
      </>
    );
  }
  return (
    <>
      <p>{SITE_NAME} ka upyog karke aap in saral sharton se sehmat hote hain.</p>
      <h2 id="jaankari">Sirf jaankari ke liye</h2>
      <p>Yahan ki saamagri dharmik aur sanskritik jaankari ke liye hai. Puja ki vidhi parampara aur kshetra ke hisaab se badalti hai, isliye apne parivaar ya pandit ji ki salah ko praathmikta dein.</p>
      <h2 id="panchang">Panchang aur samay</h2>
      <p>Tithi, nakshatra, rahu kaal, sunrise aur sunset ke samay ganit se nikaale gaye anumanit samay hain. Vrat, tyohaar ya muhurat jaise zaroori faislon se pehle apne panchang se milaan karein.</p>
      <h2 id="istemal">Saamagri ka upyog</h2>
      <p>Aarti, chalisa aur mantra paramparik paath hain. Site ka layout, vyakhya aur anuvaad {SITE_NAME} ki mehnat hai. Niji aur gharelu upyog, print aur WhatsApp par share karna theek hai. Thok mein nakal karke dobara prakashit na karein.</p>
      <h2 id="badlav">Badlav</h2>
      <p>Hum yeh sharten samay-samay par badal sakte hain. Naya roop isi page par dikhega. Privacy ki jaankari ke liye Privacy Policy dekhein.</p>
    </>
  );
}

export function PrivacyBody({ lang }: { lang: Lang }) {
  if (lang === "hi") {
    return (
      <>
        <p>{SITE_NAME} एक जानकारी देने वाली साइट है। इसमें खाता बनाना, लॉगिन या भुगतान नहीं है, और हम आपसे नाम, फ़ोन या ईमेल नहीं माँगते।</p>
        <h2 id="kya-sahejte-hain">हम क्या सहेजते हैं</h2>
        <ul>
          <li><strong>आपके ब्राउज़र में (सिर्फ़ आपके फ़ोन पर):</strong> थीम (हल्का/गहरा), चुना हुआ शहर, और आपकी सहमति का विकल्प। यह हमें नहीं भेजा जाता।</li>
          <li><strong>ऑफ़लाइन कैश:</strong> जो पेज आप खोलते हैं, वे आपके फ़ोन में सहेजे जाते हैं ताकि बिना सिग्नल के भी खुलें।</li>
          <li><strong>एनालिटिक्स (वैकल्पिक):</strong> अगर आप सहमति देते हैं, तभी गुमनाम Google Analytics 4 चालू होता है ताकि हम जान सकें कि कौन से पेज पढ़े जाते हैं। सहमति न देने पर यह लोड नहीं होता।</li>
        </ul>
        <h2 id="kya-nahi">हम क्या नहीं करते</h2>
        <ul><li>कोई विज्ञापन या विज्ञापन-ट्रैकर नहीं।</li><li>आपका डेटा बेचा या साझा नहीं किया जाता।</li></ul>
        <h2 id="aapke-adhikar">आपके अधिकार</h2>
        <p>भारत के डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम (DPDP) के तहत आप अपने डेटा की जानकारी, सुधार या मिटाने का अनुरोध कर सकते हैं। सहमति का विकल्प आप ब्राउज़र का साइट डेटा साफ़ करके दोबारा चुन सकते हैं। अनुरोध के लिए संपर्क पेज देखें।</p>
      </>
    );
  }
  return (
    <>
      <p>{SITE_NAME} ek jaankari dene waali site hai. Isme account banana, login ya payment nahi hai, aur hum aapse naam, phone ya email nahi maangte.</p>
      <h2 id="kya-sahejte-hain">Hum kya sahejte hain</h2>
      <ul>
        <li><strong>Aapke browser mein (sirf aapke phone par):</strong> theme (halka/gehra), chuna hua shehar, aur aapki sehmati ka vikalp. Yeh humein nahi bheja jaata.</li>
        <li><strong>Offline cache:</strong> Jo pages aap kholte hain, woh aapke phone mein save hote hain taaki bina signal ke bhi khulein.</li>
        <li><strong>Analytics (optional):</strong> Agar aap sehmati dete hain, tabhi anonymous Google Analytics 4 chalu hota hai taaki hum jaan sakein kaun se pages padhe jaate hain. Sehmati na dene par yeh load nahi hota.</li>
      </ul>
      <h2 id="kya-nahi">Hum kya nahi karte</h2>
      <ul><li>Koi ad ya ad-tracker nahi.</li><li>Aapka data becha ya share nahi kiya jaata.</li></ul>
      <h2 id="aapke-adhikar">Aapke adhikar</h2>
      <p>Bharat ke Digital Personal Data Protection (DPDP) Act ke tahat aap apne data ki jaankari, sudhaar ya mitane ka anurodh kar sakte hain. Sehmati ka vikalp aap browser ka site data saaf karke dobara chun sakte hain. Anurodh ke liye Contact page dekhein.</p>
    </>
  );
}

export function ContactBody({ lang }: { lang: Lang }) {
  const hi = lang === "hi";
  return (
    <>
      <p>{hi ? "सुझाव, ग़लती की सूचना या किसी पेज में सुधार के लिए हमें लिखें। आरती या विधि के किसी रूप में अलग परंपरा हो तो वह भी बताएँ, हम समीक्षा करके जोड़ेंगे।" : "Suggestion, galti ki soochna ya kisi page mein sudhaar ke liye humein likhein. Aarti ya vidhi ke kisi roop mein alag parampara ho to woh bhi bataiye, hum review karke jodenge."}</p>
      {EMAIL ? <p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p> : <p className="text-muted">{hi ? "संपर्क ईमेल जल्द यहाँ जोड़ा जाएगा।" : "Contact email jald yahan joda jayega."}</p>}
    </>
  );
}
