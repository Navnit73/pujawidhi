import { DocView } from "@/components/views";
import { ContactBody, LEGAL_TITLE } from "@/components/Legal";
import { simpleMetadata } from "@/lib/seo";

const desc = { hinglish: "PujaWidhi se sampark karein: kisi page mein galti, aarti ya vidhi ke alag roop ya sudhaar ka suggestion bhejein. Hum review karke jodenge.", hi: "PujaWidhi से संपर्क करें: किसी पेज में ग़लती, आरती या विधि के अलग रूप या सुधार का सुझाव भेजें। हम समीक्षा करके जोड़ेंगे और पेज अपडेट करेंगे।" };
export const metadata = simpleMetadata("hinglish", { title: "Contact PujaWidhi: Sudhaar ya Galti Batayein", description: desc.hinglish, slug: "contact" });
export default function Page() { return <DocView lang="hinglish" slug="contact" title={LEGAL_TITLE.contact.hinglish} description={desc.hinglish} kind="ContactPage"><ContactBody lang="hinglish" /></DocView>; }
