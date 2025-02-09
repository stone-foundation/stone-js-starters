import './Home.css'
import { FC } from "react"
import { RenderContext } from "@stone-js/use-react"

/**
 * User data.
 */
export interface UserData {
  name: string
}

/**
 * A simple React component that renders a greeting message.
 */
export const Home:FC<RenderContext<UserData>> = ({ data }) => {
  return <h1>Hello {data?.name}!!!</h1>
}
