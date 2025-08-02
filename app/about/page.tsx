import { AboutHeader } from "@/components/about-header"
import { AboutContent } from "@/components/about-content"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="relative">
      <AboutHeader />
      <AboutContent />
      <Footer />
    </div>
  )
}
