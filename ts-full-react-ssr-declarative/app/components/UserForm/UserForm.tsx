import { FC, useState } from "react"
import { User } from "../../models/User"

export interface UserFormOptions {
  value?: User
  handleSubmit: (user: User) => void
}

export const UserForm: FC<UserFormOptions> = ({ handleSubmit, value }) => {
  const [user, setUser] = useState<User>(value ?? {} as User)
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(user)
    event.preventDefault()
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Your name:</label>
      <input id="name" type="text" onInput={(v) => setUser({ ...user, name: (v.target as any).value })} value={user.name} />
      <label htmlFor="email">Your email:</label>
      <input id="email" type="text" onInput={(v) => setUser({ ...user, email: (v.target as any).value })} value={user.email} />
      <button type="submit">Submit</button>
    </form>
  )
}