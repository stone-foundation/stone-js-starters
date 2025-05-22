import './CreatePostPage.css';
import { JSX } from "react";
import { ILogger } from "@stone-js/core";
import { PostInput } from "../../../models/Post";
import { PostService } from "../../../services/PostService";
import { PostForm } from '../../../components/PostForm/PostForm';
import { definePage, IPage, IRouter, ReactIncomingEvent } from "@stone-js/use-react";

/**
 * Create Post Page options.
 */
export interface CreatePostPageOptions {
  router: IRouter
  logger: ILogger
  postService: PostService
}

/**
 * Create Post Page component.
 */
export const CreatePostPage = ({ router, logger, postService }: CreatePostPageOptions): IPage<ReactIncomingEvent> => ({
  /**
   * Render the component.
   * 
   * @returns The rendered component.
   */
  render (): JSX.Element {
    return (
      <>
        <h1>New Post</h1>
        <PostForm onSubmit={createPost.bind(this, router, logger, postService)} />
      </>
    )
  }
})

/**
 * Create the post.
 * 
 * @param post - The post to save.
 */
export async function createPost (
  router: IRouter,
  logger: ILogger,
  postService: PostService,
  postInput: PostInput
): Promise<void> {
  try {
    const post = await postService.create(postInput)
    router.navigate(`/posts/${post.id}`)
  } catch (error: any) {
    console.error(error)
    window.alert('Error creating the post')
    logger.error(error.message, { error })
  }
}

/**
 * Create Post Page Blueprint.
 */
export const CreatePostPageBlueprint = definePage(CreatePostPage, { path: '/posts/create' })
