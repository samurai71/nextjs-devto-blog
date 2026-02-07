import { getArticleBySlug, getArticleComments } from '@/app/actions/devto'
import CommentList from '@/components/CommentList'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const comments = await getArticleComments(article.id)

  const formattedDate = new Date(article.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link 
          href="/blog" 
          className="text-blue-600 hover:text-blue-800 mb-6 inline-block"
        >
          ← Back to Blog
        </Link>

        <article>
          {article.cover_image && (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={article.cover_image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={article.user.profile_image}
                alt={article.user.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-medium">{article.user.name}</p>
                <p className="text-sm text-gray-500">{formattedDate}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {Array.isArray(article.tag_list) && article.tag_list.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 pb-4 border-b">
              <span>❤️ {article.public_reactions_count} reactions</span>
              <span>💬 {article.comments_count} comments</span>
              <span>⏱️ {article.reading_time_minutes} min read</span>
            </div>
          </header>

          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: article.body_html }}
          />

          <div className="border-t pt-8">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Read on Dev.to →
            </a>
          </div>
        </article>

        <section className="mt-12 pt-8 border-t">
          <CommentList comments={comments} />
        </section>
      </div>
    </main>
  )
}