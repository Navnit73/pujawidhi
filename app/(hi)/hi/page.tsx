import { HomeView } from "@/components/views";
import { simpleMetadata } from "@/lib/seo";

export const revalidate = 86400;
export const metadata = simpleMetadata("hi", {
  title: "PujaWidhi: आरती, पूजा विधि और पाठ",
  description: "आरती, पूजा विधि, पाठ, चालीसा और व्रत गाइड हिंदी और हिंग्लिश में। घर की पूजा के लिए साफ़ जानकारी, रीडर मोड और प्रिंट करने योग्य आरती शीट।",
});
export default function Page() { return <HomeView lang="hi" />; }
