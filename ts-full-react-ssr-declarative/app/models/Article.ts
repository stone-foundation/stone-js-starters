import { User } from "./User"

/**
 * Article Interface
*/
export interface Article {
  id: number
  author: User
  title: string
  content: string
  authorId: number
  createdAt: number
  updatedAt: number
}

/**
 * New Article Interface
*/
export interface ArticleInput {
  id: number
  title: string
  content: string
}