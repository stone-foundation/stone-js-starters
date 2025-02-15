import { User } from "../../models/User"
import { Post } from "../../models/Post"
import { FC, useEffect, useState } from "react"
import { CommentItem } from "../CommentItem/CommentItem"
import { CommentForm } from "../CommentForm/CommentForm"
import { CommentService } from "../../services/CommentService"
import { CommentInput, CommentView } from "../../models/Comment"

/**
 * Comment Widget Options
 */
export interface CommentWidgetOptions {
  post: Post
  user: User
  commentService: CommentService
}

/**
 * Comment Items component.
 */
export const CommentWidget: FC<CommentWidgetOptions> = ({ post, user, commentService }) => {
  const [comments, setComments] = useState<CommentView[]>([])
  const [fetchingStatus, setFetchingStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  // Fetch comments
  const fetchComments = async () => {
    try {
      setFetchingStatus('loading')
      const comments = await commentService.list(post.id)
      setFetchingStatus('idle')
      setComments(comments)
    } catch (_: any) {
      setFetchingStatus('error')
    }
  }

  // Save comment
  const saveComment = async (commentInput: CommentInput) => {
    try {
      await commentService.create(commentInput)
      await fetchComments()
    } catch (_: any) {
      setComments(comments.map(comment => ({
        ...comment,
        status: comment.id === commentInput.id ? 'error' : comment.status
      })))
    }
  }

  // Handle save
  const handleOnSave = async (content: string) => {
    const id = Math.random()
    const commentInput: CommentInput = {
      id,
      content,
      postId: post.id
    }

    const commentView: CommentView = {
      ...commentInput,
      author: user,
      status: 'saving',
      createdAt: Date.now(),
    }

    setComments([...comments, commentView])

    await saveComment(commentInput)
  }

  // Fetch comments on mount
  useEffect(() => { fetchComments().then(() => {}) }, [post.id])

  // Render
  if (comments.length === 0 && fetchingStatus === 'loading') {
    return <p>Loading comments...</p>
  } else if (comments.length === 0 && fetchingStatus === 'error') {
    return <p>Error fetching comments</p>
  } else if (comments.length === 0 && fetchingStatus === 'idle') {
    return <p>No comments yet</p>
  } else {
    return (
      <div>
        <CommentForm onSave={handleOnSave} />
        <div>
          {comments.map((comment) => (
            <CommentItem key={comment.id} commentView={comment} onRetry={saveComment} />
          ))}
        </div>
      </div>
    )
  }
}
