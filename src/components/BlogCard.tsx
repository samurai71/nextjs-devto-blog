import Link from 'next/link'
import Image from 'next/image'
import { DevToArticle } from '@/types/devto'

interface BlogCardProps {
  article: DevToArticle
}

export default function BlogCard({ article }: BlogCardProps) {
  const formattedDate = new Date(article.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {article.cover_image && (
        <div className="relative w-full h-48">
          <Image
            src={article.cover_image}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <Image
            src={article.user.profile_image}
            alt={article.user.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="text-sm font-medium">{article.user.name}</p>
            <p className="text-xs text-gray-500">{formattedDate}</p>
          </div>
        </div>

        <Link href={`/blog/${article.slug}`}>
          <h2 className="text-2xl font-bold mb-2 hover:text-blue-600 transition-colors">
            {article.title}
          </h2>
        </Link>

        <p className="text-gray-600 mb-4">{article.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {article.tag_list.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>❤️ {article.public_reactions_count}</span>
          <span>💬 {article.comments_count}</span>
          <span>⏱️ {article.reading_time_minutes} min read</span>
        </div>
      </div>
    </article>
  )
}