import { Service } from '@stone-js/core/decorators'

@Service({ alias: 'userService' })
export class UserService {
  /** @returns {Object[]} */
  #users

  /**
   * UserService constructor.
   */
  constructor () {
    this.#users = [
      { id: 1, fullname: 'Jonh Doe' },
      { id: 2, fullname: 'Jane Doe' },
      { id: 3, fullname: 'James Doe' },
    ]
  }

  /**
   * Get users.
   * 
   * @returns {Object[]}
   */
  getUsers () {
    return this.#users
  }

  /**
   * Get user.
   * 
   * @returns {Object}
   */
  getUser (id) {
    return this.#users[id]
  }

  /**
   * Has user.
   * 
   * @returns {Object}
   */
  hasUser (id) {
    return !!this.#users[id]
  }

  /**
   * Create user.
   * 
   * @param {Object} payload
   * @returns
   */
  createUser (payload) {
    const user = { ...payload, id: this.#users.length + 1 }
    this.#users.push(user)
    console.log('User created!')
    console.table(this.#users)
    return user
  }

  /**
   * Update user.
   * 
   * @param {number} id
   * @param {Object} payload
   * @returns
   */
  updateUser (id, payload) {
    this.#users = this.#users.map(user => user.id === id ? { ...payload, id } : user)
    console.log('User updated!')
    console.table(this.#users)
  }

  /**
   * Delete user.
   * 
   * @param {number} id
   * @returns
   */
  deleteUser (id) {
    this.#users = this.#users.filter(user => user.id !== id)
    console.log('User deleted!')
    console.table(this.#users)
  }
}