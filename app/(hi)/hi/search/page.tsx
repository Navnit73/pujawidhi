import { Suspense } from "react";
import { DocView } from "@/components/views";
import { SearchResults } from "@/components/SearchResults";
import { simpleMetadata } from "@/lib/seo";

export const metadata = simpleMetadata("hi", { title: "खोजें", description: "PujaWidhi search", slug: "search", index: false });
export default function Page() { return <DocView lang="hi" slug="search" title="खोजें"><Suspense fallback={null}><SearchResults lang="hi" /></Suspense></DocView>; }
