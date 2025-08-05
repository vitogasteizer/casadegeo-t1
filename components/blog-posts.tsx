"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useSiteData } from "@/contexts/site-context"

export function BlogPosts() {
  const { siteData } = useSiteData()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [hasProcessedUrlParam, setHasProcessedUrlParam] = useState(false)
  const searchParams = useSearchParams()

  const postsPerPage = 6

  const filteredPosts =
    selectedCategory === "all"
      ? siteData.blogPosts
      : siteData.blogPosts.filter((post) => post.category === selectedCategory)

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  useEffect(() => {
    if (!hasProcessedUrlParam) {
      const postId = searchParams.get("postId")
      if (postId) {
        const post = siteData.blogPosts.find((p) => p.id === Number.parseInt(postId))
        if (post) {
          setSelectedPost(post)
          setIsModalOpen(true)
          setHasProcessedUrlParam(true)
        }
      }
    }
  }, [searchParams, hasProcessedUrlParam, siteData.blogPosts])

  const openModal = useCallback((post: any) => {
    setSelectedPost(post)
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedPost(null)
    setHasProcessedUrlParam(false)
  }, [])

  const openImageModal = useCallback((imageSrc: string, index: number) => {
    setSelectedImage(imageSrc)
    setCurrentImageIndex(index)
    setIsImageModalOpen(true)
  }, [])

  const closeImageModal = useCallback(() => {
    setIsImageModalOpen(false)
    setSelectedImage(null)
  }, [])

  const nextImage = useCallback(() => {
    if (selectedPost?.gallery) {
      const nextIndex = (currentImageIndex + 1) % selectedPost.gallery.length
      setCurrentImageIndex(nextIndex)
      setSelectedImage(selectedPost.gallery[nextIndex])
    }
  }, [selectedPost, currentImageIndex])

  const prevImage = useCallback(() => {
    if (selectedPost?.gallery) {
      const prevIndex = (currentImageIndex - 1 + selectedPost.gallery.length) % selectedPost.gallery.length
      setCurrentImageIndex(prevIndex)
      setSelectedImage(selectedPost.gallery[prevIndex])
    }
  }, [selectedPost, currentImageIndex])

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">ყველა სიახლე</h2>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => {
            setSelectedCategory("all")
            setCurrentPage(1)
          }}
          className="rounded-full"
        >
          ყველა
        </Button>
        {siteData.categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => {
              setSelectedCategory(category)
              setCurrentPage(1)
            }}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Blog posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full cursor-pointer hover:shadow-xl transition-all duration-300"
          >
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <p className="text-xs text-orange-500 mb-2">{post.date}</p>
                <h3 className="font-bold text-xl text-gray-800 mb-4 cursor-pointer" onClick={() => openModal(post)}>
                  {post.title}
                </h3>
                <p className="text-base text-gray-600 mb-4 line-clamp-3">{post.text}</p>
              </div>
              <button
                onClick={() => openModal(post)}
                className="inline-flex items-center text-orange-500 font-semibold text-sm hover:underline transition duration-300 self-start"
              >
                ვრცლად <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Main Blog Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-12">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-full"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">წინა</span>
          </Button>

          <div className="flex flex-wrap gap-1 sm:gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className="w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base rounded-full"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-full"
          >
            <span className="hidden sm:inline">შემდეგი</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}

      {/* Blog post modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-[95vw] max-w-[1400px] sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[70vw] 2xl:w-[60vw] max-h-[90vh] overflow-y-auto p-0">
          {selectedPost && (
            <>
              {/* Full-width cover image */}
              <div className="relative w-full h-48 sm:h-64 md:h-80">
                <img
                  src={selectedPost.image || "/placeholder.svg"}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-4 left-6 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{selectedPost.title}</h2>
                  <p className="text-sm opacity-90">{selectedPost.date}</p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center z-20"
                >
                  ×
                </button>
              </div>

              <div className="p-4 sm:p-6 md:p-8">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6 text-base md:text-lg">{selectedPost.text}</p>

                  {selectedPost.gallery && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                      {selectedPost.gallery.map((img: string, index: number) => (
                        <img
                          key={index}
                          src={img || "/placeholder.svg"}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-80 transition shadow-md"
                          onClick={() => openImageModal(img, index)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[60]">
          <div className="relative max-w-4xl max-h-full p-4">
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-white hover:text-orange-300 z-10 transition-colors duration-300"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {selectedPost?.gallery && selectedPost.gallery.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-300 z-10 transition-colors duration-300"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-300 z-10 transition-colors duration-300"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Enlarged image"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  )
}
