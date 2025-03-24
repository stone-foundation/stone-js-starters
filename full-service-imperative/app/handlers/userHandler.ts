import { User } from "../models/User";
import { UserService } from "../services/userService";
import { IncomingHttpEvent } from "@stone-js/http-core";
import { FactoryEventHandler, FunctionalEventHandler } from "@stone-js/router";

/**
 * User Handler Options
*/
export interface UserHandlerOptions {
  userService: UserService
}

/**
 * List all users
*/
export const listUsers: FactoryEventHandler<IncomingHttpEvent> = (
  { userService }: UserHandlerOptions
): FunctionalEventHandler<IncomingHttpEvent> => async (event: IncomingHttpEvent): Promise<User[]> => {
  return await userService.listUsers({ limit: event.get<number>('limit', 10) })
}

/**
 * Show a user
*/
export const showUser: FactoryEventHandler<IncomingHttpEvent> = (
  {}: UserHandlerOptions
): FunctionalEventHandler<IncomingHttpEvent> => (event: IncomingHttpEvent): User => {
  return event.get<User>('user', {} as User)
}

/**
 * Create a user
*/
export const createUser: FactoryEventHandler<IncomingHttpEvent> = (
  { userService }: UserHandlerOptions
): FunctionalEventHandler<IncomingHttpEvent> => async (event: IncomingHttpEvent): Promise<void> => {
  return await userService.createUser({ user: event.body })
}

/**
 * Update a user
*/
export const updateUser: FactoryEventHandler<IncomingHttpEvent> = (
  { userService }: UserHandlerOptions
): FunctionalEventHandler<IncomingHttpEvent> => async (event: IncomingHttpEvent): Promise<User> => {
  return await userService.updateUser({ id: event.get<string>('id', ''), user: event.body })
}

/**
 * Delete a user
*/
export const deleteUser: FactoryEventHandler<IncomingHttpEvent> = (
  { userService }: UserHandlerOptions
): FunctionalEventHandler<IncomingHttpEvent> => async (event: IncomingHttpEvent): Promise<unknown> => {
  return await userService.deleteUser({ id: event.get<string>('id', '') })
}
