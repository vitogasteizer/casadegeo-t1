"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Home, School, Newspaper } from 'lucide-react'
import Link from "next/link"

type InfoCard = {
  id: string
  icon: string | null
  title_ka: string
  title_es: string
  title_en: string
  description_ka: string | null
  description_es: string | null
  description_en: string | null
  display_order: number
  is_active: boolean
}

export function InfoCards() {
  const [cards, setCards] = useState<InfoCard[]>([])
  const supabase = createClient()

  useEffect(() => {
    async function loadCards() {
      const { data, error } = await supabase
        .from("info_cards")
        .select("*")
        .eq("is_active", true)
        .order("display_order")

      if (data && !error) {
        setCards(data)
      }
    }

    loadCards()
  }, [])

  const defaultCards = [
    {
      id: "1",
      icon: "🏛️",
      title_ka: "ასოციაციის შესახებ",
      description_ka: "გაიგეთ მეტი ჩვენი მიზნებისა და საქმიანობების შესახებ.",
      link: "#about",
    },
    {
      id: "2",
      icon: "📚",
      title_ka: "საკვირაო სკოლა",
      description_ka: "შესთავაზეთ თქვენს შვილებს ქართული ენისა და კულტურის შესწავლა.",
      link: "#education",
    },
    {
      id: "3",
      icon: "📰",
      title_ka: "ბოლო სიახლეები",
      description_ka: "მიიღეთ უახლესი ინფორმაცია ჩვენი ღონისძიებების შესახებ.",
      link: "#blog",
    },
  ]

  const displayCards = cards.length > 0 ? cards : defaultCards

  return (
    <div className="relative -mt-20 z-20 container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {displayCards.map((card, index) => (
          <Link
            key={card.id}
            href={
              index === 0 ? "#about" : index === 1 ? "#education" : "#blog"
            }
            className="block bg-white shadow-xl p-4 sm:p-6 text-center hover:shadow-2xl transition-all duration-300 rounded-md sm:py-12"
          >
            <div className="text-orange-600 text-3xl mb-4 flex justify-center">
              {card.icon || (index === 0 ? <Home /> : index === 1 ? <School /> : <Newspaper />)}
            </div>
            <h3 className="font-bold text-xl mb-2">{card.title_ka}</h3>
            <p className="text-sm text-gray-600">{card.description_ka}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
