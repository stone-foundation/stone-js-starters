import { Stone } from "@stone-js/core";
import { AxiosClient } from "./AxiosClient";
import { Comment, CommentInput } from "../models/Comment";

/**
 * Comment Client Options
*/
export interface CommentClientOptions {
  httpClient: AxiosClient
}

/**
 * Comment Client
 */
@Stone({ alias: 'commentClient' })
export class CommentClient {
  private readonly path: string
  private readonly client: AxiosClient

  /**
   * Create a new Comment Client
   * 
   * @param options - The options to create the Comment Client.
   */
  constructor({ httpClient }: CommentClientOptions) {
    this.path = '/comments'
    this.client = httpClient
  }

  /**
   * List comments
   * 
   * @param limit - The limit of Comments to list
   * @returns The list of Comments
   */
  async list(articleId: number, limit: number = 10): Promise<Comment[]> {
    const query = new URLSearchParams({ articleId: articleId.toString(), limit: limit.toString() })
    return await this.client.get<Comment[]>(`${this.path}?${query}`)
  }

  /**
   * Create a comment
   * 
   * @param comment - The Comment to create
   * @returns The created Comment
   */
  async create(comment: CommentInput) {
    return this.client.post(this.path, comment)
  }

  /**
   * Delete a comment
   * 
   * @param id - The id of the Comment to delete
   */
  async delete(id: number) {
    return this.client.delete(`${this.path}/${id}`)
  }
}
