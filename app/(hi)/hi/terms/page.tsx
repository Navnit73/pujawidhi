import { DocView } from "@/components/views";
import { TermsBody, LEGAL_TITLE } from "@/components/Legal";
import { simpleMetadata } from "@/lib/seo";

const desc = 'PujaWidhi की उपयोग की शर्तें: सिर्फ़ जानकारी के लिए सामग्री, अनुमानित पंचांग समय, आरती-मंत्र का उपयोग और शर्तों में बदलाव।';
export const metadata = simpleMetadata("hi", { title: LEGAL_TITLE.terms.hi, description: desc, slug: "terms" });
export default function Page() { return <DocView lang="hi" slug="terms" title={LEGAL_TITLE.terms.hi} description={desc} kind="WebPage"><TermsBody lang="hi" /></DocView>; }
