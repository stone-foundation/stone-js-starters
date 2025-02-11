import { Event } from "@stone-js/core";
import { Comment } from "../models/Comment";

/**
 * Comment Event
 */
export class CommentEvent extends Event {
  /**
   * COMMENT_CREATED Event name, fires after a comment have been created.
   *
   * @event CommentEvent#COMMENT_CREATED
   */
  static COMMENT_CREATED: string = 'comment.created';
  
  constructor(public readonly comment: Partial<Comment>) {
    super({ type: CommentEvent.COMMENT_CREATED });
  }
}
