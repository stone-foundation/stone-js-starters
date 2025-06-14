import './ProfileForm.css'
import { User } from '../../models/User'
import { UserAvatar } from '../UserAvatar/UserAvatar'
import { useState, useRef, ChangeEvent, FC, FormEvent } from 'react'

interface ProfileFormOptions {
  user: User
  onSave: (updated: {
    name: string
    bio?: string
    avatarFile?: File
    coverFile?: File
  }) => void
}

export const ProfileForm: FC<ProfileFormOptions> = ({ user, onSave }) => {
  const [name, setName] = useState(user.name)
  const [bio, setBio] = useState(user.bio || '')
  const [avatarPreview, setAvatarPreview] = useState(user.avatar || '')
  const [coverPreview, setCoverPreview] = useState(user.coverImage || '')

  const avatarInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)

  const [avatarFile, setAvatarFile] = useState<File>()
  const [coverFile, setCoverFile] = useState<File>()

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverFile(file)
      setCoverPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSave({ name, bio, avatarFile, coverFile })
  }

  return (
    <form className="edit-profile-page" onSubmit={handleSubmit}>
      <div className="cover-preview" onClick={() => coverInputRef.current?.click()}>
        {coverPreview ? <img src={coverPreview} alt="Cover" /> : <span>Click to add cover image</span>}
        <input type="file" hidden ref={coverInputRef} onChange={handleCoverChange} accept="image/*" />
      </div>

      <div className="avatar-preview" onClick={() => avatarInputRef.current?.click()}>
        <UserAvatar user={user} size={96} />
        <input type="file" hidden ref={avatarInputRef} onChange={handleAvatarChange} accept="image/*" />
      </div>

      <div className="form-group">
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input value={user.email} disabled />
      </div>

      <div className="form-group">
        <label>Bio</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
      </div>

      <button type="submit" className="save-btn">Save Changes</button>
    </form>
  )
}
