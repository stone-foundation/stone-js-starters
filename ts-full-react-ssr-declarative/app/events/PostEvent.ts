import { Event } from "@stone-js/core";
import { Post } from "../models/Post";

/**
 * Post Event
 */
export class PostEvent extends Event {
  /**
   * ARTICLE_CREATED Event name, fires after a post have been created.
   *
   * @event PostEvent#ARTICLE_CREATED
   */
  static ARTICLE_CREATED: string = 'post.created';
  
  constructor(public readonly post: Partial<Post>) {
    super({ type: PostEvent.ARTICLE_CREATED });
  }
}
