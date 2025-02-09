import { resolveRouteBinding } from "../services/userService";
import { RouteDefinition, factoryHandler } from "@stone-js/router";
import { DELETE, GET, IncomingHttpEvent, PATCH, POST } from "@stone-js/http-core";
import { createUser, deleteUser, listUsers, showUser, updateUser } from "../handlers/userHandler";

/**
 * User Route definitions
 */
export const userRouteDefinitions: Array<RouteDefinition<IncomingHttpEvent>> = [
  {
    name: 'users',
    path: '/users',
    children: [
      {
        path: '/',
        method: GET,
        name: 'list',
        handler: factoryHandler(listUsers),
      },
      {
        method: GET,
        name: 'show',
        path: '/:user@id(\\d+)',
        handler: factoryHandler(showUser),
        bindings: { user: resolveRouteBinding },
      },
      {
        path: '/',
        method: POST,
        name: 'create',
        handler: factoryHandler(createUser),
      },
      {
        path: '/:id',
        method: PATCH,
        name: 'update',
        rules: { id: '\\d+' },
        handler: factoryHandler(updateUser),
      },
      {
        path: '/:id',
        method: DELETE,
        name: 'delete',
        handler: factoryHandler(deleteUser),
      },
    ]
  }
]