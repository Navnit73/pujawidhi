import { DocView } from "@/components/views";
import { AboutBody, LEGAL_TITLE } from "@/components/Legal";
import { simpleMetadata } from "@/lib/seo";

const desc = "PujaWidhi kya hai: Hindi aur Hinglish mein aarti, puja vidhi aur path. Pages ka review kaise hota hai, parampara ka farq aur galti batane ka tareeka.";
export const metadata = simpleMetadata("hinglish", { title: LEGAL_TITLE.about.hinglish, description: desc, slug: "about" });
export default function Page() { return <DocView lang="hinglish" slug="about" title={LEGAL_TITLE.about.hinglish} description={desc} kind="AboutPage"><AboutBody lang="hinglish" /></DocView>; }
