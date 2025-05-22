import { JSX } from "react";
import { Post } from "../../../models/Post";
import { User } from "../../../models/User";
import { ILogger, isNotEmpty } from "@stone-js/core";
import { PostService } from "../../../services/PostService";
import { CommentService } from "../../../services/CommentService";
import { PostDetails } from "../../../components/PostDetails/PostDetails";
import { definePage, IPage, IRouter, PageRenderContext, ReactIncomingEvent } from "@stone-js/use-react";

/**
 * Show Post Page options.
 */
export interface ShowPostPageOptions {
  router: IRouter
  logger: ILogger
  postService: PostService
  commentService: CommentService
}

/**
 * Show Post Page component.
 */
export const ShowPostPage = ({ router, logger, postService, commentService }: ShowPostPageOptions): IPage<ReactIncomingEvent> => ({
  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render ({ event }: PageRenderContext<Post>): JSX.Element {
    const post = event.get<Post>('post')
    const user = event.getUser<User>() ?? {} as User

    // Render the component
    if(isNotEmpty<Post>(post)) {
      return (
        <PostDetails
          user={user}
          post={post}
          commentService={commentService}
          onDelete={deletePost.bind(this, router, logger, postService, post)}
        />
      )
    }

    return <article><h1>Post not found</h1></article>
  }
})

/**
 * Delete the post.
 * 
 * @param post - The post to delete.
 */
export async function deletePost (
  router: IRouter,
  logger: ILogger,
  postService: PostService,
  post: Post
): Promise<void> {
  if (window.confirm('Are you sure you want to delete this post?')) {
    try {
      await postService.delete(post.id)
      router.navigate('/posts')
    } catch (error: any) {
      window.alert('Error deleting the post')
      logger.error(error.message, { error })
    }
  }
}

/**
 * Show Post Page Blueprint.
 */
export const ShowPostPageBlueprint = definePage(
  ShowPostPage,
  {
    path: '/posts/:post@id(\\d+)',
    bindings: { post: 'postService@findBy' } 
  }
)
