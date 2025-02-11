import { FC, useState } from 'react'
import { formatDateTime } from '../../utils'
import { CommentView } from '../../models/Comment'

/**
 * Comment Item Props
 */
export interface CommentItemProps {
  commentView: CommentView
  handleRetrySave: (commentView: CommentView) => Promise<void>
}

/**
 * Comment Item component.
 */
export const CommentItem: FC<CommentItemProps> = ({ commentView, handleRetrySave }) => {
  const [comment, setComment] = useState<CommentView>(commentView)

  const handleOnClick = async () => {
    setComment({ ...comment, status: 'saving' })
    await handleRetrySave(comment)
  }

  return (
    <div>
      <p>{comment.content}</p>
      <p>
        <span>{comment.author.name}</span>
        <span>{formatDateTime(comment.createdAt)}</span>
      </p>
      {comment.status === 'saving' && <p>Saving...</p>}
      {comment.status === 'error' && (
        <p>
          <span>Error adding the comment!</span>
          <button onClick={handleOnClick}>Retry</button>
        </p>
      )}
    </div>
  )
}
