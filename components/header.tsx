"use client"

import { useSiteData } from "@/contexts/site-context"

export function Header() {
  const { siteData } = useSiteData()

  return (
    <header id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/placeholder.svg?height=1080&width=1920&text=${siteData.city}')` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 text-white p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold leading-tight tracking-wide">
          {siteData.mainTitle}
        </h1>
      </div>
    </header>
  )
}
