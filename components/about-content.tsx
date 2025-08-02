"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Users, Target, Calendar, Heart } from "lucide-react"

export function AboutContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const governingBody = [
    {
      name: "ნინო ქართველიშვილი",
      position: "პრეზიდენტი",
      description: "ასოციაციის დამფუძნებელი და მთავარი ორგანიზატორი",
      image: "/placeholder.svg?height=200&width=200&text=პრეზიდენტი",
    },
    {
      name: "გიორგი მესხიშვილი",
      position: "ვიცე-პრეზიდენტი",
      description: "საგანმანათლებლო პროგრამების კოორდინატორი",
      image: "/placeholder.svg?height=200&width=200&text=ვიცე-პრეზიდენტი",
    },
    {
      name: "თამარ ლომიძე",
      position: "მდივანი",
      description: "ადმინისტრაციული საქმიანობის მენეჯერი",
      image: "/placeholder.svg?height=200&width=200&text=მდივანი",
    },
    {
      name: "დავით ბერიძე",
      position: "ხაზინადარი",
      description: "ფინანსური საქმიანობის ხელმძღვანელი",
      image: "/placeholder.svg?height=200&width=200&text=ხაზინადარი",
    },
  ]

  const activities = [
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      title: "საკვირაო სკოლა",
      description: "ქართული ენის, კულტურისა და ისტორიის სწავლება ბავშვებისთვის",
    },
    {
      icon: <Heart className="w-8 h-8 text-orange-600" />,
      title: "ცეკვის სტუდია",
      description: "ქართული ხალხური ცეკვების შესწავლა და შესრულება",
    },
    {
      icon: <Calendar className="w-8 h-8 text-orange-600" />,
      title: "კულტურული ღონისძიებები",
      description: "ქართული ტრადიციების პოპულარიზაცია და ზეიმები",
    },
    {
      icon: <Target className="w-8 h-8 text-orange-600" />,
      title: "საზოგადოებრივი მხარდაჭერა",
      description: "ქართველი ემიგრანტების ინტეგრაციის ხელშეწყობა",
    },
  ]

  const partners = [
    {
      name: "ვიტორია-გასტეიზის მუნიციპალიტეტი",
      logo: "/placeholder.svg?height=100&width=200&text=Municipality",
      url: "https://example.com/municipality",
    },
    {
      name: "ბასკეთის ქვეყნის მთავრობა",
      logo: "/placeholder.svg?height=100&width=200&text=Basque+Government",
      url: "https://example.com/basque-gov",
    },
    {
      name: "საქართველოს საელჩო ესპანეთში",
      logo: "/placeholder.svg?height=100&width=200&text=Georgian+Embassy",
      url: "https://example.com/embassy",
    },
    {
      name: "ქართული კულტურის ცენტრი",
      logo: "/placeholder.svg?height=100&width=200&text=Cultural+Center",
      url: "https://example.com/cultural-center",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      {/* History Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">ჩვენი ისტორია</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          <div>
            <img
              src="/placeholder.svg?height=400&width=600&text=ასოციაციის+დაარსება"
              alt="ასოციაციის დაარსება"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
          <div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              ასოციაცია „ქართული სახლი ვიტორია გასტეიზში" დაარსდა 2021 წლის მარტში ქართველი ემიგრანტების ინიციატივით.
              ჩვენი მთავარი მიზანი იყო ქართული კულტურის, ენისა და ტრადიციების შენარჩუნება და გადაცემა ახალი თაობისთვის.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              დაარსების დღიდან ჩვენ ვმუშაობთ ქართული საზოგადოების გაერთიანებაზე, კულტურული ღონისძიებების ორგანიზებაზე და
              ადგილობრივ ხელისუფლებასთან თანამშრომლობაზე. დღეს ჩვენ ვართ ერთ-ერთი ყველაზე აქტიური კულტურული ორგანიზაცია
              ვიტორია-გასტეიზში.
            </p>
          </div>
        </div>
      </section>

      {/* Governing Body Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">ხელმძღვანელობა</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {governingBody.map((member, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-orange-200"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-orange-600 font-semibold mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Activities and Goals Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">ჩვენი საქმიანობა და მიზნები</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {activities.map((activity, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">{activity.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{activity.title}</h3>
                    <p className="text-gray-600">{activity.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-orange-50">
          <CardHeader>
            <CardTitle className="text-2xl text-center">ჩვენი მისია</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 text-center leading-relaxed">
              ჩვენი მისიაა ქართული კულტურის, ენისა და ტრადიციების შენარჩუნება და პოპულარიზაცია ესპანეთში, ქართველი
              ემიგრანტების ინტეგრაციის ხელშეწყობა და ორი კულტურის შორის ხიდის როლის შესრულება. ჩვენ ვცდილობთ შევქმნათ
              თბილი და მეგობრული გარემო, სადაც ყველა ქართველს შეუძლია იგრძნოს სახლის სითბო.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Members Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">ჩვენი წევრები</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-orange-600 mb-2">150+</div>
              <p className="text-gray-700">რეგისტრირებული წევრი</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-orange-600 mb-2">45</div>
              <p className="text-gray-700">აქტიური მოხალისე</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-orange-600 mb-2">25</div>
              <p className="text-gray-700">საკვირაო სკოლის მოსწავლე</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-700 mb-4">
            ჩვენი ასოციაცია გაერთიანებს სხვადასხვა ასაკის და პროფესიის ქართველებს, რომლებიც ცხოვრობენ ვიტორია-გასტეიზსა
            და მის მიმდებარე რეგიონებში. ჩვენთან შეუძლია გაწევრიანება ყველას, ვისაც სურს ქართული კულტურის შენარჩუნება და
            განვითარება.
          </p>
          <Button className="bg-orange-600 hover:bg-orange-700">გაწევრიანება</Button>
        </div>
      </section>

      {/* Partners Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">ჩვენი პარტნიორები</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8 items-center">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block grayscale hover:grayscale-0 transition-all duration-300 text-center"
            >
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                className="h-20 w-auto object-contain mx-auto mb-2"
              />
              <p className="text-sm text-gray-600">{partner.name}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-100 -mx-4 px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">დაგვიკავშირდით</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Contact Information */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-8">საკონტაქტო ინფორმაცია</h2>
                </div>

                <div className="space-y-4 lg:space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                      <MapPin className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">მისამართი</h4>
                      <p className="text-gray-600">ქუჩა 123, ვიტორია-გასტეიზი, ესპანეთი</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                      <Phone className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">ტელეფონი</h4>
                      <p className="text-gray-600">+34 123 456 789</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                      <Mail className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">ელ. ფოსტა</h4>
                      <p className="text-gray-600">info@georgianhouse.es</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 lg:pt-8 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">გამოგვყევით სოციალურ ქსელებში</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-orange-600 transition duration-300"
                  >
                    <Facebook className="w-8 h-8" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-orange-600 transition duration-300"
                  >
                    <Instagram className="w-8 h-8" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-orange-600 transition duration-300"
                  >
                    <Youtube className="w-8 h-8" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-white">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-2xl font-bold mb-6">მოგვწერეთ</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      placeholder="თქვენი სახელი"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="ელ. ფოსტა"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      name="subject"
                      placeholder="თემა"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="თქვენი შეტყობინება"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                    გაგზავნა
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="mt-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1461.3486389657096!2d-2.67134372990033!3d42.84655938928097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd450f75e2b027b7%3A0x6b107e3a2c07044a!2sVitoria-Gasteiz%2C%20Alava%2C%20Spain!5e0!3m2!1sen!2sge!4v1625907400000!5m2!1sen!2sge"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
