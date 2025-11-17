"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

type Partner = {
  id: string
  name: string
  logo_url: string
  website_url: string | null
  is_active: boolean
}

export function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([])
  const supabase = createClient()

  useEffect(() => {
    async function loadPartners() {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .eq("is_active", true)
        .order("display_order")

      if (data && !error) {
        setPartners(data)
      }
    }

    loadPartners()
  }, [])

  if (partners.length === 0) return null

  return (
    <section id="partners" className="py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">პარტნიორები</h2>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.website_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0"
            >
              <img
                src={partner.logo_url || "/placeholder.svg"}
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
