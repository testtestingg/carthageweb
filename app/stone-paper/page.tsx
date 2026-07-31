import { Navigation } from "@/components/golden-bridge/navigation"
import { Hero } from "@/components/golden-bridge/hero"
import { ProjectsSection } from "@/components/golden-bridge/projects-section"
import { StudioSection } from "@/components/golden-bridge/studio-section"
import { EditorialBreak } from "@/components/golden-bridge/editorial-break"
import { ApproachSection } from "@/components/golden-bridge/approach-section"
import { JournalSection } from "@/components/golden-bridge/journal-section"
import { ContactSection } from "@/components/golden-bridge/contact-section"
import { Footer } from "@/components/golden-bridge/footer"

export default function Page() {
  return (
    <main>
      <Navigation transparentOverHero />
      <Hero />
      <StudioSection />
      <ApproachSection />
      <EditorialBreak />
      <ProjectsSection />
      <JournalSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
