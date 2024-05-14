import React, { useState } from 'react'
import { Link } from 'react-router-dom'



const Login = () => {
  const [userData, setUserData] = useState({
    email:'',
    password: '',
  });

  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return{...prevState, [e.target.name]: e.target.value}
    })
  }

  return (
    <section className='login'>
      <div className='LoginContainer'>
        <h2>Welcome Back!</h2>
        <form className='LogForm'>
          <p className='FormErr'>Input Error</p>
          <input type="text" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler}/>
          <input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInputHandler}/>
          <button type='submit' className='SubmitBtn'>Confirm</button>
        </form>
        <small>Join us <Link to='/signup'>here</Link></small>
      </div>
    </section>
  )
}

export default Login