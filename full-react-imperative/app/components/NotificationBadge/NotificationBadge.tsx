import './NotificationBadge.css'
import dayjs from 'dayjs'
import { FC, useState } from 'react'
import { Dropdown } from '../Dropdown/Dropdown'
import { StoneLink } from '@stone-js/use-react'

interface Notification {
  id: number
  message: string
  link?: string
  createdAt: number
  read?: boolean
}

interface NotificationBadgeOptions {
  notifications: Notification[]
}

export const NotificationBadge: FC<NotificationBadgeOptions> = ({ notifications: initial }) => {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState(initial)

  const handleClick = (id: number) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="dropdown-wrapper">
      <button className="notification-button" onClick={() => setOpen(!open)}>
        🔔
        {unreadCount > 0 && (
          <span className="notification-count">{unreadCount}</span>
        )}
      </button>
      <Dropdown show={open} onClose={() => setOpen(false)} align="right">
        <ul className="dropdown-menu">
          {notifications.length === 0 ? (
            <li>No new notifications</li>
          ) : (
            notifications.map(n => (
              <li
                key={n.id}
                className={n.read ? 'read' : 'unread'}
                onClick={() => handleClick(n.id)}
              >
                {n.link ? <StoneLink to={n.link}>{n.message}</StoneLink> : n.message}
                <span className="notification-time">
                  {dayjs(n.createdAt).date()}
                </span>
              </li>
            ))
          )}
        </ul>
      </Dropdown>
    </div>
  )
}
