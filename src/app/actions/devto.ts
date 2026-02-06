'use server'

import { DevToArticle, DevToComment } from '@/types/devto'

const DEV_TO_USERNAME = 'samurai71'
const DEV_TO_API = 'https://dev.to/api'

export async function getArticles(): Promise<DevToArticle[]> {
  try {
    const response = await fetch(
      `${DEV_TO_API}/articles?username=${DEV_TO_USERNAME}&per_page=10`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch articles')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export async function getArticleBySlug(slug: string): Promise<DevToArticle | null> {
  try {
    const response = await fetch(
      `${DEV_TO_API}/articles/${DEV_TO_USERNAME}/${slug}`,
      {
        next: { revalidate: 3600 },
      }
    )

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

export async function getArticleComments(articleId: number): Promise<DevToComment[]> {
  try {
    const response = await fetch(
      `${DEV_TO_API}/comments?a_id=${articleId}`,
      {
        next: { revalidate: 1800 }, // Cache for 30 minutes
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch comments')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching comments:', error)
    return []
  }
}