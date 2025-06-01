import React from 'react'
import dayjs from 'dayjs'
import { User } from '../../models/User'
import { StoneLink } from '@stone-js/use-react'
import relativeTime from 'dayjs/plugin/relativeTime'
import { UserAvatar } from '../UserAvatar/UserAvatar'

dayjs.extend(relativeTime)

/**
 * UserCard options.
 */
interface UserCardOptions {
  user: User
}

/**
 * UserCard component.
 */
export const UserCard: React.FC<UserCardOptions> = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-card-header">
        <StoneLink to={`/users/${user.id}`} className="user-card-link">
          <UserAvatar user={user} size="lg" />
        </StoneLink>
        <div className="user-card-info">
          <StoneLink to={`/users/${user.id}`} className="user-card-name">{user.name}</StoneLink>
          <StoneLink to={`/users/${user.id}`} className="user-card-email">{user.email}</StoneLink>
        </div>
        <span className={`user-status ${user.isOnline ? 'online' : 'offline'}`}></span>
      </div>

      <div className="user-card-meta">
        <span>📝 {user.postCount} Posts</span>
        <span>💬 {user.commentCount} Comments</span>
      </div>

      {!user.isOnline && (
        <div className="user-last-seen">
          Last seen {dayjs(user.lastSeen).fromNow()}
        </div>
      )}
    </div>
  )
}
