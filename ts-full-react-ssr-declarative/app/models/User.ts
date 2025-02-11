/**
 * User Interface
*/
export interface User {
  id: number
  name: string
  email: string
  createdAt: number
}

/**
 * New User Interface
*/
export interface UserInput {
  name: string
  email: string
}