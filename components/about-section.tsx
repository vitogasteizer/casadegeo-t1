"use client"

import Link from "next/link"
import { useSiteData } from "@/contexts/site-context"

export function AboutSection() {
  const { siteData } = useSiteData()

  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">{siteData.aboutTitle}</h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">{siteData.aboutText}</p>
            <Link
              href="/about"
              className="inline-block bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              სრულად
            </Link>
          </div>
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="w-3/4 lg:w-full max-w-md lg:max-w-lg">
              <img
                src={siteData.aboutImage || "/placeholder.svg"}
                alt="ასოციაციის ფოტო"
                className="w-full h-72 lg:h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
