import Image from 'next/image'
import { DevToComment } from '@/types/devto'

interface CommentListProps {
  comments: DevToComment[]
}

function Comment({ comment }: { comment: DevToComment }) {
  const formattedDate = new Date(comment.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="border-l-2 border-gray-200 pl-4 mb-4">
      <div className="flex items-center gap-3 mb-2">
        <Image
          src={comment.user.profile_image_90}
          alt={comment.user.name}
          width={32}
          height={32}
          className="rounded-full"
        />
        <div>
          <p className="font-medium text-sm">{comment.user.name}</p>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
      </div>
      
      <div 
        className="prose prose-sm max-w-none mb-3"
        dangerouslySetInnerHTML={{ __html: comment.body_html }}
      />

      {comment.children && comment.children.length > 0 && (
        <div className="ml-6 mt-3">
          {comment.children.map((child) => (
            <Comment key={child.id_code} comment={child} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No comments yet. Be the first to comment!
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">
        Comments ({comments.length})
      </h2>
      {comments.map((comment) => (
        <Comment key={comment.id_code} comment={comment} />
      ))}
    </div>
  )
}