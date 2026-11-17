import { pageMeta, pageParams, renderPage } from "@/lib/routes";

export const dynamicParams = false;
export const generateStaticParams = pageParams;
export const generateMetadata = ({ params }: { params: Promise<{ category: string; slug: string }> }) => pageMeta("hinglish", params);
export default function Page({ params }: { params: Promise<{ category: string; slug: string }> }) { return renderPage("hinglish", params); }
