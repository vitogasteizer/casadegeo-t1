"use client"

import { useState, useEffect } from "react"
import { useSiteData } from "@/contexts/site-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { useSearchParams } from "next/navigation"

export function BlogPosts() {
  const { siteData } = useSiteData()
  const searchParams = useSearchParams()
  const postId = searchParams.get("postId")

  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const postsPerPage = 6

  useEffect(() => {
    if (postId) {
      const post = siteData.blogPosts.find((p) => p.id === Number.parseInt(postId))
      if (post) {
        setSelectedPost(post)
      }
    }
  }, [postId, siteData.blogPosts])

  const filteredPosts = siteData.blogPosts.filter((post) =>
    selectedCategory === "all" ? true : post.category === selectedCategory,
  )

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  const openImageModal = (imageSrc: string, index: number, images: string[]) => {
    setSelectedImage(imageSrc)
    setCurrentImageIndex(index)
    setIsImageModalOpen(true)
  }

  const closeImageModal = () => {
    setIsImageModalOpen(false)
    setSelectedImage(null)
  }

  const nextImage = (images: string[]) => {
    const nextIndex = (currentImageIndex + 1) % images.length
    setCurrentImageIndex(nextIndex)
    setSelectedImage(images[nextIndex])
  }

  const prevImage = (images: string[]) => {
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length
    setCurrentImageIndex(prevIndex)
    setSelectedImage(images[prevIndex])
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (selectedPost) {
    const allImages = selectedPost.gallery ? [selectedPost.image, ...selectedPost.gallery] : [selectedPost.image]

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={() => setSelectedPost(null)}
              variant="outline"
              className="mb-6 hover:bg-gray-100"
              size="sm"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              უკან დაბრუნება
            </Button>

            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={selectedPost.image || "/placeholder.svg"}
                  alt={selectedPost.title}
                  className="w-full h-64 sm:h-80 md:h-96 object-cover cursor-pointer"
                  onClick={() => openImageModal(selectedPost.image, 0, allImages)}
                />
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full cursor-pointer hover:bg-opacity-70 transition-all">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <Badge variant="secondary" className="mb-2 sm:mb-0 w-fit">
                    {selectedPost.category}
                  </Badge>
                  <span className="text-sm text-gray-500">{selectedPost.date}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {selectedPost.title}
                </h1>

                <div
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: selectedPost.text }}
                />

                {selectedPost.gallery && selectedPost.gallery.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">გალერეა</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {selectedPost.gallery.map((image: string, index: number) => (
                        <div key={index} className="relative group">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-32 sm:h-40 object-cover rounded-lg cursor-pointer transition-transform group-hover:scale-105"
                            onClick={() => openImageModal(image, index + 1, allImages)}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
                            <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-all" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          </div>
        </div>

        {/* Image Modal */}
        {isImageModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>

              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => prevImage(allImages)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => nextImage(allImages)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Enlarged image"
                className="max-w-full max-h-full object-contain"
              />

              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <Button
            onClick={() => handleCategoryChange("all")}
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
          >
            ყველა
          </Button>
          {siteData.categories.map((category) => (
            <Button
              key={category}
              onClick={() => handleCategoryChange(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {currentPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                    {post.category}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">{post.text}</p>
                <div className="mt-4 flex items-center text-orange-600 text-sm font-medium group-hover:text-orange-700 transition-colors">
                  ვრცლად
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => handlePageChange(page)}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className="rounded-full min-w-[40px]"
              >
                {page}
              </Button>
            ))}

            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">ამ კატეგორიაში პოსტები არ მოიძებნა</p>
          </div>
        )}
      </div>
    </div>
  )
}
