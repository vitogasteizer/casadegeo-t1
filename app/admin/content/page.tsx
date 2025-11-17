"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Plus, Save, X, Eye } from 'lucide-react'
import Link from "next/link"
import { ImageUpload } from "@/components/image-upload"

type SiteContent = {
  id: string
  section: string
  title_ka: string | null
  title_es: string | null
  title_en: string | null
  subtitle_ka: string | null
  subtitle_es: string | null
  subtitle_en: string | null
  description_ka: string | null
  description_es: string | null
  description_en: string | null
  button_text_ka: string | null
  button_text_es: string | null
  button_text_en: string | null
  button_link: string | null
  image_url: string | null
  is_active: boolean
  display_order: number
}

type InfoCard = {
  id: string
  icon: string | null
  title_ka: string
  title_es: string
  title_en: string
  description_ka: string | null
  description_es: string | null
  description_en: string | null
  display_order: number
  is_active: boolean
}

type Partner = {
  id: string
  name: string
  logo_url: string
  website_url: string | null
  description_ka: string | null
  description_es: string | null
  description_en: string | null
  display_order: number
  is_active: boolean
}

type GalleryImage = {
  id: string
  section: string
  title_ka: string | null
  title_es: string | null
  title_en: string | null
  alt_ka: string | null
  alt_es: string | null
  alt_en: string | null
  image_url: string
  thumbnail_url: string | null
  display_order: number
  is_active: boolean
}

export default function AdminContentPage() {
  const supabase = createClient()
  const [activeTab, setActiveTab] = useState("sections")
  const [loading, setLoading] = useState(true)

  // State for different content types
  const [siteContent, setSiteContent] = useState<SiteContent[]>([])
  const [infoCards, setInfoCards] = useState<InfoCard[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])

  // Editing states
  const [editingContent, setEditingContent] = useState<SiteContent | null>(null)
  const [editingCard, setEditingCard] = useState<InfoCard | null>(null)
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null)

  // Form states for new items
  const [newCard, setNewCard] = useState<Partial<InfoCard>>({
    icon: "",
    title_ka: "",
    title_es: "",
    title_en: "",
    description_ka: "",
    description_es: "",
    description_en: "",
    display_order: 0,
    is_active: true,
  })

  const [newPartner, setNewPartner] = useState<Partial<Partner>>({
    name: "",
    logo_url: "",
    website_url: "",
    description_ka: "",
    description_es: "",
    description_en: "",
    display_order: 0,
    is_active: true,
  })

  const [newGalleryImage, setNewGalleryImage] = useState<Partial<GalleryImage>>({
    section: "general",
    image_url: "",
    alt_ka: "",
    alt_es: "",
    alt_en: "",
    display_order: 0,
    is_active: true,
  })

  // Load data
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [contentRes, cardsRes, partnersRes, galleryRes] = await Promise.all([
        supabase.from("site_content").select("*").order("section"),
        supabase.from("info_cards").select("*").order("display_order"),
        supabase.from("partners").select("*").order("display_order"),
        supabase.from("gallery_images").select("*").order("display_order"),
      ])

      if (contentRes.data) setSiteContent(contentRes.data)
      if (cardsRes.data) setInfoCards(cardsRes.data)
      if (partnersRes.data) setPartners(partnersRes.data)
      if (galleryRes.data) setGalleryImages(galleryRes.data)
    } catch (error) {
      console.error("[v0] Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Site Content CRUD
  const updateSiteContent = async () => {
    if (!editingContent) return

    const { error } = await supabase
      .from("site_content")
      .update({
        title_ka: editingContent.title_ka,
        title_es: editingContent.title_es,
        title_en: editingContent.title_en,
        subtitle_ka: editingContent.subtitle_ka,
        subtitle_es: editingContent.subtitle_es,
        subtitle_en: editingContent.subtitle_en,
        description_ka: editingContent.description_ka,
        description_es: editingContent.description_es,
        description_en: editingContent.description_en,
        button_text_ka: editingContent.button_text_ka,
        button_text_es: editingContent.button_text_es,
        button_text_en: editingContent.button_text_en,
        button_link: editingContent.button_link,
        image_url: editingContent.image_url,
      })
      .eq("id", editingContent.id)

    if (!error) {
      await loadData()
      setEditingContent(null)
    } else {
      console.error("[v0] Error updating content:", error)
    }
  }

  // Info Cards CRUD
  const createInfoCard = async () => {
    if (!newCard.title_ka || !newCard.title_es || !newCard.title_en) return

    const { error } = await supabase.from("info_cards").insert([newCard])

    if (!error) {
      await loadData()
      setNewCard({
        icon: "",
        title_ka: "",
        title_es: "",
        title_en: "",
        description_ka: "",
        description_es: "",
        description_en: "",
        display_order: 0,
        is_active: true,
      })
    } else {
      console.error("[v0] Error creating card:", error)
    }
  }

  const updateInfoCard = async () => {
    if (!editingCard) return

    const { error } = await supabase
      .from("info_cards")
      .update({
        icon: editingCard.icon,
        title_ka: editingCard.title_ka,
        title_es: editingCard.title_es,
        title_en: editingCard.title_en,
        description_ka: editingCard.description_ka,
        description_es: editingCard.description_es,
        description_en: editingCard.description_en,
        display_order: editingCard.display_order,
        is_active: editingCard.is_active,
      })
      .eq("id", editingCard.id)

    if (!error) {
      await loadData()
      setEditingCard(null)
    } else {
      console.error("[v0] Error updating card:", error)
    }
  }

  const deleteInfoCard = async (id: string) => {
    const { error } = await supabase.from("info_cards").delete().eq("id", id)
    if (!error) await loadData()
  }

  // Partners CRUD
  const createPartner = async () => {
    if (!newPartner.name || !newPartner.logo_url) return

    const { error } = await supabase.from("partners").insert([newPartner])

    if (!error) {
      await loadData()
      setNewPartner({
        name: "",
        logo_url: "",
        website_url: "",
        description_ka: "",
        description_es: "",
        description_en: "",
        display_order: 0,
        is_active: true,
      })
    } else {
      console.error("[v0] Error creating partner:", error)
    }
  }

  const updatePartner = async () => {
    if (!editingPartner) return

    const { error } = await supabase
      .from("partners")
      .update({
        name: editingPartner.name,
        logo_url: editingPartner.logo_url,
        website_url: editingPartner.website_url,
        description_ka: editingPartner.description_ka,
        description_es: editingPartner.description_es,
        description_en: editingPartner.description_en,
        display_order: editingPartner.display_order,
        is_active: editingPartner.is_active,
      })
      .eq("id", editingPartner.id)

    if (!error) {
      await loadData()
      setEditingPartner(null)
    } else {
      console.error("[v0] Error updating partner:", error)
    }
  }

  const deletePartner = async (id: string) => {
    const { error } = await supabase.from("partners").delete().eq("id", id)
    if (!error) await loadData()
  }

  // Gallery Images CRUD
  const createGalleryImage = async () => {
    if (!newGalleryImage.image_url) return

    const { error } = await supabase.from("gallery_images").insert([newGalleryImage])

    if (!error) {
      await loadData()
      setNewGalleryImage({
        section: "general",
        image_url: "",
        alt_ka: "",
        alt_es: "",
        alt_en: "",
        display_order: 0,
        is_active: true,
      })
    } else {
      console.error("[v0] Error creating gallery image:", error)
    }
  }

  const deleteGalleryImage = async (id: string) => {
    const { error } = await supabase.from("gallery_images").delete().eq("id", id)
    if (!error) await loadData()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>იტვირთება...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">კონტენტის მართვა</h1>
            <div className="flex space-x-4">
              <Link href="/admin" className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                ბლოგის მართვა
              </Link>
              <Link href="/" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <Eye className="w-4 h-4 mr-2" />
                საიტის ნახვა
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sections">სექციები</TabsTrigger>
            <TabsTrigger value="cards">ინფო ბარათები</TabsTrigger>
            <TabsTrigger value="partners">პარტნიორები</TabsTrigger>
            <TabsTrigger value="gallery">გალერეა</TabsTrigger>
          </TabsList>

          <TabsContent value="sections" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>საიტის სექციები</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {siteContent.map((content) => (
                  <div key={content.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold capitalize">{content.section}</h3>
                        <Badge variant={content.is_active ? "default" : "secondary"}>
                          {content.is_active ? "აქტიური" : "არააქტიური"}
                        </Badge>
                      </div>
                      <Button onClick={() => setEditingContent(content)} size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        რედაქტირება
                      </Button>
                    </div>
                    <div className="grid gap-2 text-sm">
                      <div><strong>ქართული:</strong> {content.title_ka}</div>
                      <div><strong>ესპანური:</strong> {content.title_es}</div>
                      <div><strong>ინგლისური:</strong> {content.title_en}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {editingContent && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    სექციის რედაქტირება: {editingContent.section}
                    <Button onClick={() => setEditingContent(null)} size="sm" variant="outline">
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>სათაური (ქართული)</Label>
                      <Input
                        value={editingContent.title_ka || ""}
                        onChange={(e) =>
                          setEditingContent({ ...editingContent, title_ka: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>სათაური (ესპანური)</Label>
                      <Input
                        value={editingContent.title_es || ""}
                        onChange={(e) =>
                          setEditingContent({ ...editingContent, title_es: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>სათაური (ინგლისური)</Label>
                      <Input
                        value={editingContent.title_en || ""}
                        onChange={(e) =>
                          setEditingContent({ ...editingContent, title_en: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>ქვესათაური (ქართული)</Label>
                      <Input
                        value={editingContent.subtitle_ka || ""}
                        onChange={(e) =>
                          setEditingContent({ ...editingContent, subtitle_ka: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>ქვესათაური (ესპანური)</Label>
                      <Input
                        value={editingContent.subtitle_es || ""}
                        onChange={(e) =>
                          setEditingContent({ ...editingContent, subtitle_es: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>ქვესათაური (ინგლისური)</Label>
                      <Input
                        value={editingContent.subtitle_en || ""}
                        onChange={(e) =>
                          setEditingContent({ ...editingContent, subtitle_en: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>აღწერა (ქართული)</Label>
                      <Textarea
                        rows={4}
                        value={editingContent.description_ka || ""}
                        onChange={(e) =>
                          setEditingContent({ ...editingContent, description_ka: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>აღწერა (ესპანური)</Label>
                      <Textarea
                        rows={4}
                        value={editingContent.description_es || ""}
                        onChange={(e) =>
                          setEditingContent({ ...editingContent, description_es: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>აღწერა (ინგლისური)</Label>
                      <Textarea
                        rows={4}
                        value={editingContent.description_en || ""}
                        onChange={(e) =>
                          setEditingContent({ ...editingContent, description_en: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label>სურათი</Label>
                    <ImageUpload
                      currentImage={editingContent.image_url || ""}
                      onUploadComplete={(url) =>
                        setEditingContent({ ...editingContent, image_url: url })
                      }
                      label="სურათის ატვირთვა"
                    />
                  </div>

                  <Button onClick={updateSiteContent} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    შენახვა
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ახალი ინფო ბარათის დამატება</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>აიქონი (emoji)</Label>
                  <Input
                    value={newCard.icon || ""}
                    onChange={(e) => setNewCard({ ...newCard, icon: e.target.value })}
                    placeholder="🏛️"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>სათაური (ქართული)</Label>
                    <Input
                      value={newCard.title_ka || ""}
                      onChange={(e) => setNewCard({ ...newCard, title_ka: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>სათაური (ესპანური)</Label>
                    <Input
                      value={newCard.title_es || ""}
                      onChange={(e) => setNewCard({ ...newCard, title_es: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>სათაური (ინგლისური)</Label>
                    <Input
                      value={newCard.title_en || ""}
                      onChange={(e) => setNewCard({ ...newCard, title_en: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>აღწერა (ქართული)</Label>
                    <Textarea
                      value={newCard.description_ka || ""}
                      onChange={(e) => setNewCard({ ...newCard, description_ka: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>აღწერა (ესპანური)</Label>
                    <Textarea
                      value={newCard.description_es || ""}
                      onChange={(e) => setNewCard({ ...newCard, description_es: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>აღწერა (ინგლისური)</Label>
                    <Textarea
                      value={newCard.description_en || ""}
                      onChange={(e) => setNewCard({ ...newCard, description_en: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={createInfoCard} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  დამატება
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>არსებული ინფო ბარათები</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {infoCards.map((card) => (
                  <div key={card.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{card.icon}</span>
                      <div>
                        <h3 className="font-semibold">{card.title_ka}</h3>
                        <p className="text-sm text-gray-600">{card.description_ka}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={() => setEditingCard(card)} size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button onClick={() => deleteInfoCard(card.id)} size="sm" variant="destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {editingCard && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    ბარათის რედაქტირება
                    <Button onClick={() => setEditingCard(null)} size="sm" variant="outline">
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>აიქონი</Label>
                    <Input
                      value={editingCard.icon || ""}
                      onChange={(e) => setEditingCard({ ...editingCard, icon: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>სათაური (ქართული)</Label>
                      <Input
                        value={editingCard.title_ka}
                        onChange={(e) => setEditingCard({ ...editingCard, title_ka: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>სათაური (ესპანური)</Label>
                      <Input
                        value={editingCard.title_es}
                        onChange={(e) => setEditingCard({ ...editingCard, title_es: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>სათაური (ინგლისური)</Label>
                      <Input
                        value={editingCard.title_en}
                        onChange={(e) => setEditingCard({ ...editingCard, title_en: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button onClick={updateInfoCard} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    განახლება
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="partners" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ახალი პარტნიორის დამატება</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>დასახელება</Label>
                  <Input
                    value={newPartner.name || ""}
                    onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>ლოგო</Label>
                  <ImageUpload
                    currentImage={newPartner.logo_url || ""}
                    onUploadComplete={(url) => setNewPartner({ ...newPartner, logo_url: url })}
                    label="ლოგოს ატვირთვა"
                  />
                </div>
                <div>
                  <Label>ვებსაიტის URL</Label>
                  <Input
                    value={newPartner.website_url || ""}
                    onChange={(e) => setNewPartner({ ...newPartner, website_url: e.target.value })}
                  />
                </div>
                <Button onClick={createPartner} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  დამატება
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>არსებული პარტნიორები</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {partners.map((partner) => (
                  <div key={partner.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src={partner.logo_url || "/placeholder.svg"}
                        alt={partner.name}
                        className="w-16 h-16 object-contain"
                      />
                      <div>
                        <h3 className="font-semibold">{partner.name}</h3>
                        {partner.website_url && (
                          <a
                            href={partner.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            {partner.website_url}
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={() => setEditingPartner(partner)} size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button onClick={() => deletePartner(partner.id)} size="sm" variant="destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {editingPartner && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    პარტნიორის რედაქტირება
                    <Button onClick={() => setEditingPartner(null)} size="sm" variant="outline">
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>დასახელება</Label>
                    <Input
                      value={editingPartner.name}
                      onChange={(e) => setEditingPartner({ ...editingPartner, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>ლოგო</Label>
                    <ImageUpload
                      currentImage={editingPartner.logo_url}
                      onUploadComplete={(url) => setEditingPartner({ ...editingPartner, logo_url: url })}
                      label="ლოგოს ატვირთვა"
                    />
                  </div>
                  <div>
                    <Label>ვებსაიტის URL</Label>
                    <Input
                      value={editingPartner.website_url || ""}
                      onChange={(e) => setEditingPartner({ ...editingPartner, website_url: e.target.value })}
                    />
                  </div>
                  <Button onClick={updatePartner} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    განახლება
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>გალერეაში ფოტოს დამატება</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>სექცია</Label>
                  <Input
                    value={newGalleryImage.section || ""}
                    onChange={(e) => setNewGalleryImage({ ...newGalleryImage, section: e.target.value })}
                    placeholder="general, church, education, etc."
                  />
                </div>
                <div>
                  <Label>სურათი</Label>
                  <ImageUpload
                    currentImage={newGalleryImage.image_url || ""}
                    onUploadComplete={(url) => setNewGalleryImage({ ...newGalleryImage, image_url: url })}
                    label="ფოტოს ატვირთვა"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Alt ტექსტი (ქართული)</Label>
                    <Input
                      value={newGalleryImage.alt_ka || ""}
                      onChange={(e) => setNewGalleryImage({ ...newGalleryImage, alt_ka: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Alt ტექსტი (ესპანური)</Label>
                    <Input
                      value={newGalleryImage.alt_es || ""}
                      onChange={(e) => setNewGalleryImage({ ...newGalleryImage, alt_es: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Alt ტექსტი (ინგლისური)</Label>
                    <Input
                      value={newGalleryImage.alt_en || ""}
                      onChange={(e) => setNewGalleryImage({ ...newGalleryImage, alt_en: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={createGalleryImage} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  დამატება
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>გალერეის ფოტოები</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.image_url || "/placeholder.svg"}
                        alt={image.alt_ka || "Gallery image"}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        onClick={() => deleteGalleryImage(image.id)}
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <div className="text-xs text-gray-600 mt-1">{image.section}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
