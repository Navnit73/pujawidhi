import { HomeView } from "@/components/views";
import { simpleMetadata } from "@/lib/seo";

export const revalidate = 86400;
export const metadata = simpleMetadata("hinglish", {
  title: "PujaWidhi: Aarti, Puja Vidhi aur Path",
  description: "Aarti, puja vidhi, path, chalisa aur vrat guide Hinglish aur Hindi mein. Ghar ki puja ke liye saaf jaankari, reader mode aur printable aarti sheets.",
});
export default function Page() { return <HomeView lang="hinglish" />; }
