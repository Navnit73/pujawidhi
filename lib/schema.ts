import { z } from "zod";
import { CATEGORY_KEYS } from "./categories";

export const LANGS = ["hinglish", "hi"] as const;
export type Lang = (typeof LANGS)[number];

export const PAGE_TYPES = ["aarti", "vidhi", "path", "chalisa", "stotra", "mantra", "vrat", "guide", "tool", "hub", "city"] as const;
export type PageType = (typeof PAGE_TYPES)[number];

/** Types that need a named reviewer once published (spec: vidhi/path/mantra, plus path-like templates). */
export const REVIEWER_TYPES: PageType[] = ["vidhi", "path", "mantra", "chalisa", "stotra"];

export const frontmatterSchema = z.object({
  title: z.string().min(1).max(60),
  description: z.string().min(140).max(155),
  keyword: z.string().min(1),
  secondary: z.array(z.string()).default([]),
  category: z.enum(CATEGORY_KEYS as [string, ...string[]]),
  type: z.enum(PAGE_TYPES),
  deity: z.string().min(1),
  lang: z.enum(LANGS),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "updated must be YYYY-MM-DD"),
  reviewer: z.string().optional(),
  priority: z.enum(["P1", "P2", "P3", "P4", "V"]),
  related: z.array(z.string()).default([]),
  /** stub = placeholder (noindex); review = written, awaiting reviewer sign-off (noindex); published = live. */
  status: z.enum(["stub", "review", "published"]).default("stub"),
  /** Local pages only: flip to true once verified data is in. */
  indexable: z.boolean().optional(),
  /** Google Keyword Planner bucket from the plan; 0 = not in CSV (validate first). */
  volume: z.number().default(0),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;
