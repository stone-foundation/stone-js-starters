import dayjs from 'dayjs'
import { JSX } from "react";
import { User } from "../../../models/User";
import { isNotEmpty } from "@stone-js/core";
import relativeTime from 'dayjs/plugin/relativeTime'
import { UserService } from "../../../services/UserService";
import { UserAvatar } from "../../../components/UserAvatar/UserAvatar";
import { IPage, ReactIncomingEvent, PageRenderContext, definePage } from "@stone-js/use-react";

dayjs.extend(relativeTime)

/**
 * Show User Page options.
 */
export interface ShowUserPageOptions {
  userService: UserService
}

/**
 * Show User Page component.
 */
export const ShowUserPage = ({}: { userService: UserService }): IPage<ReactIncomingEvent> => ({
  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render ({ event }: PageRenderContext): JSX.Element {
    const user = event.get<User>('user') ?? {} as User

    return (
      <div className="user-profile-page">
        <div className="profile-cover"></div>

        <div className="profile-header">
          <div className="profile-avatar">
            <UserAvatar user={user} size={96} />
          </div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p className="email">{user.email}</p>
            {user.bio && <p className="bio">{user.bio}</p>}
            <p className="status">
              {user.isOnline
                ? <span className="online">🟢 Online</span>
                : `Last seen ${dayjs(user.lastSeen).fromNow()}`}
            </p>
          </div>
        </div>

        {/* <div className="profile-timeline">
          {posts.length === 0 ? (
            <p className="no-posts">This user has no posts yet.</p>
          ) : (
            posts.map(post => (
              <PostCard key={post.id} post={post} currentUserId={currentUserId} />
            ))
          )}
        </div> */}
      </div>
    )
  }
})

/**
 * Delete the user.
 * 
 * @param container - The container.
 * @param user - The user
 */
export async function deleteUser (userService: UserService, user?: User): Promise<void> {
  if (isNotEmpty<User>(user) && window.confirm('Are you sure you want to delete this user?')) {
    await userService.delete(user.id)
  }
}

/**
 * Show User Page Blueprint.
 */
export const ShowUserPageBlueprint = definePage(
  ShowUserPage,
  {
    path: '/users/:user@id(\\d+)',
    bindings: { user: 'userService@findBy' } 
  }
)
