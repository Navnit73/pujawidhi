/**
 * Seeds /content with MDX stubs (hinglish + hi) from data/pages.manifest.txt.
 * Never overwrites an existing file unless --force is passed (pilot pages are hand-written).
 */
import fs from "node:fs";
import path from "node:path";
import { CATEGORY_MAP, type CategoryKey } from "../lib/categories";

const ROOT = process.cwd();
const FORCE = process.argv.includes("--force");
const UPDATED = "2026-11-17";

interface Row { category: CategoryKey; slug: string; keyword: string; volume: number; priority: string; type: string; title: string; hiTitle: string }

const rows: Row[] = fs.readFileSync(path.join(ROOT, "data/pages.manifest.txt"), "utf8")
  .split("\n").filter((l) => l.trim() && !l.startsWith("#")).map((l) => {
    const [category, slug, keyword, volume, priority, type, title, hiTitle] = l.split("|");
    return { category: category as CategoryKey, slug, keyword, volume: Number(volume), priority, type, title, hiTitle };
  });

const SECONDARY: Record<string, string[]> = {
  "durga-ji-ki-aarti": ["durga mata ki aarti", "maa durga ki aarti", "durga devi ki aarti", "maa ambe ki aarti", "aarti durga maa"],
  "ganesh-ji-ki-aarti": ["aarti ganesh", "aarti ganesh ji ki", "aarti ganesh bhagwan ki", "jai ganesh aarti", "jai ganesha jai ganesha deva", "aarti shri ganesh ji ki"],
  "ganpati-aarti-sukhkarta-dukhharta": ["aarti ganpati ji ki"],
  "ganesh-puja-vidhi": ["ganesh pooja", "ganesh pujan", "ganapati puja", "ganapathi puja", "ganapathy puja", "vinayagar pooja"],
  "vinayak-puja-vidhi": ["vinayaka puja", "vinayagar chaturthi puja"],
  "durga-puja": ["durga festival", "pooja durga", "durga maa puja", "durga mata puja"],
  "durga-puja-pandal-near-me": ["durga pandal near me", "pandal near me", "durga puja near me"],
  "ganesh-pujan-samagri-list": ["ganesh pujan"],
  "kolkata-durga-puja-pandal": ["durga puja pandal"],
};
const RELATED: Record<string, string[]> = {
  "durga-ji-ki-aarti": ["durga-chalisa", "durga-puja-samagri-list"],
  "ganesh-ji-ki-aarti": ["ganesh-chalisa", "ganesh-pujan-samagri-list"],
  "ganesh-puja-vidhi": ["ganesh-pujan-samagri-list", "ganesh-ji-ki-aarti"],
  "durga-puja-at-home-vidhi": ["durga-puja-samagri-list", "durga-ji-ki-aarti"],
  "aarti-sangrah": ["aarti-reader-mode", "printable-aarti-sheets"],
  "puja-samagri-master-list": ["daily-puja-at-home-vidhi", "durga-puja-samagri-list"],
};

const DEITY_PREFIX: [string, string][] = [
  ["ram-", "ram"], ["sunderkand", "ram"], ["akhand-ramayan", "ram"], ["ramcharitmanas", "ram"], ["vishnu", "vishnu"], ["satyanarayan", "vishnu"],
  ["ekadashi", "vishnu"], ["dev-uthani", "tulsi"], ["tulsi", "tulsi"], ["guruvar", "vishnu"], ["shri-suktam", "lakshmi"], ["saraswati", "saraswati"],
  ["santoshi", "santoshi"], ["vaishno", "vaishno-devi"], ["gayatri", "gayatri"], ["hartalika", "parvati"], ["karwa", "parvati"], ["sai-baba", "sai-baba"],
  ["vyasa", "guru"], ["surya", "surya"], ["chhath", "surya"], ["shani", "shani"], ["navgraha", "navgraha"], ["pitru", "pitru"],
  ["kali", "kali"], ["mahalaya", "durga"], ["mangala-gauri", "parvati"], ["janmashtami", "krishna"], ["laddu-gopal", "krishna"], ["radha", "radha"],
  ["bhagavad", "krishna"], ["hare-krishna", "krishna"], ["ganpati", "ganesh"], ["sankashti", "ganesh"], ["vinayak", "ganesh"], ["lakshmi-ganesh", "lakshmi"],
  ["thermocol-durga", "durga"], ["eco-friendly-mitti-ganesh", "ganesh"], ["mumbai-ganpati", "ganesh"], ["pune-ganpati", "ganesh"],
];
const deityOf = (r: Row) => DEITY_PREFIX.find(([p]) => r.slug.startsWith(p))?.[1] ?? CATEGORY_MAP[r.category].deity;

const BLURB: Record<string, { hinglish: string[]; hi: string[] }> = {
  aarti: { hinglish: ["Devanagari aur Hinglish lyrics, arth aur reader mode ke saath."], hi: ["देवनागरी और हिंग्लिश बोल, अर्थ और रीडर मोड के साथ।"] },
  vidhi: { hinglish: ["Samagri, mantra aur step-by-step vidhi saaf bhasha mein."], hi: ["सामग्री, मंत्र और स्टेप-बाय-स्टेप विधि साफ़ भाषा में।"] },
  path: { hinglish: ["Path ki vidhi, niyam aur Hindi arth ke saath."], hi: ["पाठ की विधि, नियम और हिंदी अर्थ के साथ।"] },
  chalisa: { hinglish: ["Poora paath, Hindi arth aur jaap ki vidhi ke saath."], hi: ["पूरा पाठ, हिंदी अर्थ और जाप की विधि के साथ।"] },
  stotra: { hinglish: ["Poora paath, Hindi arth aur jaap ki vidhi ke saath."], hi: ["पूरा पाठ, हिंदी अर्थ और जाप की विधि के साथ।"] },
  mantra: { hinglish: ["Mantra, arth aur jaap ki saral vidhi ke saath."], hi: ["मंत्र, अर्थ और जाप की सरल विधि के साथ।"] },
  vrat: { hinglish: ["Vrat ke niyam, katha aur puja vidhi ke saath."], hi: ["व्रत के नियम, कथा और पूजा विधि के साथ।"] },
  guide: { hinglish: ["Saaf, vyavharik guide Hinglish aur Hindi mein."], hi: ["साफ़, व्यावहारिक गाइड हिंग्लिश और हिंदी में।"] },
  tool: { hinglish: ["Seedha kaam karne wala tool, mobile par bhi aasan."], hi: ["सीधा काम करने वाला टूल, मोबाइल पर भी आसान।"] },
  hub: { hinglish: ["Sabhi zaroori pages ek hi jagah."], hi: ["सभी ज़रूरी पेज एक ही जगह।"] },
  city: { hinglish: ["Sirf verified pandal details, samay aur map link ke saath."], hi: ["सिर्फ़ जाँची हुई पंडाल जानकारी, समय और मैप लिंक के साथ।"] },
};
const FILL = {
  hinglish: (kw: string) => [
    `${kw} ke baare mein jaankari.`, "Hinglish aur Hindi mein.", "Prachlit roop mein, saral bhasha mein.", "Tithi ke liye panchang se milaan karein.",
    "Ghar par karne layak saaf jaankari.", "Mobile par padhne mein aasan.", "Parampara ke hisaab se antar bhi bataye gaye hain.",
  ],
  hi: (_kw: string) => [
    "हिंग्लिश और हिंदी में उपलब्ध।", "प्रचलित रूप, सरल भाषा में।", "तिथि के लिए पंचांग से मिलान करें।", "घर पर करने लायक साफ़ जानकारी।",
    "मोबाइल पर पढ़ने में आसान।", "परंपरा के अनुसार अंतर भी बताए गए हैं।", "पूरी जानकारी एक ही पेज पर।",
  ],
};

/** Pick the subset of optional parts whose joined length lands in 140-155 chars. */
function fitDescription(base: string, optional: string[]): string {
  let best: { s: string; n: number } | null = null;
  const n = optional.length;
  for (let mask = 0; mask < 1 << n; mask++) {
    const parts = [base, ...optional.filter((_, i) => mask & (1 << i))];
    const s = parts.join(" ");
    // prefer more parts (richer text); first match wins ties
    if (s.length >= 140 && s.length <= 155 && (!best || parts.length > best.n)) best = { s, n: parts.length };
  }
  if (!best) throw new Error(`Cannot fit description for: ${base}`);
  return best.s;
}

const H = {
  hinglish: {
    lyrics: "Aarti ke bol", arth: "Arth (meaning)", when: "Kab aur kaise gayein", text: "Poora paath", vidhi: "Vidhi: kab, kitni baar aur kaise", quick: "Seedha jawab",
    samagri: "Samagri list", steps: "Vidhi step-by-step", mistakes: "Aam galtiyan aur niyam", sig: "Mahatva aur katha", faq: "FAQ", sources: "Sources aur variants",
    overview: "Poori jaankari", tool: "Tool", about: "Is tool ke baare mein", verified: "Verified details", craft: "Kaise banayein", todo: "TODO: ",
  },
  hi: {
    lyrics: "आरती के बोल", arth: "अर्थ", when: "कब और कैसे गाएँ", text: "पूरा पाठ", vidhi: "विधि: कब, कितनी बार और कैसे", quick: "सीधा जवाब",
    samagri: "सामग्री सूची", steps: "विधि स्टेप-बाय-स्टेप", mistakes: "आम ग़लतियाँ और नियम", sig: "महत्व और कथा", faq: "अक्सर पूछे जाने वाले सवाल", sources: "स्रोत और भिन्नताएँ",
    overview: "पूरी जानकारी", tool: "टूल", about: "इस टूल के बारे में", verified: "जाँची हुई जानकारी", craft: "कैसे बनाएँ", todo: "TODO: ",
  },
} as const;

const TOOL_BODY: Record<string, string> = {
  "printable-aarti-sheets": "<PrintSheet />",
  "aarti-reader-mode": "<ReaderPicker />",
  "aaj-ka-rahu-kaal": "<RahuKaalTool />",
  "aaj-ka-panchang-shubh-muhurat": "<PanchangTool />",
  "hindu-festival-calendar-2027": "<FestivalCalendar />",
};

function body(r: Row, lang: "hinglish" | "hi"): string {
  const h = H[lang];
  const todo = (what: string) => `${h.todo}${what}`;
  const faq = `## ${h.faq}\n\n<FAQ>\n  <Q q="${todo("question 1")}">${todo("answer")}</Q>\n</FAQ>\n`;
  const lead = `{/* TODO(content): write this page. Template: ${r.type} (plan section 5). Keyword: ${r.keyword}. Volume bucket: ${r.volume || "not in CSV, validate first"}. */}\n\n`;
  switch (r.type) {
    case "aarti":
      return `${lead}## ${h.lyrics}\n\n<AartiLyrics>\n  {/* <Verse dev={\`\`} rom={\`\`}><Arth>${todo("meaning")}</Arth></Verse> */}\n</AartiLyrics>\n\n## ${h.arth}\n\n${todo("arth")}\n\n## ${h.when}\n\n${todo("day, time, diya and ghanti")}\n\n${faq}\n## ${h.sources}\n\n${todo("verify against two printed sources; note the common version and major variants")}\n`;
    case "path": case "chalisa": case "stotra": case "mantra":
      return `${lead}## ${h.text}\n\n<AartiLyrics>\n  {/* <Verse dev={\`\`} rom={\`\`}><Arth>${todo("meaning")}</Arth></Verse> */}\n</AartiLyrics>\n\n## ${h.arth}\n\n${todo("line-by-line arth")}\n\n## ${h.vidhi}\n\n${todo("count, day, asan")}\n\n${faq}\n## ${h.sources}\n\n${todo("source, variants, audio only if licensed")}\n`;
    case "vidhi": case "vrat":
      return `${lead}## ${h.quick}\n\n<QuickAnswer rows={[{ label: "${todo("muhurat / day")}", value: "${todo("verify from panchang")}" }]} />\n\n## ${h.samagri}\n\n<Samagri items={[{ name: "${todo("item")}", qty: "1" }]} />\n\n## ${h.steps}\n\n<Steps>\n  <Step title="${todo("step 1")}">${todo("instructions")}</Step>\n</Steps>\n\n## ${h.mistakes}\n\n${todo("common mistakes and niyam")}\n\n## ${h.sig}\n\n${todo("short significance, only if relevant")}\n\n${faq}`;
    case "tool":
      return `${lead}## ${h.tool}\n\n${TOOL_BODY[r.slug] ?? todo("working tool above the fold")}\n\n## ${h.about}\n\n${todo("short explainer")}\n`;
    case "city":
      return `${lead}## ${h.verified}\n\n${todo("name, area, timings, map link, last-checked date. Set indexable: true only when all are verified.")}\n\n${faq}`;
    case "hub":
      return `${lead}## ${h.overview}\n\n${todo("hub overview")}\n\n${faq}`;
    default:
      return `${lead}## ${h.quick}\n\n<QuickAnswer rows={[{ label: "${todo("label")}", value: "${todo("value")}" }]} />\n\n## ${h.overview}\n\n${todo("guide body")}\n\n${faq}`;
  }
}

const q = (s: string) => JSON.stringify(s);
function frontmatter(r: Row, lang: "hinglish" | "hi"): string {
  const title = lang === "hi" ? r.hiTitle : r.title;
  const base = `${title}.`;
  const blurb = BLURB[r.type][lang][0];
  const desc = lang === "hi"
    ? fitDescription(base, [blurb, ...FILL.hi(r.keyword)])
    : fitDescription(base, [blurb, ...FILL.hinglish(r.keyword)]);
  const sec = SECONDARY[r.slug] ?? [];
  const rel = RELATED[r.slug] ?? [];
  return [
    "---",
    `title: ${q(title)}`,
    `description: ${q(desc)}`,
    `keyword: ${q(r.keyword)}`,
    `secondary: [${sec.map(q).join(", ")}]`,
    `category: ${q(r.category)}`,
    `type: ${q(r.type)}`,
    `deity: ${q(deityOf(r))}`,
    `lang: ${q(lang)}`,
    `updated: ${q(UPDATED)}`,
    `priority: ${q(r.priority)}`,
    `related: [${rel.map(q).join(", ")}]`,
    `volume: ${r.volume}`,
    `status: "stub"`,
    "---",
    "",
  ].join("\n");
}

let created = 0, skipped = 0;
for (const r of rows) {
  fs.mkdirSync(path.join(ROOT, "content", r.category), { recursive: true });
  for (const lang of ["hinglish", "hi"] as const) {
    const file = path.join(ROOT, "content", r.category, `${r.slug}.${lang}.mdx`);
    if (fs.existsSync(file) && !FORCE) { skipped++; continue; }
    fs.writeFileSync(file, frontmatter(r, lang) + "\n" + body(r, lang));
    created++;
  }
}
console.log(`manifest rows: ${rows.length} | files created: ${created} | skipped (exist): ${skipped}`);
