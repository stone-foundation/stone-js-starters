import './UserAvatar.css'
import { FC, useState } from 'react'
import { User } from '../../models/User'
import { StoneLink } from '@stone-js/use-react'
import { IBlueprint, isNotEmpty } from '@stone-js/core'

/**
 * UserAvatar options.
 */
interface UserAvatarOptions {
  user: User
  className?: string
  size?: 'sm' | 'md' | 'lg' | number
}

/**
 * UserAvatar component.
 */
export const UserAvatar: FC<UserAvatarOptions> = ({
  user,
  size = 'md',
  className = ''
}) => {
  const [imgError, setImgError] = useState(false)
  const fallback = user.name?.charAt(0).toUpperCase() || '?'

  const getSize = () => {
    if (typeof size === 'number') return size
    const sizes = { sm: 28, md: 36, lg: 48 }
    return sizes[size] ?? 36
  }

  const dimension = getSize()

  const shouldShowFallback = !user.avatar || imgError

  return shouldShowFallback ? (
    <StoneLink to={`/users/${user.id}`}>
      <div
        className={`user-avatar-fallback ${className}`}
        style={{ width: dimension, height: dimension, fontSize: dimension / 2.2 }}
      >
        {fallback}
      </div>
    </StoneLink>
  ) : (
    <StoneLink to={`/users/${user.id}`}>
      <img
        src={user.avatar}
        alt={user.name}
        className={`user-avatar-img ${className}`}
        style={{ width: dimension, height: dimension }}
        onError={() => setImgError(true)}
      />
    </StoneLink>
  )
}



/**
 * Get the user avatar.
 * 
 * @param user - The user to get the avatar.
 * @returns The user avatar.
 */
export function getUserAvatar (blueprint: IBlueprint, user: User): string {
  const baseUrl = blueprint.get<string>('app.api.baseURL', '')
  return isNotEmpty<string>(user.avatar) ? `${baseUrl}/users/${user.id}/avatar` : '/assets/avatar.png'
}