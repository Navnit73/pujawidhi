import { DocView } from "@/components/views";
import { LEGAL_TITLE, PrivacyBody } from "@/components/Legal";
import { simpleMetadata } from "@/lib/seo";

const desc = { hinglish: "PujaWidhi privacy policy: hum kya sahejte hain, analytics sirf sehmati ke baad, koi ads nahi, aur DPDP Act ke tahat aapke adhikar. Saaf aur seedhi bhasha mein.", hi: "PujaWidhi गोपनीयता नीति: हम क्या सहेजते हैं, एनालिटिक्स सिर्फ़ सहमति के बाद, कोई विज्ञापन नहीं, और DPDP अधिनियम के तहत आपके अधिकार, सरल भाषा में।" };
export const metadata = simpleMetadata("hinglish", { title: LEGAL_TITLE.privacy.hinglish, description: desc.hinglish, slug: "privacy" });
export default function Page() { return <DocView lang="hinglish" slug="privacy" title={LEGAL_TITLE.privacy.hinglish} description={desc.hinglish} kind="WebPage"><PrivacyBody lang="hinglish" /></DocView>; }
