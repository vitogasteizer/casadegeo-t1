"use client"

import { useState } from "react"

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState("ka")

  return (
    <div className="relative z-20 container mx-auto px-4 -mt-20 flex justify-center mb-8">
      <div className="flex space-x-2">
        <button
          onClick={() => setCurrentLang("ka")}
          className={`px-4 py-2 rounded-full transition-all duration-300 font-bold text-sm text-white ${
            currentLang === "ka" ? "bg-orange-600" : "bg-gray-600 hover:bg-gray-700"
          }`}
        >
          KA
        </button>
        <button
          onClick={() => setCurrentLang("es")}
          className={`px-4 py-2 rounded-full transition-all duration-300 font-bold text-sm text-white ${
            currentLang === "es" ? "bg-orange-600" : "bg-gray-600 hover:bg-gray-700"
          }`}
        >
          ES
        </button>
      </div>
    </div>
  )
}
