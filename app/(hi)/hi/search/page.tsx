import { Suspense } from "react";
import { DocView } from "@/components/views";
import { SearchResults } from "@/components/SearchResults";
import { simpleMetadata } from "@/lib/seo";

export const metadata = simpleMetadata("hi", { title: "खोजें", description: "PujaWidhi पर आरती, पूजा विधि, चालीसा और व्रत गाइड खोजें। हिंदी और हिंग्लिश दोनों में, नाम या कीवर्ड लिखकर सीधे सही पेज तक पहुँचें।", slug: "search", index: false });
export default function Page() { return <DocView lang="hi" slug="search" title="खोजें"><Suspense fallback={null}><SearchResults lang="hi" /></Suspense></DocView>; }
