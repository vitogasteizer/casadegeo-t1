import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SiteProvider } from "@/contexts/site-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ქართული სახლი ვიტორია გასტეიზში",
  description: "ასოციაცია ქართული სახლი ვიტორია გასტეიზში",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ka">
      <body className={inter.className}>
        <SiteProvider>{children}</SiteProvider>
      </body>
    </html>
  )
}
