import { Header } from "@/components/header"
import { LanguageSwitcher } from "@/components/language-switcher"
import { InfoCards } from "@/components/info-cards"
import { AboutSection } from "@/components/about-section"
import { ChurchSection } from "@/components/church-section"
import { EducationSection } from "@/components/education-section"
import { BlogSection } from "@/components/blog-section"
import { PartnersSection } from "@/components/partners-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="relative">
      <Header />
      <LanguageSwitcher />
      <InfoCards />
      <AboutSection />
      <ChurchSection />
      <EducationSection />
      <BlogSection />
      <PartnersSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
