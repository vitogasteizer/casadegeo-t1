"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useSiteData } from "@/contexts/site-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Trash2,
  Edit,
  Plus,
  Save,
  X,
  Eye,
  Upload,
  Bold,
  Italic,
  Underline,
  List,
  LinkIcon,
  ImageIcon,
} from "lucide-react"
import Link from "next/link"

export function AdminDashboard() {
  const { siteData, updateSiteData, addBlogPost, updateBlogPost, deleteBlogPost, addCategory, removeCategory } =
    useSiteData()
  const [activeTab, setActiveTab] = useState("general")
  const [editingPost, setEditingPost] = useState<any>(null)
  const [newCategory, setNewCategory] = useState("")

  // Form states
  const [generalForm, setGeneralForm] = useState({
    mainTitle: siteData.mainTitle,
    aboutTitle: siteData.aboutTitle,
    aboutText: siteData.aboutText,
    aboutImage: siteData.aboutImage,
  })

  const [churchForm, setChurchForm] = useState({
    churchTitle: siteData.churchTitle,
    churchDescription: siteData.churchDescription,
    holidays: [...siteData.holidays],
  })

  const [contactForm, setContactForm] = useState({
    ...siteData.contactInfo,
  })

  const [blogForm, setBlogForm] = useState({
    title: "",
    text: "",
    category: "",
    image: "",
    gallery: [] as string[],
  })

  const [editorContent, setEditorContent] = useState("")
  const [selectedText, setSelectedText] = useState("")
  const [editorRef, setEditorRef] = useState<HTMLDivElement | null>(null)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const coverImageInputRef = useRef<HTMLInputElement>(null)

  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    description: "",
    cover: "",
  })

  const [editingBook, setEditingBook] = useState<any>(null)
  const [editingBookIndex, setEditingBookIndex] = useState<number | null>(null)
  const [galleryImageUrl, setGalleryImageUrl] = useState("")

  const bookCoverInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  const handleBookCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setBookForm((prev) => ({ ...prev, cover: imageUrl }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreateBook = () => {
    if (bookForm.title && bookForm.author && bookForm.description) {
      const currentBooks = siteData.books || []
      updateSiteData("books", [...currentBooks, bookForm])
      setBookForm({
        title: "",
        author: "",
        description: "",
        cover: "",
      })
    }
  }

  const handleEditBook = (book: any, index: number) => {
    setEditingBook({ ...book })
    setEditingBookIndex(index)
  }

  const handleUpdateBook = () => {
    if (editingBook && editingBookIndex !== null) {
      const currentBooks = [...(siteData.books || [])]
      currentBooks[editingBookIndex] = editingBook
      updateSiteData("books", currentBooks)
      setEditingBook(null)
      setEditingBookIndex(null)
    }
  }

  const handleDeleteBook = (index: number) => {
    const currentBooks = [...(siteData.books || [])]
    currentBooks.splice(index, 1)
    updateSiteData("books", currentBooks)
  }

  const handleGalleryImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setGalleryImageUrl(imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddGalleryImage = () => {
    if (galleryImageUrl.trim()) {
      const currentImages = siteData.galleryImages || []
      updateSiteData("galleryImages", [...currentImages, galleryImageUrl])
      setGalleryImageUrl("")
    }
  }

  const handleDeleteGalleryImage = (index: number) => {
    const currentImages = [...(siteData.galleryImages || [])]
    currentImages.splice(index, 1)
    updateSiteData("galleryImages", currentImages)
  }

  const handleSaveGeneral = () => {
    updateSiteData("mainTitle", generalForm.mainTitle)
    updateSiteData("aboutTitle", generalForm.aboutTitle)
    updateSiteData("aboutText", generalForm.aboutText)
    updateSiteData("aboutImage", generalForm.aboutImage)
  }

  const handleSaveChurch = () => {
    updateSiteData("churchTitle", churchForm.churchTitle)
    updateSiteData("churchDescription", churchForm.churchDescription)
    updateSiteData("holidays", churchForm.holidays)
  }

  const handleSaveContact = () => {
    updateSiteData("contactInfo", contactForm)
  }

  const handleAddHoliday = () => {
    setChurchForm((prev) => ({
      ...prev,
      holidays: [...prev.holidays, { day: "", text: "" }],
    }))
  }

  const handleRemoveHoliday = (index: number) => {
    setChurchForm((prev) => ({
      ...prev,
      holidays: prev.holidays.filter((_, i) => i !== index),
    }))
  }

  const handleHolidayChange = (index: number, field: "day" | "text", value: string) => {
    setChurchForm((prev) => ({
      ...prev,
      holidays: prev.holidays.map((holiday, i) => (i === index ? { ...holiday, [field]: value } : holiday)),
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, isCover = false) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        if (isCover) {
          setBlogForm((prev) => ({ ...prev, image: imageUrl }))
        } else {
          setUploadedImages((prev) => [...prev, imageUrl])
          insertImageIntoEditor(imageUrl)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const insertImageIntoEditor = (imageUrl: string) => {
    if (editorRef) {
      const img = document.createElement("img")
      img.src = imageUrl
      img.style.maxWidth = "100%"
      img.style.height = "auto"
      img.style.margin = "10px 0"
      editorRef.appendChild(img)
      setEditorContent(editorRef.innerHTML)
    }
  }

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    if (editorRef) {
      setEditorContent(editorRef.innerHTML)
    }
  }

  const handleEditorChange = () => {
    if (editorRef) {
      const content = editorRef.innerHTML
      setEditorContent(content)
      setBlogForm((prev) => ({ ...prev, text: content }))
    }
  }

  const handleCreateBlogPost = () => {
    if (blogForm.title && editorContent && blogForm.category) {
      addBlogPost({
        ...blogForm,
        text: editorContent,
        date: new Date().toLocaleDateString("ka-GE"),
        gallery: uploadedImages.length > 0 ? uploadedImages : undefined,
      })
      setBlogForm({
        title: "",
        text: "",
        category: "",
        image: "",
        gallery: [],
      })
      setEditorContent("")
      setUploadedImages([])
      if (editorRef) {
        editorRef.innerHTML = ""
      }
    }
  }

  const handleEditBlogPost = (post: any) => {
    setEditingPost({ ...post })
  }

  const handleUpdateBlogPost = () => {
    if (editingPost) {
      updateBlogPost(editingPost.id, editingPost)
      setEditingPost(null)
    }
  }

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim())
      setNewCategory("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">ადმინისტრაციული პანელი</h1>
            <div className="flex space-x-4">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Eye className="w-4 h-4 mr-2" />
                საიტის ნახვა
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">ზოგადი</TabsTrigger>
            <TabsTrigger value="church">ეკლესია</TabsTrigger>
            <TabsTrigger value="blog">ბლოგი</TabsTrigger>
            <TabsTrigger value="library">ბიბლიოთეკა</TabsTrigger>
            <TabsTrigger value="gallery">გალერეა</TabsTrigger>
            <TabsTrigger value="contact">კონტაქტი</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ზოგადი ინფორმაცია</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="mainTitle">მთავარი სათაური</Label>
                  <Input
                    id="mainTitle"
                    value={generalForm.mainTitle}
                    onChange={(e) => setGeneralForm((prev) => ({ ...prev, mainTitle: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="aboutTitle">ასოციაციის სათაური</Label>
                  <Input
                    id="aboutTitle"
                    value={generalForm.aboutTitle}
                    onChange={(e) => setGeneralForm((prev) => ({ ...prev, aboutTitle: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="aboutText">ასოციაციის აღწერა</Label>
                  <Textarea
                    id="aboutText"
                    rows={4}
                    value={generalForm.aboutText}
                    onChange={(e) => setGeneralForm((prev) => ({ ...prev, aboutText: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="aboutImage">ასოციაციის სურათი (URL)</Label>
                  <Input
                    id="aboutImage"
                    value={generalForm.aboutImage}
                    onChange={(e) => setGeneralForm((prev) => ({ ...prev, aboutImage: e.target.value }))}
                  />
                </div>
                <Button onClick={handleSaveGeneral} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  შენახვა
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="church" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ეკლესიის ინფორმაცია</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="churchTitle">ეკლესიის სათაური</Label>
                  <Input
                    id="churchTitle"
                    value={churchForm.churchTitle}
                    onChange={(e) => setChurchForm((prev) => ({ ...prev, churchTitle: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="churchDescription">ეკლესიის აღწერა</Label>
                  <Textarea
                    id="churchDescription"
                    rows={4}
                    value={churchForm.churchDescription}
                    onChange={(e) => setChurchForm((prev) => ({ ...prev, churchDescription: e.target.value }))}
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Label>დღესასწაულები</Label>
                    <Button onClick={handleAddHoliday} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      დამატება
                    </Button>
                  </div>
                  {churchForm.holidays.map((holiday, index) => (
                    <div key={index} className="flex space-x-2 items-center">
                      <Input
                        placeholder="თარიღი"
                        value={holiday.day}
                        onChange={(e) => handleHolidayChange(index, "day", e.target.value)}
                      />
                      <Input
                        placeholder="დღესასწაული"
                        value={holiday.text}
                        onChange={(e) => handleHolidayChange(index, "text", e.target.value)}
                      />
                      <Button onClick={() => handleRemoveHoliday(index)} size="sm" variant="destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button onClick={handleSaveChurch} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  შენახვა
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ახალი ბლოგ პოსტი</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="blogTitle">სათაური</Label>
                  <Input
                    id="blogTitle"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="blogCategory">კატეგორია</Label>
                  <div className="flex space-x-2">
                    <Select
                      value={blogForm.category}
                      onValueChange={(value) => setBlogForm((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="აირჩიეთ კატეგორია" />
                      </SelectTrigger>
                      <SelectContent>
                        {siteData.categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex space-x-1">
                      <Input
                        placeholder="ახალი კატეგორია"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-32"
                      />
                      <Button onClick={handleAddCategory} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {siteData.categories.map((category) => (
                      <Badge key={category} variant="secondary" className="flex items-center space-x-1">
                        <span>{category}</span>
                        <button
                          onClick={() => removeCategory(category)}
                          className="ml-1 text-red-500 hover:text-red-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>კავერ სურათი</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={blogForm.image}
                      onChange={(e) => setBlogForm((prev) => ({ ...prev, image: e.target.value }))}
                      placeholder="სურათის URL ან ატვირთეთ ფაილი"
                      className="flex-1"
                    />
                    <Button onClick={() => coverImageInputRef.current?.click()} variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      ატვირთვა
                    </Button>
                  </div>
                  <input
                    ref={coverImageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, true)}
                    className="hidden"
                  />
                  {blogForm.image && (
                    <img
                      src={blogForm.image || "/placeholder.svg"}
                      alt="Cover preview"
                      className="mt-2 max-w-xs h-auto rounded"
                    />
                  )}
                </div>

                <div>
                  <Label>ტექსტი</Label>
                  <div className="border rounded-lg">
                    {/* Toolbar */}
                    <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
                      <Button size="sm" variant="outline" onClick={() => formatText("bold")} className="p-2">
                        <Bold className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => formatText("italic")} className="p-2">
                        <Italic className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => formatText("underline")} className="p-2">
                        <Underline className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => formatText("insertUnorderedList")}
                        className="p-2"
                      >
                        <List className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const url = prompt("შეიყვანეთ ლინკი:")
                          if (url) formatText("createLink", url)
                        }}
                        className="p-2"
                      >
                        <LinkIcon className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()} className="p-2">
                        <ImageIcon className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Editor */}
                    <div
                      ref={setEditorRef}
                      contentEditable
                      onInput={handleEditorChange}
                      className="min-h-[200px] p-4 focus:outline-none"
                      style={{ whiteSpace: "pre-wrap" }}
                      dangerouslySetInnerHTML={{ __html: editorContent }}
                    />
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, false)}
                    className="hidden"
                  />
                </div>

                <Button onClick={handleCreateBlogPost} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  პოსტის დამატება
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>არსებული პოსტები</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {siteData.blogPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{post.title}</h3>
                        <p className="text-sm text-gray-600">
                          {post.date} • {post.category}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={() => handleEditBlogPost(post)} size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => deleteBlogPost(post.id)} size="sm" variant="destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {editingPost && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    პოსტის რედაქტირება
                    <Button onClick={() => setEditingPost(null)} size="sm" variant="outline">
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>სათაური</Label>
                    <Input
                      value={editingPost.title}
                      onChange={(e) => setEditingPost((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>ტექსტი</Label>
                    <Textarea
                      rows={4}
                      value={editingPost.text}
                      onChange={(e) => setEditingPost((prev) => ({ ...prev, text: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>კატეგორია</Label>
                    <Select
                      value={editingPost.category}
                      onValueChange={(value) => setEditingPost((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {siteData.categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>სურათი (URL)</Label>
                    <Input
                      value={editingPost.image}
                      onChange={(e) => setEditingPost((prev) => ({ ...prev, image: e.target.value }))}
                    />
                  </div>
                  <Button onClick={handleUpdateBlogPost} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    განახლება
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="library" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ახალი წიგნის დამატება</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="bookTitle">წიგნის სახელი</Label>
                  <Input
                    id="bookTitle"
                    value={bookForm.title}
                    onChange={(e) => setBookForm((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="bookAuthor">ავტორი</Label>
                  <Input
                    id="bookAuthor"
                    value={bookForm.author}
                    onChange={(e) => setBookForm((prev) => ({ ...prev, author: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="bookDescription">აღწერა</Label>
                  <Textarea
                    id="bookDescription"
                    rows={3}
                    value={bookForm.description}
                    onChange={(e) => setBookForm((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>კავერის სურათი</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={bookForm.cover}
                      onChange={(e) => setBookForm((prev) => ({ ...prev, cover: e.target.value }))}
                      placeholder="სურათის URL ან ატვირთეთ ფაილი"
                      className="flex-1"
                    />
                    <Button onClick={() => bookCoverInputRef.current?.click()} variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      ატვირთვა
                    </Button>
                  </div>
                  <input
                    ref={bookCoverInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleBookCoverUpload(e)}
                    className="hidden"
                  />
                  {bookForm.cover && (
                    <img
                      src={bookForm.cover || "/placeholder.svg"}
                      alt="Book cover preview"
                      className="mt-2 w-24 h-32 object-cover rounded"
                    />
                  )}
                </div>
                <Button onClick={handleCreateBook} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  წიგნის დამატება
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>არსებული წიგნები</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {siteData.books?.map((book, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={book.cover || "/placeholder.svg"}
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-semibold">{book.title}</h3>
                          <p className="text-sm text-gray-600">ავტორი: {book.author}</p>
                          <p className="text-xs text-gray-500">{book.description.slice(0, 100)}...</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={() => handleEditBook(book, index)} size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => handleDeleteBook(index)} size="sm" variant="destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )) || <p className="text-gray-500">წიგნები არ არის დამატებული</p>}
                </div>
              </CardContent>
            </Card>

            {editingBook && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    წიგნის რედაქტირება
                    <Button onClick={() => setEditingBook(null)} size="sm" variant="outline">
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>წიგნის სახელი</Label>
                    <Input
                      value={editingBook.title}
                      onChange={(e) => setEditingBook((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>ავტორი</Label>
                    <Input
                      value={editingBook.author}
                      onChange={(e) => setEditingBook((prev) => ({ ...prev, author: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>აღწერა</Label>
                    <Textarea
                      rows={3}
                      value={editingBook.description}
                      onChange={(e) => setEditingBook((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>კავერის სურათი (URL)</Label>
                    <Input
                      value={editingBook.cover}
                      onChange={(e) => setEditingBook((prev) => ({ ...prev, cover: e.target.value }))}
                    />
                  </div>
                  <Button onClick={handleUpdateBook} className="bg-green-600 hover:bg-green-700">
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
                  <Label>ფოტოს ატვირთვა</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={galleryImageUrl}
                      onChange={(e) => setGalleryImageUrl(e.target.value)}
                      placeholder="სურათის URL ან ატვირთეთ ფაილი"
                      className="flex-1"
                    />
                    <Button onClick={() => galleryInputRef.current?.click()} variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      ატვირთვა
                    </Button>
                    <Button onClick={handleAddGalleryImage} className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      დამატება
                    </Button>
                  </div>
                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleGalleryImageUpload(e)}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>გალერეის ფოტოები</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {siteData.galleryImages?.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        onClick={() => handleDeleteGalleryImage(index)}
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )) || <p className="text-gray-500">გალერეაში ფოტოები არ არის დამატებული</p>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>საკონტაქტო ინფორმაცია</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">მისამართი</Label>
                  <Input
                    id="address"
                    value={contactForm.address}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, address: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">ტელეფონი</Label>
                  <Input
                    id="phone"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">ელ. ფოსტა</Label>
                  <Input
                    id="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={contactForm.facebook}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, facebook: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={contactForm.instagram}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, instagram: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="youtube">YouTube</Label>
                  <Input
                    id="youtube"
                    value={contactForm.youtube}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, youtube: e.target.value }))}
                  />
                </div>
                <Button onClick={handleSaveContact} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  შენახვა
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
