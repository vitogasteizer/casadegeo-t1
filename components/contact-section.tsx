"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react'

type SiteContent = {
  title_ka: string | null
  description_ka: string | null
}

type ContactInfo = {
  address: string
  phone: string
  email: string
  facebook: string
  instagram: string
  youtube: string
}

export function ContactSection() {
  const [content, setContent] = useState<SiteContent | null>(null)
  const supabase = createClient()

  useEffect(() => {
    async function loadContent() {
      const { data, error } = await supabase
        .from("site_content")
        .select("title_ka, description_ka")
        .eq("section", "contact")
        .eq("is_active", true)
        .single()

      if (data && !error) {
        setContent(data)
      }
    }

    loadContent()
  }, [])

  const contactInfo: ContactInfo = {
    address: "Vitoria-Gasteiz, Alava, Spain",
    phone: "+34 XXX XXX XXX",
    email: "info@casageorgiana.es",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  }

  const title = content?.title_ka || "საკონტაქტო ინფორმაცია"

  return (
    <section id="contact" className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Contact Information Card */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-8">{title}</h2>
              </div>

              <div className="space-y-4 lg:space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                    <MapPin className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">მისამართი</h4>
                    <p className="text-gray-600">{contactInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                    <Phone className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">ტელეფონი</h4>
                    <p className="text-gray-600">{contactInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                    <Mail className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">ელ. ფოსტა</h4>
                    <p className="text-gray-600">{contactInfo.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 lg:pt-8 border-t border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">გამოგვყევით სოციალურ ქსელებში</h4>
              <div className="flex space-x-4">
                <a
                  href={contactInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-orange-600 transition duration-300"
                >
                  <Facebook className="w-8 h-8" />
                </a>
                <a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-orange-600 transition duration-300"
                >
                  <Instagram className="w-8 h-8" />
                </a>
                <a
                  href={contactInfo.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-orange-600 transition duration-300"
                >
                  <Youtube className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>

          {/* Map Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-600">
              <h3 className="text-xl font-bold text-white mb-2">ჩვენი მდებარეობა</h3>
              <p className="text-orange-100">მოგვნახეთ რუკაზე</p>
            </div>
            <div className="relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1461.3486389657096!2d-2.67134372990033!3d42.84655938928097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd450f75e2b027b7%3A0x6b107e3a2c07044a!2sVitoria-Gasteiz%2C%20Alava%2C%20Spain!5e0!3m2!1sen!2sge!4v1625907400000!5m2!1sen!2sge"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
