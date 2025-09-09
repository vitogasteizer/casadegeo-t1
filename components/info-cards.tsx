"use client"

import { Home, School, Newspaper } from "lucide-react"
import Link from "next/link"

export function InfoCards() {
  return (
    <div className="relative -mt-20 z-20 container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        <Link
          href="#about"
          className="block bg-white shadow-xl p-4 sm:p-6 text-center hover:shadow-2xl transition-all duration-300 rounded-md sm:py-12"
        >
          <div className="text-orange-600 text-3xl mb-4 flex justify-center">
            <Home />
          </div>
          <h3 className="font-bold text-xl mb-2">ასოციაციის შესახებ</h3>
          <p className="text-sm text-gray-600">გაიგეთ მეტი ჩვენი მიზნებისა და საქმიანობების შესახებ.</p>
        </Link>

        <Link
          href="#education"
          className="block bg-white rounded-lg shadow-xl p-4 sm:p-6 text-center hover:shadow-2xl transition-all duration-300 sm:py-12"
        >
          <div className="text-orange-600 text-3xl mb-4 flex justify-center">
            <School />
          </div>
          <h3 className="font-bold text-xl mb-2">საკვირაო სკოლა</h3>
          <p className="text-sm text-gray-600">შესთავაზეთ თქვენს შვილებს ქართული ენისა და კულტურის შესწავლა.</p>
        </Link>

        <Link
          href="#blog"
          className="block bg-white rounded-lg shadow-xl p-4 sm:p-6 text-center hover:shadow-2xl transition-all duration-300 sm:py-12"
        >
          <div className="text-orange-600 text-3xl mb-4 flex justify-center">
            <Newspaper />
          </div>
          <h3 className="font-bold text-xl mb-2">ბოლო სიახლეები</h3>
          <p className="text-sm text-gray-600">მიიღეთ უახლესი ინფორმაცია ჩვენი ღონისძიებების შესახებ.</p>
        </Link>
      </div>
    </div>
  )
}
