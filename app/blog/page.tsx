import { BlogHeader } from "@/components/blog-header"
import { BlogPosts } from "@/components/blog-posts"
import { Footer } from "@/components/footer"

export default function BlogPage() {
  return (
    <div className="relative">
      <BlogHeader />
      <BlogPosts />
      <Footer />
    </div>
  )
}
