"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

type SiteContent = {
  title_ka: string | null
  description_ka: string | null
  image_url: string | null
}

export function AboutSection() {
  const [content, setContent] = useState<SiteContent | null>(null)
  const supabase = createClient()

  useEffect(() => {
    async function loadContent() {
      const { data, error } = await supabase
        .from("site_content")
        .select("title_ka, description_ka, image_url")
        .eq("section", "about")
        .eq("is_active", true)
        .single()

      if (data && !error) {
        setContent(data)
      }
    }

    loadContent()
  }, [])

  const title = content?.title_ka || "ჩვენს შესახებ"
  const description =
    content?.description_ka ||
    'ასოციაცია "ქართული სახლი ვიტორია-გასტეიზში" წარმოადგენს ორგანიზაციას, რომელიც აერთიანებს ბასკეთის ქვეყანაში მცხოვრებ ქართველებს.'
  const image = content?.image_url || "/placeholder.svg"

  return (
    <section id="about" className="py-16 bg-gray-50 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">{title}</h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">{description}</p>
            <Link
              href="/about"
              className="inline-block bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              სრულად
            </Link>
          </div>
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="w-3/4 lg:w-full max-w-md lg:max-w-lg rounded-md">
              <img
                src={image || "/placeholder.svg"}
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
