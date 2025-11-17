import { Suspense } from "react"
import { BlogHeader } from "@/components/blog-header"
import { BlogPosts } from "@/components/blog-posts"
import { Footer } from "@/components/footer"

export const dynamic = 'force-dynamic'

export default function BlogPage() {
  return (
    <div className="relative">
      <BlogHeader />
      <Suspense fallback={
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-gray-500">იტვირთება...</p>
            </div>
          </div>
        </div>
      }>
        <BlogPosts />
      </Suspense>
      <Footer />
    </div>
  )
}
