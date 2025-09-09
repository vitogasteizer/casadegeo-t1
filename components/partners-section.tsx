"use client"

import { useSiteData } from "@/contexts/site-context"

export function PartnersSection() {
  const { siteData } = useSiteData()

  return (
    <section id="partners" className="py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">პარტნიორები</h2>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {siteData.partners.map((partner, index) => (
            <a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0"
            >
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                className="h-12 sm:h-16 w-auto object-contain max-w-[150px] sm:max-w-[200px]"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
