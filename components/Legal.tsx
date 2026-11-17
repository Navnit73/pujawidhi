import type { Lang } from "@/lib/schema";
import { SITE_NAME } from "@/lib/site";

const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

export const LEGAL_TITLE = {
  privacy: { hinglish: "Privacy Policy", hi: "गोपनीयता नीति" },
  contact: { hinglish: "Contact", hi: "संपर्क" },
};

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
