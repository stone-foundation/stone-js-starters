import { Session } from "./Session"
import { JwtPayload } from "jsonwebtoken"

/**
 * User Interface
*/
export interface UserModel {
  id: number
  name: string
  email: string
  avatar?: string
  password?: string
  createdAt: number
  updatedAt: number
}

/**
 * User Interface
*/
export interface User extends Omit<UserModel, 'password'> {}

/**
 * User Response Interface
 * Represents a user response resource.
*/
export interface UserResponse extends User {}

/**
 * User Request Interface
 * Represents a user request resource.
*/
export interface UserRequest {
  name: string
  email: string
}

/**
 * User Login Interface
*/
export interface UserLogin {
  email: string
  password: string
}

/**
 * User Register Interface
*/
export interface UserRegister {
  name: string
  email: string
  password: string
}

/**
 * User Change Password Interface
*/
export interface UserChangePassword {
  password: string
  newPassword: string
}

/**
 * User Token Interface
*/
export interface UserToken {
  expiresIn: number
  tokenType: string
  accessToken: string
}

/**
 * User Token Payload Interface
*/
export interface UserTokenPayload extends JwtPayload {
  user: User
  session: Session
}
