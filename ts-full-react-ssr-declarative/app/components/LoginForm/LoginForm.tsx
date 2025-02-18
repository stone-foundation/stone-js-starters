import { FC, useRef } from 'react';
import { UserLogin } from '../../models/User';

/**
 * Login Form Options
 */
export interface LoginFormOptions {
  error: boolean
  onSubmit: (user: UserLogin) => Promise<void>
}

/**
 * Login Form component.
 * 
 * @param options - The options to create the Login Form component.
 */
export const LoginForm: FC<LoginFormOptions> = ({ error, onSubmit }) => {
  // Create a reference to the login
  const loginRef = useRef<UserLogin>({
    email: '',
    password: ''
  })

  // Handle the form submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await onSubmit(loginRef.current)
  }

  // Handle the field change
  const onChange = (field: keyof UserLogin) => (event: React.ChangeEvent<HTMLInputElement>) => {
    loginRef.current[field] = event.target.value;
  };

  // Render the component
  return (
    <form onSubmit={handleSubmit}>
      {error && <p className='alert'>Invalid email or password</p>}
      
      <label htmlFor='email'>Email:</label>
      <input
        id='email'
        type='email'
        placeholder='Enter your email'
        onChange={onChange('email')} defaultValue={loginRef.current.email}
      />
      
      <label htmlFor='password'>Password:</label>
      <input
        id='password'
        type='password'
        placeholder='Enter your password'
        onChange={onChange('password')} defaultValue={loginRef.current.password}
      />
      
      <button type='submit'>Login</button>
    </form>
  );
};
