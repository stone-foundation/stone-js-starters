import { FC, useRef } from 'react';

/**
 * Comment Form Props
 */
export interface CommentFormOptions {
  handleSave: (content: string) => Promise<void>
}

/**
 * Comment Form component.
 */
export const CommentForm: FC<CommentFormOptions> = ({ handleSave }) => {
  const commentContentRef = useRef<string>('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleSave(commentContentRef.current)
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    commentContentRef.current = event.target.value;
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <input type='text' onChange={handleContentChange} placeholder='Write a comment...' />
        <button type='submit'>Add Comment</button>
      </p>
    </form>
  )
}
