"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useSiteData } from "@/contexts/site-context"

export function BlogSection() {
  const { siteData } = useSiteData()

  // Show only the latest 3 posts
  const latestPosts = siteData.blogPosts.slice(0, 3)

  return (
    <section id="blog" className="bg-red-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">ბოლო სიახლეები</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {latestPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-lg overflow-hidden flex flex-col h-full cursor-pointer hover:shadow-xl transition-all duration-300 rounded-md"
            >
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-4 sm:p-6 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-xs text-orange-500 mb-2 text-left">{post.date}</p>
                  <h3 className="font-bold text-xl text-gray-800 mb-4 text-left">{post.title}</h3>
                  <p className="text-base text-gray-600 mb-4 text-left line-clamp-3">{post.text}</p>
                </div>
                <Link
                  href={`/blog?postId=${post.id}`}
                  className="inline-flex items-center text-orange-500 font-semibold text-sm hover:underline transition duration-300 self-start"
                >
                  ვრცლად <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/blog"
          className="inline-block mt-10 px-6 py-3 bg-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          ყველა სიახლის ნახვა
        </Link>
      </div>
    </section>
  )
}
