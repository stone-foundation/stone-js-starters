import { User } from "../../models/User"
import { Article } from "../../models/Article"
import { FC, useEffect, useState } from "react"
import { IContainer, ILogger } from "@stone-js/core"
import { CommentItem } from "../CommentItem/CommentItem"
import { CommentForm } from "../CommentForm/CommentForm"
import { ReactIncomingEvent } from "@stone-js/use-react"
import { CommentService } from "../../services/CommentService"
import { CommentInput, CommentView } from "../../models/Comment"

/**
 * Comment Widget Options
 */
export interface CommentWidgetOptions {
  article: Article
  container: IContainer
  event: ReactIncomingEvent
}

/**
 * Comment Items component.
 */
export const CommentWidget: FC<CommentWidgetOptions> = ({ article, event, container }) => {
  const user = event.getUser<User>() ?? {} as User
  const logger = container.make<ILogger>('logger')
  const [comments, setComments] = useState<CommentView[]>([])
  const commentService = container.make<CommentService>(CommentService)
  const [fetchingStatus, setFetchingStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  // Fetch comments
  const fetchComments = async () => {
    try {
      setFetchingStatus('loading')
      const comments = await commentService.list(article.id)
      setFetchingStatus('idle')
      setComments(comments)
    } catch (error: any) {
      setFetchingStatus('error')
      logger.error(error.message, { error })
    }
  }

  // Save comment
  const saveComment = async (commentInput: CommentInput) => {
    try {
      await commentService.create(commentInput)
      await fetchComments()
    } catch (error: any) {
      logger.error(error.message, { error })

      setComments(comments.map(comment => ({
        ...comment,
        status: comment.id === commentInput.id ? 'error' : comment.status
      })))
    }
  }

  // Handle save
  const handleSave = async (content: string) => {
    const id = comments.length + 1
    const commentInput: CommentInput = {
      id,
      content,
      articleId: article.id
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
  useEffect(() => { fetchComments().then(() => {}) }, [article.id])

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
        <CommentForm handleSave={handleSave} />
        <div>
          {comments.map((comment, index) => (
            <CommentItem key={index} commentView={comment} handleRetrySave={saveComment} />
          ))}
        </div>
      </div>
    )
  }
}