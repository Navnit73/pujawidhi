import React from "react";
import { slugify } from "@/lib/slug";
import type { PageMeta } from "@/lib/content";
import { REVIEWER_TYPES, type Lang } from "@/lib/schema";
import { pathFor } from "@/lib/site";
import { AartiLyrics, Arth, Verse } from "./AartiLyrics";
import { FAQ, Mantra, MdLink, Q, QuickAnswer, Step, Steps } from "./Basic";
import { AartiIndex, FestivalCalendar } from "./Server";
import { Samagri } from "../Samagri";
import { PrintSheet } from "../tools/PrintSheet";
import { ReaderPicker } from "../tools/ReaderPicker";
import { PanchangTool, RahuKaalTool } from "../tools/Panchang";
import { Reviewed } from "../Reviewed";
import { ShareWhatsApp } from "../ShareWhatsApp";
import { RelatedGrid } from "../RelatedGrid";

const text = (c: React.ReactNode): string => React.Children.toArray(c).map((x) => (typeof x === "string" || typeof x === "number" ? String(x) : React.isValidElement(x) ? text((x.props as { children?: React.ReactNode }).children) : "")).join("");

/** Components available inside MDX, with page context (lang, page) bound in. */
export function mdxComponents(lang: Lang, page: PageMeta) {
  const path = pathFor(lang, page.category, page.slug);
  return {
    h2: (p: React.HTMLAttributes<HTMLHeadingElement>) => <h2 id={slugify(text(p.children))} {...p} />,
    h3: (p: React.HTMLAttributes<HTMLHeadingElement>) => <h3 id={slugify(text(p.children))} {...p} />,
    a: MdLink,
    AartiLyrics: (p: { children?: React.ReactNode }) => <AartiLyrics {...p} title={page.title} lang={lang} />,
    Verse, Arth, Steps, Step, Mantra, QuickAnswer, FAQ, Q,
    Samagri: (p: React.ComponentProps<typeof Samagri>) => <Samagri {...p} lang={lang} title={page.title} />,
    PrintSheet: () => <PrintSheet lang={lang} />,
    ReaderPicker: () => <ReaderPicker lang={lang} />,
    RahuKaalTool: () => <RahuKaalTool lang={lang} />,
    PanchangTool: () => <PanchangTool lang={lang} />,
    FestivalCalendar: () => <FestivalCalendar lang={lang} />,
    AartiIndex: () => <AartiIndex lang={lang} />,
    Reviewed: () => <Reviewed lang={lang} reviewer={page.reviewer} updated={page.updated} needsReviewer={REVIEWER_TYPES.includes(page.type)} />,
    ShareWhatsApp: () => <ShareWhatsApp lang={lang} path={path} title={page.title} />,
    RelatedGrid: () => <RelatedGrid lang={lang} page={page} />,
  };
}
