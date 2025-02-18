import { FC, useRef } from 'react';
import { UserRegister } from '../../models/User';

/**
 * Register Form Options
 */
export interface RegisterFormOptions {
  onSubmit: (user: UserRegister) => Promise<void>
}

/**
 * Register Form component.
 * 
 * @param options - The options to create the Register Form component.
 */
export const RegisterForm: FC<RegisterFormOptions> = ({ onSubmit }) => {
  // Create a reference to the user
  const userRef = useRef<UserRegister>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Handle the form submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await onSubmit(userRef.current)
  }

  // Handle the field change
  const onChange = (field: keyof UserRegister) => (event: React.ChangeEvent<HTMLInputElement>) => {
    userRef.current[field] = event.target.value;
  };

  // Render the component
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>Name:</label>
      <input id='name' type='text' onChange={onChange('name')} defaultValue={userRef.current.name} />
      
      <label htmlFor='email'>Email:</label>
      <input id='email' type='email' onChange={onChange('email')} defaultValue={userRef.current.email} />
      
      <label htmlFor='password'>Password:</label>
      <input id='password' type='password' onChange={onChange('password')} defaultValue={userRef.current.password} />
      
      <label htmlFor='confirmPassword'>Confirm password:</label>
      <input id='confirmPassword' type='password' onChange={onChange('confirmPassword')} defaultValue={userRef.current.confirmPassword} />
      
      <button type='submit'>Register</button>
    </form>
  );
};
