"use client"

import { Church, Phone } from "lucide-react"
import { useSiteData } from "@/contexts/site-context"

export function ChurchSection() {
  const { siteData } = useSiteData()

  return (
    <section id="church" className="bg-yellow-50 py-16">
      <div className="container mx-auto px-4 mb-10">
        <h2 className="text-3xl font-bold text-center mb-8">{siteData.churchTitle}</h2>
        <p className="text-center text-gray-700 max-w-3xl mx-auto leading-relaxed">{siteData.churchDescription}</p>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="lg:col-span-2 bg-white p-4 sm:p-6 shadow-xl rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">მიმდინარე თვის დღესასწაულები</h3>
                <ul className="space-y-2 text-gray-600">
                  {siteData.holidays.map((holiday, index) => (
                    <li key={index} className="p-2 rounded-lg bg-gray-50 flex justify-between items-center">
                      <span>
                        {holiday.day} - {holiday.text}
                      </span>
                      <Church className="text-orange-600 w-5 h-5" />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-gray-100 shadow-inner text-center rounded-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">საკონტაქტო ინფორმაცია</h3>
                <p className="text-lg text-gray-700 mb-4">სულიერი რჩევისთვის, გთხოვთ, დაუკავშირდეთ მოძღვარს.</p>
                <button className="inline-flex items-center bg-orange-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-orange-700 transition duration-300">
                  <Phone className="w-4 h-4 mr-2" />
                  დაუკავშირდი მოძღვარს
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 shadow-xl rounded-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">საეკლესიო განრიგი</h3>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-gray-700">შაბათი:</p>
                <ul className="list-none pl-4 space-y-1">
                  <li>- 17:00 - 18:00 სთ: საღამოს მსახურება</li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-gray-700">კვირა:</p>
                <ul className="list-none pl-4 space-y-1">
                  <li>- 10:00 - 12:00 სთ: წირვა-ლოცვა</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
