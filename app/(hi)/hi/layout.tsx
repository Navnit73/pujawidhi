import "../../globals.css";
import { fontVars } from "@/lib/fonts-hi";
import { RootShell, rootMetadata, rootViewport } from "@/lib/root";

export const metadata = rootMetadata;
export const viewport = rootViewport;
export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="hi" fonts={fontVars}>{children}</RootShell>;
}
