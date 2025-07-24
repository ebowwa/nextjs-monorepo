import { supabase } from "@/lib/supabase"
import { Post } from "@/types"
import Image from "next/image"

export default async function PostPage({
  params,
}: {
  params: { id: string }
}) {
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", params.id)
    .single()

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Post not found</h1>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="max-w-4xl w-full space-y-8">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
          <Image
            src={post.image_uri}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <p className="text-gray-600">{post.description}</p>

          {post.brand_name && (
            <div className="pt-4">
              <h2 className="text-xl font-semibold">Brand</h2>
              <p>{post.brand_name}</p>
            </div>
          )}

          {post.product_features && (
            <div className="pt-4">
              <h2 className="text-xl font-semibold">Features</h2>
              <ul className="list-disc pl-5 space-y-2">
                {post.product_features.map((feature: { text: string }, index: number) => (
                  <li key={index}>{feature.text}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
