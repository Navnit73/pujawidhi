/** Heading -> id. Unicode-aware so Devanagari headings keep their combining marks. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractHeadings(source: string): { id: string; text: string }[] {
  const out: { id: string; text: string }[] = [];
  let inFence = false;
  for (const line of source.split("\n")) {
    if (line.trim().startsWith("```")) inFence = !inFence;
    if (inFence) continue;
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (m) out.push({ id: slugify(m[1]), text: m[1] });
  }
  return out;
}
