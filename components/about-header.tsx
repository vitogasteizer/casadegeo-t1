"use client"

import Link from "next/link"

export function AboutHeader() {
  return (
    <header id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920&text=Vitoria-Gasteiz')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 text-white p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold leading-tight tracking-wide">
          ასოციაციის შესახებ
        </h1>
        <nav className="mt-8 sm:mt-12 lg:mt-16">
          <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 text-lg sm:text-xl font-semibold mb-0 pt-0 mt-80">
            <li>
              <Link href="/" className="hover:text-orange-300 transition-colors duration-300">
                საწყისი
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-orange-300 transition-colors duration-300">
                ასოციაციის შესახებ
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-orange-300 transition-colors duration-300">
                ბლოგი
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
