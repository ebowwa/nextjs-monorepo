export interface Post {
  id: string
  title: string
  description: string
  image_uri: string
  user_id: string
  created_at: string
  updated_at: string
  brand_name?: string
  product_features?: { text: string }[]
  is_public: boolean
}

export interface User {
  id: string
  username: string
  full_name?: string
  avatar_url?: string
  created_at: string
}
