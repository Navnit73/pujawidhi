export function JsonLd({ data }: { data: unknown }) {
  // Content is generated from our own frontmatter; "<" is escaped to keep it inert inside the script tag.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
