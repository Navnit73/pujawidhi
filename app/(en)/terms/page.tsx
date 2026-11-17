import { DocView } from "@/components/views";
import { TermsBody, LEGAL_TITLE } from "@/components/Legal";
import { simpleMetadata } from "@/lib/seo";

const desc = 'PujaWidhi ki upyog ki sharten: sirf jaankari ke liye saamagri, anumanit panchang samay, aarti-mantra ka upyog aur sharton mein badlav.';
export const metadata = simpleMetadata("hinglish", { title: LEGAL_TITLE.terms.hinglish, description: desc, slug: "terms" });
export default function Page() { return <DocView lang="hinglish" slug="terms" title={LEGAL_TITLE.terms.hinglish} description={desc} kind="WebPage"><TermsBody lang="hinglish" /></DocView>; }
