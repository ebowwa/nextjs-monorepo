import { supabase } from "@/lib/supabase"
import { Post } from "@/types"
import Image from "next/image"
import Link from "next/link"

async function getLatestPosts() {
  const { data: posts } = await supabase
    .from("posts")
    .select("*, users(username)")
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(12)
  return posts || []
}

export default async function Home() {
  const posts = await getLatestPosts()

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="max-w-7xl w-full">
        <h1 className="text-4xl font-bold mb-8">Latest Designs</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.id} 
              href={`/post/${post.id}`}
              className="group"
            >
              <div className="border rounded-lg overflow-hidden transition-all duration-300 group-hover:shadow-lg">
                <div className="relative aspect-square">
                  <Image
                    src={post.image_uri}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 line-clamp-2">{post.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <Link 
                      href={`/user/${post.users?.username}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      @{post.users?.username}
                    </Link>
                    <time className="text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleDateString()}
                    </time>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
