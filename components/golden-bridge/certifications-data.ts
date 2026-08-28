/**
 * Third-party test reports and technical documentation for the stone paper /
 * PP woven composite bag. Every figure here is transcribed from the linked
 * PDF, which stays the authoritative source, so the summary and the download
 * never drift apart.
 */

export interface CertificationResult {
  label: string
  value: string
  note?: string
}

export interface Certification {
  id: string
  issuer: string
  category: string
  title: string
  reportNumber: string
  issueDate: string
  /** Machine-readable form of issueDate, for <time dateTime>. */
  issueDateISO: string
  summary: string
  scope: string[]
  results: CertificationResult[]
  verdict: "Pass" | "Reference"
  file: string
  fileSize: string
  pageCount: number
}

export const testedSample = {
  name: "Finished bag made from stone paper and PP woven composite tube fabric",
  manufacturer: "Wenzhou Fufang Technology Co., Ltd.",
  buyer: "Carthage GmbH",
  destination: "Germany",
  grammage: "115 g/m² – 200 g/m²",
  tubeWidth: "350 mm – 550 mm",
  rollLength: "Customizable",
  coreDiameter: '3 inches (76 mm)',
  layers: [
    { name: "Stone paper layer", share: "45.0% – 70.0%", detail: "Calcium carbonate (CaCO₃) approx. 70–80%, polyethylene (PE) approx. 20–30%" },
    { name: "PP woven layer", share: "30.0% – 45.0%", detail: "100% virgin polypropylene (PP)" },
    { name: "PE lamination layer", share: "5.0% – 10.0%", detail: "PE extrusion lamination resin" },
  ],
} as const

export const certifications: Certification[] = [
  {
    id: "food-contact",
    issuer: "SGS-CSTC Standards Technical Services Co., Ltd., Shenzhen Branch",
    category: "Food contact safety",
    title: "Overall migration and specific migration of heavy metals",
    reportNumber: "SZXPC26004291102",
    issueDate: "11 August 2026",
    issueDateISO: "2026-08-11",
    summary:
      "Tested against Regulation (EC) No 1935/2004, the German LFGB Sections 30 and 31, Regulation (EU) No 10/2011 as amended by (EU) 2025/351, and the relevant BfR recommendation. Both the overall migration and the specific migration of heavy metals passed.",
    scope: [
      "Regulation (EC) No 1935/2004 — materials intended to come into contact with food",
      "LFGB (German Food, Articles of Daily Use and Feed Code) Sections 30 and 31",
      "Regulation (EU) No 10/2011 and amendment (EU) 2025/351",
      "BfR recommendation",
    ],
    results: [
      { label: "Overall migration, 10% ethanol", value: "Not detected", note: "Limit 10 mg/dm², 40 °C for 10 days" },
      { label: "Overall migration, 3% acetic acid", value: "Not detected", note: "Limit 10 mg/dm², 40 °C for 10 days" },
      { label: "Overall migration, rectified olive oil", value: "Not detected", note: "Limit 10 mg/dm², 40 °C for 10 days" },
      { label: "Heavy metals (Pb, Cd, Hg, Cr, As and 15 more)", value: "Not detected", note: "Specific migration into 3% acetic acid, 40 °C for 10 days" },
    ],
    verdict: "Pass",
    file: "/stone-paper/certificates/sgs-food-contact-migration-SZXPC26004291102.pdf",
    fileSize: "2.0 MB",
    pageCount: 5,
  },
  {
    id: "reach-svhc",
    issuer: "SGS-CSTC Standards Technical Services Co., Ltd., Shenzhen Branch",
    category: "Chemical compliance",
    title: "REACH SVHC candidate list screening",
    reportNumber: "SZXPC26004291101",
    issueDate: "11 August 2026",
    issueDateISO: "2026-08-11",
    summary:
      "Screened against the 253 Substances of Very High Concern on the ECHA candidate list published on or before 4 February 2026 under Regulation (EC) No 1907/2006 (REACH), plus one substance under ongoing identification. All results are at or below 0.1% by weight.",
    scope: [
      "Regulation (EC) No 1907/2006 (REACH), Articles 7, 33 and 57",
      "253 SVHC on the ECHA candidate list as of 4 February 2026",
      "1 potential SVHC currently under identification",
    ],
    results: [
      { label: "253 candidate-list SVHC", value: "≤ 0.1% (w/w)" },
      { label: "1 potential SVHC", value: "≤ 0.1% (w/w)" },
      { label: "Analysis", value: "ICP-OES, UV-VIS, GC-MS, HPLC-DAD/MS, colorimetric" },
      { label: "Sample tested", value: "White bag with multicolour printing" },
    ],
    verdict: "Pass",
    file: "/stone-paper/certificates/sgs-reach-svhc-SZXPC26004291101.pdf",
    fileSize: "2.1 MB",
    pageCount: 16,
  },
  {
    id: "physical-performance",
    issuer: "SGS-CSTC Standards Technical Services Co., Ltd., ShenZhen Branch",
    category: "Physical performance",
    title: "Drop, seam, tensile, tear, peel and water resistance testing",
    reportNumber: "SZIN2607002034PL01",
    issueDate: "10 August 2026",
    issueDateISO: "2026-08-10",
    summary:
      "A filled bag was dropped ten times from 1.2 m onto a steel plate without rupture, tearing at the seams or leakage. The report also records seam strength, tensile strength, tear strength, lamination peel force and hydrostatic head.",
    scope: [
      "ASTM D5276-19 (reapproved 2023) — free fall",
      "ISO 13935-2:2026 — seam tensile properties",
      "ISO 13934-1:2013 — tensile strength",
      "ISO 13937-2:2000 — tear strength",
      "ISO 11339:2022 — T-peel",
      "ISO 811:2018 — hydrostatic head",
    ],
    results: [
      { label: "Free fall", value: "Pass", note: "10 drops from 1.2 m onto steel; no rupture, seam damage or leakage" },
      { label: "Seam rupture force", value: "650 N edge, 480 N bottom" },
      { label: "Tensile force at rupture", value: "780 N warp, 850 N weft", note: "Elongation 17.5% and 22.0%" },
      { label: "Tear strength", value: "120 N", note: "Both directions" },
      { label: "Lamination peel force", value: "2.46 N/100 mm average" },
      { label: "Water resistance", value: "3,660 mmH₂O average", note: "Hydrostatic head, five specimens" },
    ],
    verdict: "Reference",
    file: "/stone-paper/certificates/sgs-physical-performance-SZIN2607002034PL01.pdf",
    fileSize: "4.3 MB",
    pageCount: 16,
  },
]

export const technicalDataSheet = {
  title: "Technical data sheet",
  subtitle: "Stone paper and PP woven composite tube fabric",
  issuer: "Carthage GmbH",
  issueDate: "19 June 2026",
  issueDateISO: "2026-06-19",
  file: "/stone-paper/certificates/carthage-technical-data-sheet.pdf",
  fileSize: "0.3 MB",
  pageCount: 4,
}
