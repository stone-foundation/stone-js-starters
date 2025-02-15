import './CreatePostPage.css';
import { ReactNode } from "react";
import { ILogger } from "@stone-js/core";
import { PostInput } from "../../../models/Post";
import { IComponentEventHandler } from "@stone-js/router";
import { PostService } from "../../../services/PostService";
import { PostForm } from '../../../components/PostForm/PostForm';
import { IRouter, Page, ReactIncomingEvent } from "@stone-js/use-react";

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
@Page('/posts/create')
export class CreatePostPage implements IComponentEventHandler<ReactIncomingEvent> {
  private readonly router: IRouter
  private readonly logger: ILogger
  private readonly postService: PostService

  /**
   * Create a new Post Page component.
   * 
   * @param options - The options to create the Post Page component.
   */
  constructor ({ router, logger, postService }: CreatePostPageOptions) {
    this.router = router
    this.logger = logger
    this.postService = postService
  }

  /**
   * Render the component.
   * 
   * @returns The rendered component.
   */
  render (): ReactNode {
    return (
      <>
        <h1>New Post</h1>
        <PostForm onSave={this.createPost} />
      </>
    )
  }

  /**
   * Create the post.
   * 
   * @param post - The post to save.
   */
  private async createPost (postInput: PostInput): Promise<void> {
    try {
      const post = await this.postService.create(postInput)
      this.router.navigate(`/posts/${post.id}`)
    } catch (error: any) {
      window.alert('Error creating the post')
      this.logger.error(error.message, { error })
    }
  }
}
