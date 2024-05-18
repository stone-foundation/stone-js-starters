import { Service } from '@stone-js/core/decorators'

@Service({ alias: 'userService' })
export class UserService {
  private users: User[]

  /**
   * UserService constructor.
   */
  constructor () {
    this.users = [
      { id: 1, fullname: 'Jonh Doe' },
      { id: 2, fullname: 'Jane Doe' },
      { id: 3, fullname: 'James Doe' },
    ]
  }

  /**
   * Get users.
   * 
   * @returns {User[]}
   */
  getUsers (): User[] {
    return this.users
  }

  /**
   * Get user.
   * 
   * @returns {User}
   */
  getUser (id: number): User {
    return this.users[id]
  }

  /**
   * Has user.
   * 
   * @returns {boolean}
   */
  hasUser (id: number): boolean {
    return !!this.users[id]
  }

  /**
   * Create user.
   * 
   * @param {User} payload
   * @returns
   */
  createUser (payload: Omit<User, 'id'>): User {
    const user = { ...payload, id: this.users.length + 1 }
    this.users.push(user)
    console.log('User created!')
    console.table(this.users)
    return user
  }

  /**
   * Update user.
   * 
   * @param {number} id
   * @param {Object} payload
   * @returns
   */
  updateUser (id: number, payload: Omit<User, 'id'>) {
    this.users = this.users.map(user => user.id === id ? { ...payload, id } : user)
    console.log('User updated!')
    console.table(this.users)
  }

  /**
   * Delete user.
   * 
   * @param {number} id
   * @returns
   */
  deleteUser (id: number) {
    this.users = this.users.filter(user => user.id !== id)
    console.log('User deleted!')
    console.table(this.users)
  }
}

interface User {
  id: number;
  fullname: string;
}