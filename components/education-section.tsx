"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ExternalLink } from "lucide-react"
import { useSiteData } from "@/contexts/site-context"

export function EducationSection() {
  const { siteData } = useSiteData()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [visibleBooksCount, setVisibleBooksCount] = useState(5)

  const learningResources = [
    { text: "ბიბლიის შესწავლა", link: "https://example.com/resource1" },
    { text: "ქართული ლიტერატურა", link: "https://example.com/resource2" },
  ]

  const videoResources = [
    { text: "საუბრები მოძღვართან", link: "https://example.com/video1" },
    { text: "საბავშვო სიმღერები", link: "https://example.com/video2" },
  ]

  const galleryImages = siteData.galleryImages || [
    "/placeholder.svg?height=400&width=600&text=გალერეის+ფოტო+1",
    "/placeholder.svg?height=400&width=600&text=გალერეის+ფოტო+2",
    "/placeholder.svg?height=400&width=600&text=გალერეის+ფოტო+3",
    "/placeholder.svg?height=400&width=600&text=გალერეის+ფოტო+4",
    "/placeholder.svg?height=400&width=600&text=გალერეის+ფოტო+5",
    "/placeholder.svg?height=400&width=600&text=გალერეის+ფოტო+6",
    "/placeholder.svg?height=400&width=600&text=გალერეის+ფოტო+7",
    "/placeholder.svg?height=400&width=600&text=გალერეის+ფოტო+8",
  ]

  const allBooks = siteData.books || [
    {
      title: "ვეფხისტყაოსანი",
      author: "შოთა რუსთაველი",
      description: "ქართული ლიტერატურის შედევრი, ეპიკური პოემა.",
      cover: "/placeholder.svg?height=300&width=200&text=ვეფხისტყაოსანი",
    },
    {
      title: "მამლუქი",
      author: "კონსტანტინე გამსახურდია",
      description: "ისტორიული რომანი ოსმალეთის იმპერიის პერიოდზე.",
      cover: "/placeholder.svg?height=300&width=200&text=მამლუქი",
    },
    {
      title: "დიდოსტატის მარჯვენა",
      author: "კონსტანტინე გამსახურდია",
      description: "ისტორიული რომანი, რომელიც მოგვითხრობს მეფე გიორგი I-ის და მისი დროის შესახებ.",
      cover: "/placeholder.svg?height=300&width=200&text=დიდოსტატის+მარჯვენა",
    },
    {
      title: "ჯაყოს ხიზნები",
      author: "მიხეილ ჯავახიშვილი",
      description: "ქართული ლიტერატურის კლასიკა, სოციალური რომანი.",
      cover: "/placeholder.svg?height=300&width=200&text=ჯაყოს+ხიზნები",
    },
    {
      title: "გოგონა სვანი მთიდან",
      author: "ლელა წურწუმია",
      description: "თანამედროვე ქართული მოთხრობა სვანეთის შესახებ.",
      cover: "/placeholder.svg?height=300&width=200&text=გოგონა+სვანი+მთიდან",
    },
    {
      title: "ოთარაანთ ქვრივი",
      author: "ილია ჭავჭავაძე",
      description: "ქართული რეალიზმის ერთ-ერთი გამორჩეული ნაწარმოები.",
      cover: "/placeholder.svg?height=300&width=200&text=ოთარაანთ+ქვრივი",
    },
    {
      title: "კაცია ადამიანი?!",
      author: "ილია ჭავჭავაძე",
      description: "ილია ჭავჭავაძის ცნობილი მოთხრობა.",
      cover: "/placeholder.svg?height=300&width=200&text=კაცია+ადამიანი?!",
    },
    {
      title: "მთვარის მოტაცება",
      author: "კონსტანტინე გამსახურდია",
      description: "რომანი, რომელიც ასახავს ქართული სოფლის ცხოვრებას.",
      cover: "/placeholder.svg?height=300&width=200&text=მთვარის+მოტაცება",
    },
    {
      title: "ქეთო და კოტე",
      author: "ლევან გოთუა",
      description: "პოპულარული ქართული კომედია.",
      cover: "/placeholder.svg?height=300&width=200&text=ქეთო+და+კოტე",
    },
    {
      title: "დათა თუთაშხია",
      author: "ჭაბუა ამირეჯიბი",
      description: "ეპიკური რომანი ქართველი ყაჩაღის ცხოვრებაზე.",
      cover: "/placeholder.svg?height=300&width=200&text=დათა+თუთაშხია",
    },
    {
      title: "ალუბლის ყვავილობა",
      author: "ვაჟა-ფშაველა",
      description: "ქართული პოეზიის შედევრი.",
      cover: "/placeholder.svg?height=300&width=200&text=ალუბლის+ყვავილობა",
    },
    {
      title: "ბაში-აჩუკი",
      author: "ვაჟა-ფშაველა",
      description: "ეპიკური პოემა მთიელთა ცხოვრებაზე.",
      cover: "/placeholder.svg?height=300&width=200&text=ბაში-აჩუკი",
    },
    {
      title: "ნატვრის ხე",
      author: "ნოდარ დუმბაძე",
      description: "თანამედროვე ქართული პროზის შედევრი.",
      cover: "/placeholder.svg?height=300&width=200&text=ნატვრის+ხე",
    },
    {
      title: "მე, ბებია, ილიკო და ილარიონი",
      author: "ნოდარ დუმბაძე",
      description: "ავტობიოგრაფიული რომანი.",
      cover: "/placeholder.svg?height=300&width=200&text=მე+ბებია+ილიკო",
    },
    {
      title: "თეთრი ღამე",
      author: "ზურაბ ქარუმიძე",
      description: "თანამედროვე ქართული ლიტერატურა.",
      cover: "/placeholder.svg?height=300&width=200&text=თეთრი+ღამე",
    },
  ]

  const openGalleryModal = (imageSrc: string, index: number) => {
    setSelectedImage(imageSrc)
    setCurrentImageIndex(index)
    setIsGalleryModalOpen(true)
  }

  const closeGalleryModal = () => {
    setIsGalleryModalOpen(false)
    setSelectedImage(null)
  }

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % galleryImages.length
    setCurrentImageIndex(nextIndex)
    setSelectedImage(galleryImages[nextIndex])
  }

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length
    setCurrentImageIndex(prevIndex)
    setSelectedImage(galleryImages[prevIndex])
  }

  const loadMoreBooks = () => {
    setVisibleBooksCount((prev) => Math.min(prev + 5, allBooks.length))
  }

  const filteredBooks = allBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <section id="education" className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">{siteData.educationTitle}</h2>
      <div className="bg-white p-6 shadow-xl rounded-md">
        <Tabs defaultValue="school" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1">
            <TabsTrigger value="school">საკვირაო სკოლა</TabsTrigger>
            <TabsTrigger value="dance">ცეკვის სტუდია</TabsTrigger>
            <TabsTrigger value="teachers">მასწავლებლები</TabsTrigger>
            <TabsTrigger value="resources">რესურსები</TabsTrigger>
            <TabsTrigger value="gallery">გალერეა</TabsTrigger>
            <TabsTrigger value="library">ბიბლიოთეკა</TabsTrigger>
          </TabsList>

          <TabsContent value="school" className="mt-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  ჩვენს საკვირაო სკოლაში ბავშვები ეცნობიან მართლმადიდებლურ სარწმუნოებას, ეკლესიის ისტორიასა და
                  ტრადიციებს. ჩვენი მიზანია, ბავშვებმა შეინარჩუნონ კავშირი ქართულ კულტურასთან.
                </p>
                <h4 className="text-xl font-bold mt-4 mb-2">მიღების პროცედურა:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 pl-4">
                  <li>შევსებული განაცხადის ფორმა.</li>
                  <li>გასაუბრება მოძღვართან.</li>
                </ul>
              </div>
              <div className="rounded-md">
                <img
                  src="/placeholder.svg?height=400&width=600&text=საკვირაო+სკოლა"
                  alt="საკვირაო სკოლის ფოტო"
                  className="rounded-xl shadow-md w-full h-auto"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dance" className="mt-6">
            <div className="space-y-8">
              <div className="relative w-full aspect-video shadow-md overflow-hidden rounded-md">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4 bg-gray-100 shadow-inner rounded-md">
                <h4 className="text-xl font-bold mb-2">მიღების პროცედურა:</h4>
                <p className="text-gray-700 mb-2">
                  ჩვენს ცეკვის სტუდიაში მიღება ხორციელდება გასაუბრებისა და საცდელი გაკვეთილის საფუძველზე.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 pl-4">
                  <li>ონლაინ რეგისტრაცია.</li>
                  <li>გასაუბრება მენტორთან.</li>
                  <li>საცდელი გაკვეთილი.</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="teachers" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {siteData.teachers.map((teacher, index) => (
                <div key={index} className="flex flex-col items-center p-6 bg-gray-50 shadow-md rounded-md">
                  <img
                    src={teacher.photo || "/placeholder.svg"}
                    alt={teacher.name}
                    className="w-24 h-24 rounded-full mb-2 object-cover border-4 border-yellow-200"
                  />
                  <h3 className="text-lg font-bold text-gray-800 text-center">{teacher.name}</h3>
                  <p className="text-sm font-semibold text-orange-600 mb-2 text-center">{teacher.role}</p>
                  <p className="text-gray-600 text-xs text-center py-0 my-2.5">{teacher.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div>
                <h4 className="text-xl font-semibold text-gray-700 mb-4">სასწავლო რესურსები</h4>
                <ul className="space-y-3">
                  {learningResources.map((resource, index) => (
                    <li
                      key={index}
                      className="p-4 bg-gray-50 shadow-sm hover:bg-gray-100 transition duration-300 rounded-md"
                    >
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between"
                      >
                        <span className="font-medium text-gray-800">{resource.text}</span>
                        <ExternalLink className="text-orange-600 w-4 h-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-700 mb-4">ვიდეო რესურსები</h4>
                <ul className="space-y-3">
                  {videoResources.map((resource, index) => (
                    <li
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition duration-300"
                    >
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between"
                      >
                        <span className="font-medium text-gray-800">{resource.text}</span>
                        <ExternalLink className="text-orange-600 w-4 h-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`გალერეის ფოტო ${index + 1}`}
                  className="rounded-lg shadow-md w-full h-auto cursor-pointer hover:opacity-80 transition duration-300"
                  onClick={() => openGalleryModal(image, index)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="library" className="mt-6">
            <div className="flex items-center mb-6">
              <Input
                type="text"
                placeholder="მოძებნე წიგნი..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
              />
              <Button className="ml-2 bg-orange-600 hover:bg-orange-700">
                <Search className="w-4 h-4" />
              </Button>
            </div>
            <ul className="space-y-4">
              {filteredBooks.slice(0, visibleBooksCount).map((book, index) => (
                <li key={index} className="bg-gray-50 p-4 shadow-sm flex items-start space-x-4 rounded-md">
                  <img src={book.cover || "/placeholder.svg"} alt={book.title} className="w-24 rounded-md shadow-md" />
                  <div>
                    <h4 className="font-semibold text-lg">{book.title}</h4>
                    <p className="text-sm text-gray-600">ავტორი: {book.author}</p>
                    <p className="mt-2 text-gray-700">{book.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            {visibleBooksCount < filteredBooks.length && (
              <div className="text-center mt-6">
                <Button
                  onClick={loadMoreBooks}
                  className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg transition-all duration-300"
                >
                  მეტი წიგნის ნახვა
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
        {/* Gallery Modal */}
        {isGalleryModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            <div className="relative max-w-4xl max-h-full p-4">
              <button
                onClick={closeGalleryModal}
                className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
              >
                ×
              </button>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 z-10"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 z-10"
              >
                ›
              </button>
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Enlarged gallery image"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
