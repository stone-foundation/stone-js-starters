import { EventContext } from '@stone-js/router'
import { UserService } from '../services/UserService'
import { Binding } from '@stone-js/service-container'
import { HttpResponse, OutgoingHttpResponse } from '@stone-js/http-core'
import { Controller, Delete, Get, Post, Put } from '@stone-js/router/decorators'

@Controller()
export class UserController {
  private readonly userService: UserService

  /**
   * UserController constructor.
   * Dependency injection by destructuring.
   * Below, we inject dependencies from the service container using destructuring.
   * 
   * @param {Container} container - Stone container. For more details, see: https://www.npmjs.com/package/@stone-js/service-container.
   */
  constructor ({ userService }: Binding<UserService>) {
    this.userService = userService
  }

  @Get({
    path: '/users',
    name: 'users.list'
  })
  getUser (): OutgoingHttpResponse {
    return HttpResponse.json(this.userService.getUsers())
  }

  @Get({
    path: '/users/:id',
    name: 'users.show'
  })
  showUser ({ params }: EventContext): OutgoingHttpResponse {
    if (this.userService.hasUser(params.id)) {
      return HttpResponse.json(this.userService.getUser(params.id))
    } else {
      return HttpResponse.notFound({ message: `No users found with this id: ${params.id}.` })
    }
  }

  @Post({
    path: '/users',
    name: 'users.create'
  })
  createUser ({ body }: Pick<EventContext, 'body'>): OutgoingHttpResponse {
    return HttpResponse.ok(this.userService.createUser(body))
  }

  @Put({
    path: '/users/:id',
    name: 'users.update'
  })
  updateUser ({ params, body }: Pick<EventContext, 'params' | 'body'>): OutgoingHttpResponse {
    if (this.userService.hasUser(params.id)) {
      this.userService.updateUser(params.id, body)
      return HttpResponse.noContent()
    } else {
      return HttpResponse.notFound({ message: `No users found with this id: ${params.id}.` })
    }
  }

  @Delete({
    path: '/users/:id',
    name: 'users.delete'
  })
  removeUser ({ params }: Partial<EventContext>): OutgoingHttpResponse {
    if (this.userService.hasUser(params.id)) {
      this.userService.deleteUser(params.id)
      return HttpResponse.ok({ message: `The user with this id(${params.id}) was deleted.` })
    } else {
      return HttpResponse.notFound({ message: `No users found with this id: ${params.id}.` })
    }
  }
}