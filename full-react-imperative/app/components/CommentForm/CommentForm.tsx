import { FC, useRef } from 'react'
import { User } from '../../models/User'
import { UserAvatar } from '../UserAvatar/UserAvatar'

/**
 * Comment Form Props
 */
export interface CommentFormOptions {
  currentUser: User
  onSubmit: (content: string) => Promise<void>
}

/**
 * Comment Form component.
 */
export const CommentForm: FC<CommentFormOptions> = ({ currentUser, onSubmit }) => {
  const contentRef = useRef<HTMLInputElement>(null)

  // Handle the form submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (contentRef.current === null) return

    const content = contentRef.current.value.trim()
    if (content.length === 0) return // Prevent empty submissions
    
    contentRef.current.value = '' // Clear input field
    await onSubmit(content)
  }

  // Render the component
  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <UserAvatar user={currentUser} />
      <input
        type="text"
        ref={contentRef}
        className="comment-input"
        placeholder="Write a comment..."
      />
      <button className="comment-submit" type="submit">Add Comment</button>
    </form>
  )
}
