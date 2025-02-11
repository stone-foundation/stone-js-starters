import { CommentEvent } from "../events/CommentEvent"
import { EventEmitter, Service } from "@stone-js/core"
import { CommentClient } from "../clients/CommentClient"
import { Comment, CommentInput } from "../models/Comment"

/**
 * Comment Service Options
*/
export interface CommentServiceOptions {
  commentClient: CommentClient
  eventEmitter: EventEmitter
}

/**
 * Comment Service
 * 
 * @Service() decorator is used to define a new service
 * @Service() is an alias of @Stone() decorator.
 * The alias is required to get benefits of desctructuring Dependency Injection.
 * And because the front-end class will be minified, we need to use alias to keep the class name.
*/
@Service({ alias: 'commentService' })
export class CommentService {
  private readonly commentClient: CommentClient
  private readonly eventEmitter: EventEmitter

  /**
   * Create a new Comment Service
  */
  constructor({ commentClient, eventEmitter }: CommentServiceOptions) {
    this.commentClient = commentClient;
    this.eventEmitter = eventEmitter;
  }

  /**
   * List comments
   * 
   * @param articleId - The id of the article to list comments
   * @param limit - The limit of comments to list
   */
  async list (articleId: number, limit: number = 10): Promise<Comment[]> {
    return await this.commentClient.list(articleId, limit)
  }

  /**
   * Create a comment
   * 
   * @param comment - The comment to create
   */
  async create(comment: CommentInput): Promise<void> {
    await this.eventEmitter.emit(new CommentEvent(comment))
    await this.commentClient.create(comment)
  }

  /**
   * Delete a comment
   * 
   * @param id - The id of the comment to delete
   */
  async delete(id: number): Promise<void> {
    await this.commentClient.delete(id)
  }
}
