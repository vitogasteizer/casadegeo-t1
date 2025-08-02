"use client"

export function PartnersSection() {
  const partners = [
    {
      name: "Partner 1",
      logo: "/placeholder.svg?height=100&width=200&text=Partner+1",
      url: "https://example.com/partner1",
    },
    {
      name: "Partner 2",
      logo: "/placeholder.svg?height=100&width=200&text=Partner+2",
      url: "https://example.com/partner2",
    },
    {
      name: "Partner 3",
      logo: "/placeholder.svg?height=100&width=200&text=Partner+3",
      url: "https://example.com/partner3",
    },
    {
      name: "Partner 4",
      logo: "/placeholder.svg?height=100&width=200&text=Partner+4",
      url: "https://example.com/partner4",
    },
    {
      name: "Partner 5",
      logo: "/placeholder.svg?height=100&width=200&text=Partner+5",
      url: "https://example.com/partner5",
    },
    {
      name: "Partner 6",
      logo: "/placeholder.svg?height=100&width=200&text=Partner+6",
      url: "https://example.com/partner6",
    },
    {
      name: "Partner 7",
      logo: "/placeholder.svg?height=100&width=200&text=Partner+7",
      url: "https://example.com/partner7",
    },
    {
      name: "Partner 8",
      logo: "/placeholder.svg?height=100&width=200&text=Partner+8",
      url: "https://example.com/partner8",
    },
  ]

  return (
    <section id="partners" className="py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">პარტნიორები</h2>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {partners.map((partner, index) => (
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
