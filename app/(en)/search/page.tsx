import { Suspense } from "react";
import { DocView } from "@/components/views";
import { SearchResults } from "@/components/SearchResults";
import { simpleMetadata } from "@/lib/seo";

export const metadata = simpleMetadata("hinglish", { title: "Search", description: "PujaWidhi par aarti, puja vidhi, chalisa aur vrat guide khojein. Hinglish aur Hindi dono mein, naam ya keyword likhkar seedha sahi page tak pahunchein.", slug: "search", index: false });
export default function Page() { return <DocView lang="hinglish" slug="search" title="Search"><Suspense fallback={null}><SearchResults lang="hinglish" /></Suspense></DocView>; }
