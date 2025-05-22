import { db } from "../dummydb";
import { userRepository } from "../repositories/userRepository";
import { FactoryServiceProvider, IContainer, IServiceProvider } from "@stone-js/core";

/**
 * App Provider
 */
export const userProvider: FactoryServiceProvider = (
  serviceContainer: IContainer
): IServiceProvider => ({
  register() {
    serviceContainer.singletonIf('db', () => db)
    serviceContainer.singletonIf('userRepository', (container) => userRepository({ db: container.make('db') }))
  }
})