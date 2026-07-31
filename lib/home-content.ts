import type { Locale } from "./types"

/**
 * Homepage copy for the Carthage Group.
 *
 * Every factual claim here already exists elsewhere in the repositories
 * (stone-paper process pages, division content, product imagery). No
 * statistics, certifications, awards or testimonials are invented.
 *
 * House style: no en dashes and no em dashes anywhere in visible copy.
 * Ranges are written with "to", asides use commas, colons or full stops.
 */

const en = {
  hero: {
    eyebrow: "Carthage Group · Made in Germany",
    // Rendered as individually masked lines. Keep each line short.
    titleLines: ["Two materials.", "One standard."],
    body: "Carthage is a German production group working in mineral based stone paper and professional cosmetics. Two divisions, built on the same discipline of material and precision.",
    primary: "Explore the group",
    secondary: "Visit the shop",
    scroll: "Scroll",
    clips: [
      { caption: "Stone paper production", division: "Stone Paper" },
      { caption: "Permanent makeup application", division: "Cosmetics & PMU" },
      { caption: "PMU pigment system", division: "Cosmetics & PMU" },
    ],
  },
  marquee: ["Made in Germany", "Stone paper", "Professional PMU", "Mineral materials", "Precision manufacturing"],
  statement: {
    eyebrow: "One group · two divisions",
    // Scrubbed word by word. Keep it one readable sentence.
    lead: "Carthage works at two ends of the same idea: that a finished product is only as good as the material decisions behind it.",
    body: "One division mills limestone into a tree free paper. The other develops pigments, cartridge needles and care products for permanent makeup professionals. Different industries, one way of working: controlled inputs, measurable outputs, and products designed to be used every day.",
    meta: [
      ["Divisions", "Stone Paper · Cosmetics & PMU"],
      ["Production", "Germany"],
      ["Academy", "Berlin"],
    ],
  },
  divisions: {
    eyebrow: "The divisions",
    title: "Held to one standard.",
    stone: {
      index: "01",
      label: "Carthage Stone Paper",
      title: "Paper made from stone, not trees.",
      body: "High purity calcium carbonate, milled to 1 to 3 microns and bound with food grade HDPE, extruded into a smooth, water resistant sheet.",
      facts: [
        ["Material", "CaCO₃ ≥ 98%"],
        ["Binder", "18 to 20% HDPE"],
        ["Process", "Water free extrusion"],
      ],
      cta: "Enter Stone Paper",
      href: "/stone-paper",
    },
    care: {
      index: "02",
      label: "Cosmetics & PMU",
      title: "Cosmetics and professional PMU.",
      body: "Pigments, precision cartridge needles and cosmetic care developed around the control, comfort and consistency professional artists work to.",
      facts: [
        ["Range", "Pigments · Needles · Care"],
        ["Built for", "Studio practice"],
        ["Academy", "Berlin"],
      ],
      cta: "Enter Cosmetics & PMU",
      href: "/carthage-care",
    },
  },
  material: {
    eyebrow: "Carthage Stone Paper",
    title: "From quarry to finished sheet.",
    body: "Stone paper replaces wood pulp with mineral powder. The process uses no water, no bleach and no optical brighteners.",
    cta: "The full process",
    steps: [
      { n: "01", title: "Limestone", body: "High purity calcium carbonate from certified European quarries. Only CaCO₃ of 98% or above enters the line.", image: "/stone-paper/paper-5.jpg", alt: "Raw limestone and calcium carbonate powder" },
      { n: "02", title: "Micronization", body: "Crushed and milled to a 1 to 3 micron powder. Uniform particle size decides smoothness and printability.", image: "/stone-paper/paper-2.jpg", alt: "Micronized calcium carbonate powder with limestone pebbles" },
      { n: "03", title: "Compounding", body: "Blended with 18 to 20% food grade HDPE as a binder. No bleaches, acids, solvents or optical brighteners.", image: "/stone-paper/paper-6.jpg", alt: "Stone paper material stored in a production warehouse" },
      { n: "04", title: "Extrusion", body: "Melted and extruded under thermal control into a continuous film, without water consumption.", image: "/stock/extrusion-line.jpg", alt: "Continuous production line inside an industrial plant" },
      { n: "05", title: "Calendering", body: "Heated rolls set the final thickness, density and surface finish for industrial printing.", image: "/stock/calendered-surface.jpg", alt: "Smooth calendered sheet surface in raking light" },
      { n: "06", title: "Finished goods", body: "Slit, sheeted and tested for whiteness, basis weight, tensile strength and water resistance.", image: "/stone-paper/paper-1.jpg", alt: "Finished Carthage stone paper notebooks" },
    ],
    proof: {
      title: "Water resistance is a property, not a coating.",
      body: "Because the sheet is mineral and polymer rather than cellulose, it does not absorb water or tear when wet.",
      caption: "Stone paper notebook, submerged",
    },
  },
  care: {
    eyebrow: "Cosmetics & PMU",
    title: "Precision, in the hand.",
    body: "The Carthage cosmetics range is developed around what professional artists actually feel during a session: how a cartridge sits, how a pigment behaves, how skin recovers afterwards.",
    cta: "Enter Cosmetics & PMU",
    shopCta: "Shop the range",
    frames: [
      { n: "01", title: "Pigments", body: "Professional PMU pigments developed for controlled application and consistent results across a session.", image: "/0476c5bd-60bd-4601-b0f5-a80cb878c173.JPG", alt: "Carthage PMU lip pigment bottle" },
      { n: "02", title: "Cartridge needles", body: "Precision cartridges built around stability and grip, including the V6 Pink silicone cartridge.", image: "/IMG_6447.JPG", alt: "Carthage V6 Pink silicone cartridge needle" },
      { n: "03", title: "Application", body: "Products tested in real studio conditions, where control and comfort decide the result.", image: "/image8.jpg", alt: "Permanent makeup treatment in a Carthage studio" },
    ],
  },
  philosophy: {
    eyebrow: "Shared principles",
    title: "Different products. The same discipline.",
    items: [
      ["Material first", "Both divisions start at the input: which mineral, which polymer, which pigment, and how it behaves in use."],
      ["Controlled process", "Specification before decoration. Thickness, particle size, consistency and finish are measured, not estimated."],
      ["Built to be used", "Products are designed for daily professional work, not for a photograph of it."],
    ],
  },
  gateway: {
    eyebrow: "Continue",
    title: "Where would you like to go?",
    links: [
      { n: "01", label: "Stone Paper", desc: "Material, process and industrial packaging", href: "/stone-paper" },
      { n: "02", label: "Cosmetics & PMU", desc: "The professional beauty division", href: "/carthage-care" },
      { n: "03", label: "Shop", desc: "Buy pigments, cartridges, care and stone paper", href: "/shop" },
    ],
  },
}

const fr: typeof en = {
  hero: {
    eyebrow: "Carthage Group · Fabriqué en Allemagne",
    titleLines: ["Deux matières.", "Une exigence."],
    body: "Carthage est un groupe de production allemand actif dans le papier de pierre minéral et les cosmétiques professionnels. Deux divisions, bâties sur la même discipline de la matière et de la précision.",
    primary: "Découvrir le groupe",
    secondary: "Visiter la boutique",
    scroll: "Défiler",
    clips: [
      { caption: "Production de papier de pierre", division: "Stone Paper" },
      { caption: "Application de maquillage permanent", division: "Cosmétiques & PMU" },
      { caption: "Système de pigments PMU", division: "Cosmétiques & PMU" },
    ],
  },
  marquee: ["Fabriqué en Allemagne", "Papier de pierre", "PMU professionnel", "Matières minérales", "Fabrication de précision"],
  statement: {
    eyebrow: "Un groupe · deux divisions",
    lead: "Carthage travaille aux deux extrémités d’une même idée : un produit fini ne vaut que les décisions de matière qui le précèdent.",
    body: "Une division transforme le calcaire en un papier sans arbre. L’autre développe pigments, aiguilles cartouches et soins pour les professionnels du maquillage permanent. Deux industries, une même méthode : des intrants maîtrisés, des résultats mesurables et des produits pensés pour l’usage quotidien.",
    meta: [
      ["Divisions", "Stone Paper · Cosmétiques & PMU"],
      ["Production", "Allemagne"],
      ["Académie", "Berlin"],
    ],
  },
  divisions: {
    eyebrow: "Les divisions",
    title: "Une seule exigence.",
    stone: {
      index: "01",
      label: "Carthage Stone Paper",
      title: "Un papier né de la pierre, pas de l’arbre.",
      body: "Carbonate de calcium de haute pureté, broyé de 1 à 3 microns et lié au HDPE alimentaire, extrudé en une feuille lisse et résistante à l’eau.",
      facts: [
        ["Matière", "CaCO₃ ≥ 98 %"],
        ["Liant", "18 à 20 % HDPE"],
        ["Procédé", "Extrusion sans eau"],
      ],
      cta: "Entrer dans Stone Paper",
      href: "/stone-paper",
    },
    care: {
      index: "02",
      label: "Cosmétiques & PMU",
      title: "Cosmétiques et PMU professionnel.",
      body: "Pigments, aiguilles cartouches de précision et soins développés autour du contrôle, du confort et de la régularité exigés par les artistes.",
      facts: [
        ["Gamme", "Pigments · Aiguilles · Soins"],
        ["Conçu pour", "La pratique en studio"],
        ["Académie", "Berlin"],
      ],
      cta: "Entrer dans Cosmétiques & PMU",
      href: "/carthage-care",
    },
  },
  material: {
    eyebrow: "Carthage Stone Paper",
    title: "De la carrière à la feuille finie.",
    body: "Le papier de pierre remplace la pâte de bois par une poudre minérale. Le procédé n’utilise ni eau, ni chlore, ni azurants optiques.",
    cta: "Le procédé complet",
    steps: [
      { n: "01", title: "Calcaire", body: "Carbonate de calcium de haute pureté issu de carrières européennes certifiées. Seul le CaCO₃ à 98 % ou plus entre en ligne.", image: "/stone-paper/paper-5.jpg", alt: "Calcaire brut et poudre de carbonate de calcium" },
      { n: "02", title: "Micronisation", body: "Concassé puis broyé en poudre de 1 à 3 microns. La régularité des particules détermine lissé et imprimabilité.", image: "/stone-paper/paper-2.jpg", alt: "Poudre de carbonate de calcium micronisée avec des galets calcaires" },
      { n: "03", title: "Compoundage", body: "Mélangé à 18 à 20 % de HDPE alimentaire comme liant. Sans chlore, acides, solvants ni azurants optiques.", image: "/stone-paper/paper-6.jpg", alt: "Matière papier de pierre stockée en entrepôt de production" },
      { n: "04", title: "Extrusion", body: "Fondu et extrudé sous contrôle thermique en un film continu, sans consommation d’eau.", image: "/stock/extrusion-line.jpg", alt: "Ligne de production continue dans une usine industrielle" },
      { n: "05", title: "Calandrage", body: "Des rouleaux chauffants fixent l’épaisseur, la densité et l’état de surface pour l’impression industrielle.", image: "/stock/calendered-surface.jpg", alt: "Surface de feuille calandrée en lumière rasante" },
      { n: "06", title: "Produits finis", body: "Refendu, mis en feuilles et testé : blancheur, grammage, résistance à la traction et à l’eau.", image: "/stone-paper/paper-1.jpg", alt: "Carnets Carthage en papier de pierre finis" },
    ],
    proof: {
      title: "La résistance à l’eau est une propriété, pas un revêtement.",
      body: "Composée de minéral et de polymère plutôt que de cellulose, la feuille n’absorbe pas l’eau et ne se déchire pas une fois mouillée.",
      caption: "Carnet en papier de pierre, immergé",
    },
  },
  care: {
    eyebrow: "Cosmétiques & PMU",
    title: "La précision, en main.",
    body: "La gamme cosmétique Carthage est développée à partir de ce que les artistes ressentent réellement pendant une séance : la tenue d’une cartouche, le comportement d’un pigment, la récupération de la peau.",
    cta: "Entrer dans Cosmétiques & PMU",
    shopCta: "Voir la gamme",
    frames: [
      { n: "01", title: "Pigments", body: "Pigments PMU professionnels conçus pour une application maîtrisée et des résultats réguliers.", image: "/0476c5bd-60bd-4601-b0f5-a80cb878c173.JPG", alt: "Flacon de pigment lèvres PMU Carthage" },
      { n: "02", title: "Aiguilles cartouches", body: "Cartouches de précision pensées pour la stabilité et la prise en main, dont la cartouche silicone V6 Pink.", image: "/IMG_6447.JPG", alt: "Aiguille cartouche silicone Carthage V6 Pink" },
      { n: "03", title: "Application", body: "Des produits éprouvés en conditions réelles de studio, où contrôle et confort décident du résultat.", image: "/image8.jpg", alt: "Séance de maquillage permanent dans un studio Carthage" },
    ],
  },
  philosophy: {
    eyebrow: "Principes communs",
    title: "Des produits différents. La même discipline.",
    items: [
      ["La matière d’abord", "Les deux divisions commencent par l’intrant : quel minéral, quel polymère, quel pigment, et son comportement à l’usage."],
      ["Procédé maîtrisé", "La spécification avant la décoration. Épaisseur, granulométrie, régularité et finition sont mesurées, pas estimées."],
      ["Fait pour servir", "Nos produits sont conçus pour le travail professionnel quotidien, pas pour sa photographie."],
    ],
  },
  gateway: {
    eyebrow: "Continuer",
    title: "Où souhaitez-vous aller ?",
    links: [
      { n: "01", label: "Papier de pierre", desc: "Matière, procédé et emballage industriel", href: "/stone-paper" },
      { n: "02", label: "Cosmétiques & PMU", desc: "La division beauté professionnelle", href: "/carthage-care" },
      { n: "03", label: "Boutique", desc: "Pigments, cartouches, soins et papier de pierre", href: "/shop" },
    ],
  },
}

const de: typeof en = {
  hero: {
    eyebrow: "Carthage Group · Made in Germany",
    titleLines: ["Zwei Materialien.", "Ein Anspruch."],
    body: "Carthage ist eine deutsche Produktionsgruppe für mineralisches Steinpapier und professionelle Kosmetik. Zwei Bereiche, gebaut auf derselben Disziplin aus Material und Präzision.",
    primary: "Die Gruppe entdecken",
    secondary: "Zum Shop",
    scroll: "Scrollen",
    clips: [
      { caption: "Steinpapier Produktion", division: "Stone Paper" },
      { caption: "Permanent Make-up Anwendung", division: "Kosmetik & PMU" },
      { caption: "PMU Pigmentsystem", division: "Kosmetik & PMU" },
    ],
  },
  marquee: ["Made in Germany", "Steinpapier", "Professionelles PMU", "Mineralische Materialien", "Präzisionsfertigung"],
  statement: {
    eyebrow: "Eine Gruppe · zwei Bereiche",
    lead: "Carthage arbeitet an zwei Enden derselben Idee: Ein fertiges Produkt ist nur so gut wie die Materialentscheidungen dahinter.",
    body: "Ein Bereich mahlt Kalkstein zu einem baumfreien Papier. Der andere entwickelt Pigmente, Cartridge Nadeln und Pflegeprodukte für Permanent Make-up Profis. Zwei Branchen, eine Arbeitsweise: kontrollierte Eingangsstoffe, messbare Ergebnisse und Produkte für den täglichen Gebrauch.",
    meta: [
      ["Bereiche", "Stone Paper · Kosmetik & PMU"],
      ["Produktion", "Deutschland"],
      ["Academy", "Berlin"],
    ],
  },
  divisions: {
    eyebrow: "Die Bereiche",
    title: "Einem Standard verpflichtet.",
    stone: {
      index: "01",
      label: "Carthage Stone Paper",
      title: "Papier aus Stein, nicht aus Bäumen.",
      body: "Hochreines Calciumcarbonat, auf 1 bis 3 Mikrometer gemahlen, mit lebensmittelechtem HDPE gebunden und zu einer glatten, wasserbeständigen Bahn extrudiert.",
      facts: [
        ["Material", "CaCO₃ ≥ 98 %"],
        ["Binder", "18 bis 20 % HDPE"],
        ["Prozess", "Wasserfreie Extrusion"],
      ],
      cta: "Zu Stone Paper",
      href: "/stone-paper",
    },
    care: {
      index: "02",
      label: "Kosmetik & PMU",
      title: "Kosmetik und professionelles PMU.",
      body: "Pigmente, Präzisions Cartridge Nadeln und Pflegeprodukte, entwickelt für die Kontrolle, den Komfort und die Konsistenz professioneller Arbeit.",
      facts: [
        ["Sortiment", "Pigmente · Nadeln · Pflege"],
        ["Gemacht für", "Die Studiopraxis"],
        ["Academy", "Berlin"],
      ],
      cta: "Zu Kosmetik & PMU",
      href: "/carthage-care",
    },
  },
  material: {
    eyebrow: "Carthage Stone Paper",
    title: "Vom Steinbruch zur fertigen Bahn.",
    body: "Steinpapier ersetzt Holzzellstoff durch Mineralpulver. Der Prozess kommt ohne Wasser, Bleiche und optische Aufheller aus.",
    cta: "Der gesamte Prozess",
    steps: [
      { n: "01", title: "Kalkstein", body: "Hochreines Calciumcarbonat aus zertifizierten europäischen Steinbrüchen. Nur CaCO₃ ab 98 % gelangt in die Linie.", image: "/stone-paper/paper-5.jpg", alt: "Roher Kalkstein und Calciumcarbonat Pulver" },
      { n: "02", title: "Mikronisierung", body: "Gebrochen und zu 1 bis 3 Mikrometer feinem Pulver gemahlen. Die Korngröße bestimmt Glätte und Bedruckbarkeit.", image: "/stone-paper/paper-2.jpg", alt: "Mikronisiertes Calciumcarbonat Pulver mit Kalksteinen" },
      { n: "03", title: "Compoundierung", body: "Mit 18 bis 20 % lebensmittelechtem HDPE als Binder gemischt. Ohne Bleiche, Säuren, Lösungsmittel und optische Aufheller.", image: "/stone-paper/paper-6.jpg", alt: "Steinpapier Material im Produktionslager" },
      { n: "04", title: "Extrusion", body: "Unter thermischer Kontrolle aufgeschmolzen und zu einem endlosen Film extrudiert, ohne Wasserverbrauch.", image: "/stock/extrusion-line.jpg", alt: "Durchgehende Produktionslinie in einem Industriewerk" },
      { n: "05", title: "Kalandrieren", body: "Beheizte Walzen setzen Enddicke, Dichte und Oberfläche für den industriellen Druck.", image: "/stock/calendered-surface.jpg", alt: "Glatte kalandrierte Oberfläche im Streiflicht" },
      { n: "06", title: "Fertigware", body: "Geschnitten, bogenweise konfektioniert und geprüft: Weißgrad, Flächengewicht, Reiß und Wasserfestigkeit.", image: "/stone-paper/paper-1.jpg", alt: "Fertige Carthage Steinpapier Notizbücher" },
    ],
    proof: {
      title: "Wasserbeständigkeit ist eine Eigenschaft, keine Beschichtung.",
      body: "Weil die Bahn aus Mineral und Polymer statt Zellulose besteht, saugt sie kein Wasser auf und reißt nass nicht ein.",
      caption: "Steinpapier Notizbuch, unter Wasser",
    },
  },
  care: {
    eyebrow: "Kosmetik & PMU",
    title: "Präzision, in der Hand.",
    body: "Das Carthage Kosmetiksortiment entsteht aus dem, was Artists während einer Behandlung tatsächlich spüren: wie eine Cartridge sitzt, wie ein Pigment arbeitet, wie die Haut sich erholt.",
    cta: "Zu Kosmetik & PMU",
    shopCta: "Sortiment ansehen",
    frames: [
      { n: "01", title: "Pigmente", body: "Professionelle PMU Pigmente für kontrollierte Anwendung und konsistente Ergebnisse über die Behandlung hinweg.", image: "/0476c5bd-60bd-4601-b0f5-a80cb878c173.JPG", alt: "Carthage PMU Lippenpigment Flasche" },
      { n: "02", title: "Cartridge Nadeln", body: "Präzisions Cartridges für Stabilität und Griff, darunter die V6 Pink Silikon Cartridge.", image: "/IMG_6447.JPG", alt: "Carthage V6 Pink Silikon Cartridge Nadel" },
      { n: "03", title: "Anwendung", body: "Produkte, erprobt unter realen Studiobedingungen, wo Kontrolle und Komfort das Ergebnis bestimmen.", image: "/image8.jpg", alt: "Permanent Make-up Behandlung in einem Carthage Studio" },
    ],
  },
  philosophy: {
    eyebrow: "Gemeinsame Prinzipien",
    title: "Unterschiedliche Produkte. Die gleiche Disziplin.",
    items: [
      ["Material zuerst", "Beide Bereiche beginnen beim Eingangsstoff: welches Mineral, welches Polymer, welches Pigment, und wie es sich im Einsatz verhält."],
      ["Kontrollierter Prozess", "Spezifikation vor Dekoration. Dicke, Korngröße, Konsistenz und Finish werden gemessen, nicht geschätzt."],
      ["Zum Arbeiten gebaut", "Produkte für die tägliche professionelle Arbeit, nicht für ihr Foto."],
    ],
  },
  gateway: {
    eyebrow: "Weiter",
    title: "Wohin möchten Sie?",
    links: [
      { n: "01", label: "Steinpapier", desc: "Material, Prozess und Industrieverpackung", href: "/stone-paper" },
      { n: "02", label: "Kosmetik & PMU", desc: "Der professionelle Beauty Bereich", href: "/carthage-care" },
      { n: "03", label: "Shop", desc: "Pigmente, Cartridges, Pflege und Steinpapier", href: "/shop" },
    ],
  },
}

export const homeContent: Record<Locale, typeof en> = { en, fr, de }
