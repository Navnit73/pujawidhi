export interface City { key: string; lat: number; lon: number; name: { hinglish: string; hi: string } }

/** Top 30 Indian cities (approximate city-centre coordinates). All times are IST. */
export const CITIES: City[] = [
  { key: "delhi", lat: 28.61, lon: 77.21, name: { hinglish: "Delhi", hi: "दिल्ली" } },
  { key: "mumbai", lat: 19.08, lon: 72.88, name: { hinglish: "Mumbai", hi: "मुंबई" } },
  { key: "kolkata", lat: 22.57, lon: 88.36, name: { hinglish: "Kolkata", hi: "कोलकाता" } },
  { key: "chennai", lat: 13.08, lon: 80.27, name: { hinglish: "Chennai", hi: "चेन्नई" } },
  { key: "bengaluru", lat: 12.97, lon: 77.59, name: { hinglish: "Bengaluru", hi: "बेंगलुरु" } },
  { key: "hyderabad", lat: 17.39, lon: 78.49, name: { hinglish: "Hyderabad", hi: "हैदराबाद" } },
  { key: "ahmedabad", lat: 23.02, lon: 72.57, name: { hinglish: "Ahmedabad", hi: "अहमदाबाद" } },
  { key: "pune", lat: 18.52, lon: 73.86, name: { hinglish: "Pune", hi: "पुणे" } },
  { key: "jaipur", lat: 26.91, lon: 75.79, name: { hinglish: "Jaipur", hi: "जयपुर" } },
  { key: "lucknow", lat: 26.85, lon: 80.95, name: { hinglish: "Lucknow", hi: "लखनऊ" } },
  { key: "kanpur", lat: 26.45, lon: 80.35, name: { hinglish: "Kanpur", hi: "कानपुर" } },
  { key: "nagpur", lat: 21.15, lon: 79.09, name: { hinglish: "Nagpur", hi: "नागपुर" } },
  { key: "indore", lat: 22.72, lon: 75.86, name: { hinglish: "Indore", hi: "इंदौर" } },
  { key: "bhopal", lat: 23.26, lon: 77.41, name: { hinglish: "Bhopal", hi: "भोपाल" } },
  { key: "patna", lat: 25.59, lon: 85.14, name: { hinglish: "Patna", hi: "पटना" } },
  { key: "ludhiana", lat: 30.9, lon: 75.86, name: { hinglish: "Ludhiana", hi: "लुधियाना" } },
  { key: "agra", lat: 27.18, lon: 78.01, name: { hinglish: "Agra", hi: "आगरा" } },
  { key: "varanasi", lat: 25.32, lon: 82.97, name: { hinglish: "Varanasi", hi: "वाराणसी" } },
  { key: "surat", lat: 21.17, lon: 72.83, name: { hinglish: "Surat", hi: "सूरत" } },
  { key: "visakhapatnam", lat: 17.69, lon: 83.22, name: { hinglish: "Visakhapatnam", hi: "विशाखापत्तनम" } },
  { key: "thane", lat: 19.22, lon: 72.98, name: { hinglish: "Thane", hi: "ठाणे" } },
  { key: "vadodara", lat: 22.31, lon: 73.18, name: { hinglish: "Vadodara", hi: "वडोदरा" } },
  { key: "ghaziabad", lat: 28.67, lon: 77.45, name: { hinglish: "Ghaziabad", hi: "गाज़ियाबाद" } },
  { key: "ranchi", lat: 23.34, lon: 85.31, name: { hinglish: "Ranchi", hi: "रांची" } },
  { key: "guwahati", lat: 26.14, lon: 91.74, name: { hinglish: "Guwahati", hi: "गुवाहाटी" } },
  { key: "chandigarh", lat: 30.73, lon: 76.78, name: { hinglish: "Chandigarh", hi: "चंडीगढ़" } },
  { key: "coimbatore", lat: 11.02, lon: 76.96, name: { hinglish: "Coimbatore", hi: "कोयंबटूर" } },
  { key: "kochi", lat: 9.93, lon: 76.27, name: { hinglish: "Kochi", hi: "कोच्चि" } },
  { key: "bhubaneswar", lat: 20.3, lon: 85.82, name: { hinglish: "Bhubaneswar", hi: "भुवनेश्वर" } },
  { key: "dehradun", lat: 30.32, lon: 78.03, name: { hinglish: "Dehradun", hi: "देहरादून" } },
];

export const DEFAULT_CITY = "delhi";
export const cityByKey = (k: string | null | undefined) => CITIES.find((c) => c.key === k) ?? CITIES[0];
