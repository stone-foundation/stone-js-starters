import { Post, PostInput } from "../models/Post"
import { PostEvent } from "../events/PostEvent"
import { PostClient } from "../clients/PostClient"
import { EventEmitter, IContainer, Service } from "@stone-js/core"
import { PostNotFoundError } from "../errors/PostNotFoundError"

/**
 * Post Service Options
*/
export interface PostServiceOptions {
  postClient: PostClient
  eventEmitter: EventEmitter
}

/**
 * Post Service
 * 
 * @Service() decorator is used to define a new service
 * @Service() is an alias of @Stone() decorator.
 * The alias is required to get benefits of desctructuring Dependency Injection.
 * And because the front-end class will be minified, we need to use alias to keep the class name.
*/
@Service({ alias: 'postService' })
export class PostService {
  private readonly postClient: PostClient
  private readonly eventEmitter: EventEmitter

  /**
   * Resolve route binding
   * 
   * @param key - The key of the binding
   * @param value - The value of the binding
   * @param container - The container
   */
  static async resolveRouteBinding(key: string, value: string, container: IContainer): Promise<Post | undefined> {
    const postService = container.resolve<PostService>('postService')
    return await postService.find({ [key]: value })
  }

  /**
   * Create a new Post Service
  */
  constructor({ postClient, eventEmitter }: PostServiceOptions) {
    this.postClient = postClient;
    this.eventEmitter = eventEmitter;
  }

  /**
   * List posts
   * 
   * @param limit - The limit of posts to list
   */
  async list (limit: number = 10): Promise<Post[]> {
    return await this.postClient.list(limit)
  }

  /**
   * Find a post
   * 
   * @param conditions - The conditions to find the post
   * @returns The found post
   */
  async find (conditions: Record<string, any>): Promise<Post> {
    try {
      return await this.postClient.find(conditions.id)
    } catch (error: any) {
      if (error.status === 404) {
        throw new PostNotFoundError(error.message)
      } else {
        throw error
      }
    }
  }

  /**
   * Create a post
   * 
   * @param post - The post to create
   */
  async create(post: PostInput): Promise<Post> {
    await this.eventEmitter.emit(new PostEvent(post))
    return await this.postClient.create(post)
  }

  /**
   * Update a post
   * 
   * @param id - The id of the post to update
   * @param post - The post data to update
   */
  async update(id: number, post: PostInput): Promise<Post> {
    return await this.postClient.update(id, post)
  }

  /**
   * Delete a post
   * 
   * @param id - The id of the post to delete
   */
  async delete(id: number): Promise<void> {
    await this.postClient.delete(id)
  }
}
