import './HomePostForm.css'
import { PostInput } from '../../models/Post'
import { ChangeEvent, FC, FormEvent, useRef, useState } from 'react'

/**
 * Post Form Options
 */
export interface HomePostFormOptions {
  post?: PostInput
  onSubmit: (post: PostInput) => Promise<void>
}

export const HomePostForm: FC<HomePostFormOptions> = ({ post, onSubmit }) => {
  const [text, setText] = useState(post?.content ?? '')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    onSubmit({
      content: text,
      title: text.substring(0, 32), // Assuming title is the first 32 characters of content
      // image: imagePreview ? { url: imagePreview } : undefined
    })
    console.log('Post:', { text, imagePreview })
    setText('')
    handleRemoveImage()
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <textarea
        className="post-textarea"
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
      />
      {imagePreview && (
        <div className="image-preview">
          <img src={imagePreview} alt="Preview" />
          <button type="button" onClick={handleRemoveImage} className="remove-image-btn">✕</button>
        </div>
      )}
      <div className="post-form-footer">
        <label className="upload-btn">
          📷 Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            hidden
          />
        </label>
        <button className="submit-btn" type="submit" disabled={!text.trim() && !imagePreview}>
          Publish
        </button>
      </div>
    </form>
  )
}
