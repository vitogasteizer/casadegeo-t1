"use client"
import Link from "next/link"
import { useSiteData } from "@/contexts/site-context"

export function AboutSection() {
  const { siteData } = useSiteData()

  return (
    <section id="about" className="container mx-auto px-4 py-16 mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-4">{siteData.aboutTitle}</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">{siteData.aboutText}</p>
          <Link
            href="/about"
            className="inline-block px-6 py-3 bg-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            სრულად
          </Link>
        </div>
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <img
            src={siteData.aboutImage || "/placeholder.svg"}
            alt="ასოციაციის ფოტო"
            className="rounded-lg shadow-xl w-[50%] h-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  )
}
