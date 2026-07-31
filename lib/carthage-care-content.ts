import type { Locale } from "./types"

/**
 * Copy for the Cosmetics & PMU division page (route: /carthage-care).
 *
 * House style: no en dashes and no em dashes in visible copy.
 */

const en = {
  hero: {
    eyebrow: "Cosmetics & PMU · Made in Germany",
    // Masked line reveal, so keep each line short.
    titleLines: ["Professional", "beauty, built", "on precision."],
    body: "Carthage develops permanent makeup pigments, precision cartridge needles and cosmetic care for artists and studios working to a professional standard.",
    shop: "Explore products",
    academy: "Discover the academy",
    caption: "Carthage PMU system in studio use",
    spec: [
      ["Range", "Pigments · Needles · Care"],
      ["Made in", "Germany"],
      ["Academy", "Berlin"],
    ],
    strip: ["PMU pigments", "Cartridge needles", "Cosmetic care", "Professional training", "Made in Germany"],
  },
  intro: {
    eyebrow: "The division",
    title: "Products shaped by professional practice.",
    body: "From pigment performance to needle ergonomics and post treatment care, Carthage focuses on the material details that influence control, consistency and the working experience.",
  },
  products: {
    eyebrow: "The collection",
    title: "A focused professional system.",
    items: [
      ["Pigments", "Professional PMU pigments developed for controlled application and consistent results."],
      ["Cartridge needles", "Precision cartridges created around stability, comfort and practical studio use."],
      ["Cosmetic care", "Skincare and aftercare products supporting preparation, treatment and recovery."],
    ],
  },
  making: {
    eyebrow: "Carthage standards",
    title: "Precision is a process, not a surface treatment.",
    body: "Carthage products are developed around material selection, technical control and the requirements of permanent makeup professionals.",
    cta: "View the complete shop",
  },
  academy: {
    eyebrow: "Carthage Academy · Berlin",
    title: "Products and education, developed together.",
    body: "Professional courses connect product knowledge with practical technique, live application and continued mentoring.",
    cta: "Explore the academy",
  },
  final: {
    eyebrow: "Cosmetics & PMU",
    title: "For artists who work in detail.",
    shop: "Visit the professional shop",
    group: "Return to Carthage Group",
  },
}

const fr: typeof en = {
  hero: {
    eyebrow: "Cosmétiques & PMU · Fabriqué en Allemagne",
    titleLines: ["La beauté", "professionnelle,", "par la précision."],
    body: "Carthage développe des pigments de maquillage permanent, des aiguilles cartouches de précision et des soins cosmétiques pour les artistes et studios exigeants.",
    shop: "Découvrir les produits",
    academy: "Découvrir l’académie",
    caption: "Le système PMU Carthage en studio",
    spec: [
      ["Gamme", "Pigments · Aiguilles · Soins"],
      ["Fabriqué en", "Allemagne"],
      ["Académie", "Berlin"],
    ],
    strip: ["Pigments PMU", "Aiguilles cartouches", "Soins cosmétiques", "Formation professionnelle", "Fabriqué en Allemagne"],
  },
  intro: {
    eyebrow: "La division",
    title: "Des produits façonnés par la pratique professionnelle.",
    body: "De la performance des pigments à l’ergonomie des aiguilles et aux soins post traitement, Carthage se concentre sur les détails matériels qui influencent contrôle, régularité et confort de travail.",
  },
  products: {
    eyebrow: "La collection",
    title: "Un système professionnel ciblé.",
    items: [
      ["Pigments", "Pigments PMU professionnels conçus pour une application maîtrisée et des résultats réguliers."],
      ["Aiguilles cartouches", "Cartouches de précision pensées pour la stabilité, le confort et l’usage quotidien en studio."],
      ["Soins cosmétiques", "Soins et produits post traitement pour la préparation, le traitement et la récupération."],
    ],
  },
  making: {
    eyebrow: "Standards Carthage",
    title: "La précision est un processus, pas un effet de surface.",
    body: "Les produits Carthage sont développés autour du choix des matériaux, du contrôle technique et des exigences des professionnels du maquillage permanent.",
    cta: "Voir toute la boutique",
  },
  academy: {
    eyebrow: "Carthage Academy · Berlin",
    title: "Produits et formation, développés ensemble.",
    body: "Les cours professionnels relient connaissance produit, technique pratique, application sur modèle et accompagnement continu.",
    cta: "Découvrir l’académie",
  },
  final: {
    eyebrow: "Cosmétiques & PMU",
    title: "Pour les artistes qui travaillent dans le détail.",
    shop: "Visiter la boutique professionnelle",
    group: "Retour à Carthage Group",
  },
}

const de: typeof en = {
  hero: {
    eyebrow: "Kosmetik & PMU · Made in Germany",
    titleLines: ["Professionelle", "Beauty, gebaut", "auf Präzision."],
    body: "Carthage entwickelt Permanent Make-up Pigmente, Präzisions Cartridge Nadeln und kosmetische Pflege für Artists und Studios mit professionellem Anspruch.",
    shop: "Produkte entdecken",
    academy: "Academy entdecken",
    caption: "Das Carthage PMU System im Studioeinsatz",
    spec: [
      ["Sortiment", "Pigmente · Nadeln · Pflege"],
      ["Gefertigt in", "Deutschland"],
      ["Academy", "Berlin"],
    ],
    strip: ["PMU Pigmente", "Cartridge Nadeln", "Kosmetische Pflege", "Professionelle Ausbildung", "Made in Germany"],
  },
  intro: {
    eyebrow: "Der Bereich",
    title: "Produkte, geprägt von professioneller Praxis.",
    body: "Von der Pigmentleistung über die Nadelergonomie bis zur Nachpflege konzentriert sich Carthage auf Materialdetails, die Kontrolle, Konsistenz und den Arbeitsalltag beeinflussen.",
  },
  products: {
    eyebrow: "Die Kollektion",
    title: "Ein fokussiertes professionelles System.",
    items: [
      ["Pigmente", "Professionelle PMU Pigmente für kontrollierte Anwendung und konsistente Ergebnisse."],
      ["Cartridge Nadeln", "Präzisions Cartridges für Stabilität, Komfort und den praktischen Studioeinsatz."],
      ["Kosmetische Pflege", "Hautpflege und Aftercare für Vorbereitung, Behandlung und Regeneration."],
    ],
  },
  making: {
    eyebrow: "Carthage Standards",
    title: "Präzision ist ein Prozess, keine Oberfläche.",
    body: "Carthage Produkte entstehen aus bewusster Materialauswahl, technischer Kontrolle und den Anforderungen professioneller PMU Anwendungen.",
    cta: "Zum vollständigen Shop",
  },
  academy: {
    eyebrow: "Carthage Academy · Berlin",
    title: "Produkte und Ausbildung, gemeinsam entwickelt.",
    body: "Professionelle Kurse verbinden Produktwissen mit praktischer Technik, Live Anwendung und fortlaufendem Mentoring.",
    cta: "Academy entdecken",
  },
  final: {
    eyebrow: "Kosmetik & PMU",
    title: "Für Artists, die im Detail arbeiten.",
    shop: "Zum professionellen Shop",
    group: "Zurück zur Carthage Group",
  },
}

export const carthageCareContent: Record<Locale, typeof en> = { en, fr, de }
