"use client"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 text-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-gray-400 text-sm sm:text-base">
            &copy; 2024 ასოციაცია ქართული სახლი ვიტორია გასტეიზში. ყველა უფლება დაცულია.
          </p>
          <div className="inline-flex flex-wrap justify-center gap-2 sm:gap-4">
            <button className="text-white hover:text-orange-500 transition-colors duration-300 font-bold focus:outline-none text-sm sm:text-base">
              ქართულად
            </button>
            <span className="text-gray-500">|</span>
            <button className="text-gray-400 hover:text-orange-500 transition-colors duration-300 font-bold focus:outline-none text-sm sm:text-base">
              Castellano
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
