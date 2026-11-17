import { DocView } from "@/components/views";
import { AboutBody, LEGAL_TITLE } from "@/components/Legal";
import { simpleMetadata } from "@/lib/seo";

const desc = 'PujaWidhi क्या है: हिंदी और हिंग्लिश में आरती, पूजा विधि और पाठ। पेज की समीक्षा कैसे होती है, परंपरा का फ़र्क़ और ग़लती बताने का तरीक़ा।';
export const metadata = simpleMetadata("hi", { title: LEGAL_TITLE.about.hi, description: desc, slug: "about" });
export default function Page() { return <DocView lang="hi" slug="about" title={LEGAL_TITLE.about.hi} description={desc} kind="AboutPage"><AboutBody lang="hi" /></DocView>; }
