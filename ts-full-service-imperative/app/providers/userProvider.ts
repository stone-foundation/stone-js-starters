import { db } from "../dummydb";
import { userRepository } from "../repositories/userRepository";
import { IncomingHttpEvent, OutgoingHttpResponse } from "@stone-js/http-core";
import { FactoryServiceProvider, IContainer, IServiceProvider } from "@stone-js/core";

/**
 * App Provider
 */
export const userProvider: FactoryServiceProvider<IncomingHttpEvent, OutgoingHttpResponse> = (
  serviceContainer: IContainer
): IServiceProvider<IncomingHttpEvent, OutgoingHttpResponse> => ({
  register() {
    serviceContainer.singletonIf('db', () => db)
    serviceContainer.singletonIf('userRepository', (container) => userRepository({ db: container.make('db') }))
  }
})