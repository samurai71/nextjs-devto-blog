export interface DevToArticle {
  id: number
  title: string
  description: string
  url: string
  published_at: string
  tag_list: string[]
  slug: string
  cover_image: string | null
  user: {
    name: string
    username: string
    profile_image: string
  }
  reading_time_minutes: number
  public_reactions_count: number
  comments_count: number
  body_markdown: string
  body_html: string
}

export interface DevToComment {
  id_code: string
  created_at: string
  body_html: string
  user: {
    name: string
    username: string
    profile_image_90: string
  }
  children: DevToComment[]
}