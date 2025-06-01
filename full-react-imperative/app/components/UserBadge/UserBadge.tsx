import './UserBadge.css'
import dayjs from 'dayjs'
import { FC } from 'react'
import { User } from '../../models/User'
import { StoneLink } from '@stone-js/use-react'
import relativeTime from 'dayjs/plugin/relativeTime'
import { UserAvatar } from '../UserAvatar/UserAvatar'

dayjs.extend(relativeTime)

/**
 * UserBadge options.
 */
interface UserBadgeOptions {
  user: User
  createdAt?: number
  className?: string
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg' | number
  direction?: 'horizontal' | 'vertical'
}

/**
 * UserBadge component.
 */
export const UserBadge: FC<UserBadgeOptions> = ({
  user,
  createdAt,
  size = 'md',
  direction = 'horizontal',
  onClick,
  className = ''
}) => {
  return (
    <div
      className={`user-badge ${direction} ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <UserAvatar user={user} size={size} />
      <div className="user-badge-info">
        <StoneLink to={`/users/${user.id}`} className="user-badge-name">
          {user.name}
        </StoneLink>
        {createdAt && <span className="user-badge-details">{dayjs(createdAt).fromNow()}</span>}
        {!createdAt && user.email && <span className="user-badge-details">{user.email}</span>}
      </div>
    </div>
  )
}
