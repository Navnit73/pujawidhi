/**
 * npm run publish:pages -- --reviewer "Pt. Name" [--category ganesh-ji] [--slug ganesh-chalisa]
 * Flips status "review" -> "published" and sets the reviewer on both language files.
 * Only use after the named reviewer has actually proofread the pages. /local pages also need `indexable: true` to be indexed.
 */
import fs from "node:fs";
import path from "node:path";

const arg = (k: string) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : undefined; };
const reviewer = arg("reviewer"); const category = arg("category"); const slug = arg("slug");
if (!reviewer) { console.error('Need --reviewer "Pt. Name"'); process.exit(1); }
let n = 0;
for (const cat of fs.readdirSync("content")) {
  if (category && cat !== category) continue;
  for (const f of fs.readdirSync(path.join("content", cat))) {
    if (slug && !f.startsWith(`${slug}.`)) continue;
    const p = path.join("content", cat, f);
    let s = fs.readFileSync(p, "utf8");
    if (!s.includes('status: "review"')) continue;
    s = s.replace(/^reviewer: .*\n/m, "").replace('status: "review"', `reviewer: ${JSON.stringify(reviewer)}\nstatus: "published"`);
    fs.writeFileSync(p, s); n++;
  }
}
console.log(`published ${n} files`);
