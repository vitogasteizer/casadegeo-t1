"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface SiteData {
  // Header
  mainTitle: string

  // About Section
  aboutTitle: string
  aboutText: string
  aboutImage: string

  // Church Section
  churchTitle: string
  churchDescription: string
  holidays: Array<{ day: string; text: string }>

  // Education Section
  educationTitle: string
  teachers: Array<{
    name: string
    role: string
    description: string
    photo: string
  }>

  // Contact Info
  contactInfo: {
    address: string
    phone: string
    email: string
    facebook: string
    instagram: string
    youtube: string
  }

  // Partners
  partners: Array<{
    name: string
    logo: string
    url: string
  }>

  // Blog Posts
  blogPosts: Array<{
    id: number
    title: string
    text: string
    date: string
    image: string
    category: string
    gallery?: string[]
  }>
  categories: string[]

  // Books
  books: Array<{
    id: number
    title: string
    author: string
    description: string
    image: string
    year: string
    genre: string
  }>

  // Gallery Images
  galleryImages: Array<{
    id: number
    url: string
    caption: string
    category: string
  }>
}

interface BlogPost {
  id: number
  title: string
  text: string
  date: string
  image: string
  category: string
  gallery?: string[]
}

const defaultSiteData: SiteData = {
  mainTitle: "ასოციაცია ქართული სახლი ვიტორია გასტეიზში",
  aboutTitle: "ასოციაციის შესახებ",
  aboutText:
    'ასოციაცია „ქართული სახლი ვიტორია გასტეიზში" დაარსდა 2021 წელს ქართული კულტურისა და ტრადიციების პოპულარიზაციის მიზნით. ჩვენ ვართ ადგილი, სადაც ქართული საზოგადოება იკრიბება, ინარჩუნებს კავშირს სამშობლოსთან და აზიარებს თავის კულტურას ადგილობრივ მოსახლეობასთან.',
  aboutImage: "/placeholder.svg?height=400&width=600&text=Georgian+House",
  churchTitle: "ქართული მართლმადიდებლური ტაძარი",
  churchDescription:
    "ჩვენი ასოციაციის ფარგლებში მოქმედებს ქართული მართლმადიდებლური ტაძარი, რომელიც სულიერ თავშესაფარს სთავაზობს ვიტორია გასტეიზში მცხოვრებ ქართველებს. ქვემოთ შეგიძლიათ იხილოთ საეკლესიო განრიგი და კალენდარი.",
  holidays: [
    { day: "15 აგვისტო", text: "მარიამობა" },
    { day: "28 აგვისტო", text: "ფერისცვალება" },
  ],
  educationTitle: "საგანმანათლებლო პროგრამები",
  teachers: [
    {
      name: "ანნა წილოსანი",
      role: "ცეკვის მასწავლებელი",
      description: "ანა არის გამოცდილი ქორეოგრაფი.",
      photo: "/placeholder.svg?height=150&width=150&text=მასწავლებელი+1",
    },
    {
      name: "გიორგი გელაშვილი",
      role: "საკვირაო სკოლის მენტორი",
      description: "გიორგი დიდი სიყვარულით უძღვება ბავშვებს.",
      photo: "/placeholder.svg?height=150&width=150&text=მასწავლებელი+2",
    },
    {
      name: "თამარ ბერიძე",
      role: "საკვირაო სკოლის მასწავლებელი",
      description: "თამარი არის საუკეთესო მასწავლებელი.",
      photo: "/placeholder.svg?height=150&width=150&text=მასწავლებელი+3",
    },
  ],
  contactInfo: {
    address: "ქუჩა 123, ვიტორია-გასტეიზი, ესპანეთი",
    phone: "+34 123 456 789",
    email: "info@georgianhouse.es",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  },
  partners: [
    {
      name: "Partner 1",
      logo: "/placeholder.svg?height=100&width=200&text=Partner+1",
      url: "https://example.com/partner1",
    },
    {
      name: "Partner 2",
      logo: "/placeholder.svg?height=100&width=200&text=Partner+2",
      url: "https://example.com/partner2",
    },
    {
      name: "Partner 3",
      logo: "/placeholder.svg?height=100&width=200&text=Partner+3",
      url: "https://example.com/partner3",
    },
    {
      name: "Partner 4",
      logo: "/placeholder.svg?height=100&width=200&text=Partner+4",
      url: "https://example.com/partner4",
    },
  ],
  blogPosts: [
    {
      id: 1,
      title: "ქართული ცეკვის კონცერტი",
      date: "15.07.2024",
      text: 'ასოციაცია „ქართული სახლი" წარმოგიდგენთ ქართული ცეკვის გრანდიოზულ კონცერტს. მობრძანდით და დატკბით ჩვენი მოცეკვავეების ოსტატობით.',
      category: "events",
      image: "/placeholder.svg?height=400&width=600&text=კონცერტი",
      gallery: [
        "/placeholder.svg?height=400&width=600&text=ცეკვა+1",
        "/placeholder.svg?height=400&width=600&text=ცეკვა+2",
        "/placeholder.svg?height=400&width=600&text=ცეკვა+3",
      ],
    },
    {
      id: 2,
      title: "ახალი სასწავლო წლის დაწყება",
      date: "01.09.2024",
      text: "საკვირაო სკოლაში ახალი სასწავლო წელი იწყება. გელოდებით ჩვენს მოსწავლეებს განახლებული პროგრამებითა და რესურსებით.",
      category: "news",
      image: "/placeholder.svg?height=400&width=600&text=სკოლა",
    },
    {
      id: 3,
      title: "კულინარიული საღამო",
      date: "20.08.2024",
      text: "გეპატიჟებით ქართული კულინარიის საღამოზე, სადაც ერთად მოვამზადებთ და დავაგემოვნებთ ტრადიციულ კერძებს.",
      category: "events",
      image: "/placeholder.svg?height=400&width=600&text=საღამო",
    },
    {
      id: 4,
      title: "ქართული კულტურის დღე",
      text: "მაისის თვეში ჩატარდება ქართული კულტურის დღე, სადაც წარმოდგენილი იქნება ქართული ხელოვნება, მუსიკა და გასტრონომია.",
      date: "2023-12-25",
      image: "/placeholder.svg?height=400&width=600&text=კულტურა",
      category: "events",
    },
    {
      id: 5,
      title: "ახალგაზრდული პროგრამები",
      text: "დაიწყო რეგისტრაცია ახალგაზრდული პროგრამებისთვის, რომელიც მოიცავს სპორტულ აქტივობებს და კულტურულ ღონისძიებებს.",
      date: "2023-12-20",
      image: "/placeholder.svg?height=400&width=600&text=ახალგაზრდები",
      category: "news",
    },
    {
      id: 6,
      title: "ქალთა კლუბის შეხვედრა",
      text: "ყოველ კვირას ტარდება ქალთა კლუბის შეხვედრები, სადაც განიხილება სხვადასხვა თემები და იმართება ხელნაკეთობების მასტერკლასები.",
      date: "2023-12-15",
      image: "/placeholder.svg?height=400&width=600&text=ქალები",
      category: "culture",
    },
    {
      id: 7,
      title: "ქართული ფილმების ფესტივალი",
      text: "ნოემბერში ჩატარდა ქართული კინემატოგრაფიის ფესტივალი, სადაც ნაჩვენები იყო კლასიკური და თანამედროვე ქართული ფილმები.",
      date: "2023-12-10",
      image: "/placeholder.svg?height=400&width=600&text=კინო",
      category: "culture",
    },
    {
      id: 8,
      title: "საბავშვო ღონისძიებები",
      text: "ყოველ შაბათს ტარდება საბავშვო ღონისძიებები, სადაც ბავშვები სწავლობენ ქართულ ენას, ცეკვებს და ტრადიციებს.",
      date: "2023-12-05",
      image: "/placeholder.svg?height=400&width=600&text=ბავშვები",
      category: "education",
    },
    {
      id: 9,
      title: "ქართული სამზარეულოს კურსები",
      text: "დაიწყო ქართული სამზარეულოს სწავლების კურსები, სადაც მონაწილეები ისწავლიან ტრადიციული ქართული კერძების მომზადებას.",
      date: "2023-11-30",
      image: "/placeholder.svg?height=400&width=600&text=სამზარეულო",
      category: "culture",
    },
    {
      id: 10,
      title: "მუსიკალური ღონისძიება",
      text: "ჩატარდა ქართული მუსიკის საღამო, სადაც წარმოდგენილი იყო როგორც ტრადიციული, ასევე თანამედროვე ქართული მუსიკა.",
      date: "2023-11-25",
      image: "/placeholder.svg?height=400&width=600&text=მუსიკა",
      category: "culture",
    },
    {
      id: 11,
      title: "ქართული ცეკვების ჯგუფი",
      text: "ჩამოყალიბდა ქართული ცეკვების ჯგუფი, რომელიც ყოველ კვირას ვარჯიშობს და მონაწილეობს სხვადასხვა ღონისძიებებში.",
      date: "2023-11-20",
      image: "/placeholder.svg?height=400&width=600&text=ცეკვა",
      category: "culture",
    },
    {
      id: 12,
      title: "ქართული ხელნაკეთობები",
      text: "ორგანიზდება ქართული ხელნაკეთობების გამოფენა, სადაც წარმოდგენილი იქნება ტრადიციული ქართული ხელსაქმე ნაწარმოებები.",
      date: "2023-11-15",
      image: "/placeholder.svg?height=400&width=600&text=ხელნაკეთობა",
      category: "culture",
    },
    {
      id: 13,
      title: "ქართული ლიტერატურის კლუბი",
      text: "შეიქმნა ქართული ლიტერატურის კლუბი, სადაც ყოველთვიურად განიხილება ქართული ავტორების ნაწარმოებები.",
      date: "2023-11-10",
      image: "/placeholder.svg?height=400&width=600&text=ლიტერატურა",
      category: "education",
    },
    {
      id: 14,
      title: "ქართული ისტორიის ლექციები",
      text: "დაიწყო ქართული ისტორიის ლექციების ციკლი, რომელიც მოიცავს საქართველოს ისტორიის სხვადასხვა პერიოდებს.",
      date: "2023-11-05",
      image: "/placeholder.svg?height=400&width=600&text=ისტორია",
      category: "education",
    },
    {
      id: 15,
      title: "ქართული ღვინის დეგუსტაცია",
      text: "ჩატარდა ქართული ღვინის დეგუსტაცია, სადაც წარმოდგენილი იყო საქართველოს სხვადასხვა რეგიონების ღვინოები.",
      date: "2023-10-30",
      image: "/placeholder.svg?height=400&width=600&text=ღვინო",
      category: "culture",
    },
  ],
  categories: ["events", "news", "education", "culture"],
  books: [
    {
      id: 1,
      title: "ვეფხისტყაოსანი",
      author: "შოთა რუსთაველი",
      description: "ქართული ლიტერატურის უდიდესი ძეგლი",
      image: "/placeholder.svg?height=200&width=150&text=ვეფხისტყაოსანი",
      year: "XII საუკუნე",
      genre: "ეპოსი",
    },
    {
      id: 2,
      title: "მამის მკვლელი",
      author: "ალექსანდრე ყაზბეგი",
      description: "ქართული რეალისტური ლიტერატურის შედევრი",
      image: "/placeholder.svg?height=200&width=150&text=მამის+მკვლელი",
      year: "1882",
      genre: "რომანი",
    },
  ],
  galleryImages: [
    {
      id: 1,
      url: "/placeholder.svg?height=300&width=400&text=გალერეა+1",
      caption: "ახალი წლის ღონისძიება",
      category: "events",
    },
    {
      id: 2,
      url: "/placeholder.svg?height=300&width=400&text=გალერეა+2",
      caption: "ქართული ენის კურსები",
      category: "education",
    },
  ],
}

interface SiteContextType {
  siteData: SiteData
  updateSiteData: (section: keyof SiteData, data: any) => void
  addBlogPost: (post: Omit<BlogPost, "id">) => void
  updateBlogPost: (id: number, post: Partial<BlogPost>) => void
  deleteBlogPost: (id: number) => void
  addCategory: (category: string) => void
  removeCategory: (category: string) => void
}

const SiteContext = createContext<SiteContextType | undefined>(undefined)

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData)

  useEffect(() => {
    const savedData = localStorage.getItem("siteData")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setSiteData({ ...defaultSiteData, ...parsedData })
      } catch (error) {
        console.error("Error parsing saved site data:", error)
      }
    }
  }, [])

  const updateSiteData = (data: Partial<SiteData>) => {
    const newData = { ...siteData, ...data }
    setSiteData(newData)
    localStorage.setItem("siteData", JSON.stringify(newData))
  }

  const addBlogPost = (post: Omit<BlogPost, "id">) => {
    const newId = Math.max(...siteData.blogPosts.map((p) => p.id), 0) + 1
    const newPost = { ...post, id: newId }
    setSiteData((prev) => ({
      ...prev,
      blogPosts: [newPost, ...prev.blogPosts],
    }))
  }

  const updateBlogPost = (id: number, updatedPost: Partial<BlogPost>) => {
    setSiteData((prev) => ({
      ...prev,
      blogPosts: prev.blogPosts.map((post) => (post.id === id ? { ...post, ...updatedPost } : post)),
    }))
  }

  const deleteBlogPost = (id: number) => {
    setSiteData((prev) => ({
      ...prev,
      blogPosts: prev.blogPosts.filter((post) => post.id !== id),
    }))
  }

  const addCategory = (category: string) => {
    if (!siteData.categories.includes(category)) {
      setSiteData((prev) => ({
        ...prev,
        categories: [...prev.categories, category],
      }))
    }
  }

  const removeCategory = (category: string) => {
    setSiteData((prev) => ({
      ...prev,
      categories: prev.categories.filter((cat) => cat !== category),
    }))
  }

  return (
    <SiteContext.Provider
      value={{
        siteData,
        updateSiteData,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addCategory,
        removeCategory,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

export function useSiteData() {
  const context = useContext(SiteContext)
  if (context === undefined) {
    throw new Error("useSiteData must be used within a SiteProvider")
  }
  return context
}
