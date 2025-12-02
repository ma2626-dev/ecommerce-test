import { useState } from 'react'
import './LoginForm.css'



export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  return(
    <>
      <div>
        <input className="email-input" placeholder="Email" />
      </div>  
      <div>
        <input className="password-input" type={showPassword ? 'text' : 'password'} placeholder="Password" />
        <button onClick={() => setShowPassword(!showPassword)} className="show-button">{showPassword ? 'Hide' : 'Show'}</button>
      </div> 
      <div>
        <button className="login-button">Login</button>
        <button className="sign-up-button">Sign up</button>
      </div>
    </>
  )
}