export type CategoryKey =
  | "durga-maa"
  | "navratri-devi"
  | "ganesh-ji"
  | "shiv-ji"
  | "hanuman-ram"
  | "lakshmi-vishnu"
  | "krishna-radha"
  | "other-devi-devta"
  | "surya-shani-navgraha"
  | "puja-basics"
  | "local";

export type IconKey =
  | "trishul"
  | "diya"
  | "ganesh"
  | "shiv"
  | "gada"
  | "lotus"
  | "flute"
  | "bell"
  | "sun"
  | "kalash"
  | "pin";

export interface Category {
  key: CategoryKey;
  accent: string;
  icon: IconKey;
  deity: string;
  name: { hinglish: string; hi: string };
  short: { hinglish: string; hi: string };
}

export const CATEGORIES: Category[] = [
  { key: "durga-maa", accent: "#B3132B", icon: "trishul", deity: "durga",
    name: { hinglish: "Durga Maa & Durga Puja", hi: "दुर्गा माँ और दुर्गा पूजा" },
    short: { hinglish: "Aarti, puja vidhi, chandi path aur pandal guide", hi: "आरती, पूजा विधि, चंडी पाठ और पंडाल गाइड" } },
  { key: "navratri-devi", accent: "#C2410C", icon: "diya", deity: "devi",
    name: { hinglish: "Navratri & Devi Mata", hi: "नवरात्रि और देवी माता" },
    short: { hinglish: "Navratri vidhi, kalash sthapana, vrat aur stotra", hi: "नवरात्रि विधि, कलश स्थापना, व्रत और स्तोत्र" } },
  { key: "ganesh-ji", accent: "#E8731A", icon: "ganesh", deity: "ganesh",
    name: { hinglish: "Ganesh Ji", hi: "गणेश जी" },
    short: { hinglish: "Ganesh aarti, puja vidhi, sthapana aur chaturthi", hi: "गणेश आरती, पूजा विधि, स्थापना और चतुर्थी" } },
  { key: "shiv-ji", accent: "#3B4A8A", icon: "shiv", deity: "shiv",
    name: { hinglish: "Shiv Ji", hi: "शिव जी" },
    short: { hinglish: "Shiv aarti, abhishek, somvar vrat aur mantra", hi: "शिव आरती, अभिषेक, सोमवार व्रत और मंत्र" } },
  { key: "hanuman-ram", accent: "#D9480F", icon: "gada", deity: "hanuman",
    name: { hinglish: "Hanuman Ji & Ram Ji", hi: "हनुमान जी और राम जी" },
    short: { hinglish: "Chalisa, sunderkand, Ramayan path aur aarti", hi: "चालीसा, सुंदरकांड, रामायण पाठ और आरती" } },
  { key: "lakshmi-vishnu", accent: "#B7791F", icon: "lotus", deity: "lakshmi",
    name: { hinglish: "Lakshmi, Vishnu & Tulsi", hi: "लक्ष्मी, विष्णु और तुलसी" },
    short: { hinglish: "Lakshmi puja, Satyanarayan, Ekadashi aur Tulsi", hi: "लक्ष्मी पूजा, सत्यनारायण, एकादशी और तुलसी" } },
  { key: "krishna-radha", accent: "#1E6FA8", icon: "flute", deity: "krishna",
    name: { hinglish: "Krishna & Radha", hi: "कृष्ण और राधा" },
    short: { hinglish: "Janmashtami, Laddu Gopal seva, Gita aur aarti", hi: "जन्माष्टमी, लड्डू गोपाल सेवा, गीता और आरती" } },
  { key: "other-devi-devta", accent: "#7C3AED", icon: "bell", deity: "other",
    name: { hinglish: "Other Devi-Devta & Vrat", hi: "अन्य देवी-देवता और व्रत" },
    short: { hinglish: "Saraswati, Santoshi Mata, Gayatri, Teej aur Karwa Chauth", hi: "सरस्वती, संतोषी माता, गायत्री, तीज और करवा चौथ" } },
  { key: "surya-shani-navgraha", accent: "#A16207", icon: "sun", deity: "surya",
    name: { hinglish: "Surya, Shani, Navgraha & Pitru", hi: "सूर्य, शनि, नवग्रह और पितृ" },
    short: { hinglish: "Chhath, Surya arghya, Shani puja aur Pitru Paksha", hi: "छठ, सूर्य अर्घ्य, शनि पूजा और पितृ पक्ष" } },
  { key: "puja-basics", accent: "#3F6B2B", icon: "kalash", deity: "basics",
    name: { hinglish: "Puja Basics, Samagri & Tools", hi: "पूजा की बुनियादी बातें, सामग्री और टूल" },
    short: { hinglish: "Samagri list, niyam, panchang, reader mode aur print sheet", hi: "सामग्री सूची, नियम, पंचांग, रीडर मोड और प्रिंट शीट" } },
  { key: "local", accent: "#0F766E", icon: "pin", deity: "local",
    name: { hinglish: "Local & Craft (Pandal, Murti)", hi: "स्थानीय और शिल्प (पंडाल, मूर्ति)" },
    short: { hinglish: "Shahar ke pandal guide aur murti banane ke idea", hi: "शहर के पंडाल गाइड और मूर्ति बनाने के आइडिया" } },
];

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.key, c])) as Record<CategoryKey, Category>;

export const CATEGORY_KEYS = CATEGORIES.map((c) => c.key);

export function isCategory(k: string): k is CategoryKey {
  return k in CATEGORY_MAP;
}
