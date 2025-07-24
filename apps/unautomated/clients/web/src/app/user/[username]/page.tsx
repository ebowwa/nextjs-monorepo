import { supabase } from "@/lib/supabase"
import { Post, User } from "@/types"
import Image from "next/image"
import Link from "next/link"

async function getUser(username: string): Promise<User | null> {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single()
  return data
}

async function getUserPosts(userId: string): Promise<Post[]> {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", userId)
    .eq("is_public", true)
    .order("created_at", { ascending: false })
  return data || []
}

export default async function UserProfilePage({
  params,
}: {
  params: { username: string }
}) {
  const user = await getUser(params.username)
  
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">User not found</h1>
      </div>
    )
  }

  const posts = await getUserPosts(user.id)

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="max-w-7xl w-full">
        <div className="mb-12 flex items-center space-x-4">
          {user.avatar_url && (
            <Image
              src={user.avatar_url}
              alt={user.username}
              width={96}
              height={96}
              className="rounded-full"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold">{user.full_name || user.username}</h1>
            <p className="text-gray-600">@{user.username}</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-8">Posts</h2>
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
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 line-clamp-2">{post.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
