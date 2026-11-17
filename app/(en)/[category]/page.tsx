import { categoryParams, hubMeta, renderHub } from "@/lib/routes";

export const dynamicParams = false;
export const generateStaticParams = categoryParams;
export const generateMetadata = ({ params }: { params: Promise<{ category: string }> }) => hubMeta("hinglish", params);
export default function Page({ params }: { params: Promise<{ category: string }> }) { return renderHub("hinglish", params); }
