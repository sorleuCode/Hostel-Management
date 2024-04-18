import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='container form__ --100vh'>
            <div className='form-container'>
                <p className='title'>Login as an Admin</p>
                <form className='form'>

                    <div className='--dir-column'>
                        <label htmlFor='email'>Email:</label>
                        <input 
                        type="email" 
                        name='email'
                        className='input'
                        placeholder='example@gmail.com'
                        required
    
                        />
                    </div>
                    <div className='--dir-column'>
                        <label htmlFor='password'>Password:</label>
                        <input 
                        type="password" 
                        className='input'
                        name='passeord'
                        placeholder='Enter your password'
                        required
    
                        />
                    </div>
    
                    <button className='--btn'>Create account</button>
                </form>
                <p>Don&apos; have an acaount yet? <Link to="/">Register</Link>{" "}</p>
            </div>
        </div>
      )
}

export default Login
