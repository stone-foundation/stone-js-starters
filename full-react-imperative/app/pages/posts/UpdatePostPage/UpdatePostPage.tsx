import { JSX } from "react";
import { ILogger, isNotEmpty } from "@stone-js/core";
import { Post, PostInput } from "../../../models/Post";
import { PostService } from "../../../services/PostService";
import { PostForm } from "../../../components/PostForm/PostForm";
import { IPage, ReactIncomingEvent, PageRenderContext, StoneLink, definePage } from "@stone-js/use-react";

/**
 * Update Post Page options.
 */
export interface UpdatePostPageOptions {
  logger: ILogger
  postService: PostService
}

/**
 * Update Post Page component.
 */
export const UpdatePostPage = ({ logger, postService }: UpdatePostPageOptions): IPage<ReactIncomingEvent> => ({
  /**
   * Render the component.
   * 
   * @param options - The options for rendering the component.
   * @returns The rendered component.
   */
  render ({ event }: PageRenderContext<Post>): JSX.Element {
    const post = event.get<Post>('post')
    
    if (isNotEmpty<Post>(post)) {
      return (
        <>
          <h1>{post.title}</h1>
          <PostForm
            post={post}
            onSubmit={async (postInput) => await updatePost(logger, postService, post.id, postInput)}
          />
          <StoneLink to={`/posts/${post.id}`}>Back</StoneLink>
        </>
      )
    }

    return (
      <article>
        <h1>Post not found</h1>
      </article>
    )
  }
})

/**
 * Update the post.
 * 
 * @param post - The post to update.
 */
export async function updatePost (
  logger: ILogger,
  postService: PostService,
  id: number,
  post: PostInput
): Promise<void> {
  try {
    await postService.update(id, post)
    window.alert('Post updated successfully')
  } catch (error: any) {
    window.alert('Error updating the post')
    logger.error(error.message, { error })
  }
}

/**
 * Update Post Page Blueprint.
 */
export const UpdatePostPageBlueprint = definePage(
  UpdatePostPage,
  {
    path: '/posts/:post@id(\\d+)/edit',
    bindings: { post: 'postService@findBy' }
  }
)
