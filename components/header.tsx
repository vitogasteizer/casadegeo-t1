"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

type SiteContent = {
  title_ka: string | null
  image_url: string | null
}

export function Header() {
  const [content, setContent] = useState<SiteContent | null>(null)
  const supabase = createClient()

  useEffect(() => {
    async function loadContent() {
      const { data, error } = await supabase
        .from("site_content")
        .select("title_ka, image_url")
        .eq("section", "hero")
        .eq("is_active", true)
        .single()

      if (data && !error) {
        setContent(data)
      }
    }

    loadContent()
  }, [])

  const title = content?.title_ka || "ქართული სახლი ვიტორია-გასტეიზში"
  const backgroundImage = content?.image_url || "/placeholder.svg?height=1080&width=1920"

  return (
    <header id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 text-white p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold leading-tight tracking-wide">{title}</h1>
      </div>
    </header>
  )
}
