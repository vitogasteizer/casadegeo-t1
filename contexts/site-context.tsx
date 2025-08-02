"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface BlogPost {
  id: number
  title: string
  date: string
  text: string
  category: string
  image: string
  gallery?: string[]
}

interface Teacher {
  name: string
  role: string
  description: string
  photo: string
}

interface Partner {
  name: string
  logo: string
  url: string
}

interface ContactInfo {
  address: string
  phone: string
  email: string
  facebook: string
  instagram: string
  youtube: string
}

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
  teachers: Teacher[]

  // Blog Posts
  blogPosts: BlogPost[]
  categories: string[]

  // Partners
  partners: Partner[]

  // Contact Info
  contactInfo: ContactInfo
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
  ],
  categories: ["events", "news", "education", "culture"],
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
  contactInfo: {
    address: "ქუჩა 123, ვიტორია-გასტეიზი, ესპანეთი",
    phone: "+34 123 456 789",
    email: "info@georgianhouse.es",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  },
}

const SiteContext = createContext<SiteContextType | undefined>(undefined)

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("georgianHouseSiteData")
    if (savedData) {
      setSiteData(JSON.parse(savedData))
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("georgianHouseSiteData", JSON.stringify(siteData))
  }, [siteData])

  const updateSiteData = (section: keyof SiteData, data: any) => {
    setSiteData((prev) => ({
      ...prev,
      [section]: data,
    }))
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
