import React, { useState } from 'react'
import { Link } from 'react-router-dom'



const Signup = () => {
  const [userData, setUserData] = useState({
    name:'',
    email:'',
    password: '',
    cpassword:''
  });

  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return{...prevState, [e.target.name]: e.target.value}
    })
  }

  return (
    <section className='signup'>
      <div className='SignContainer'>
        <h2>Join us!</h2>
        <form className='SignForm'>
          <p className='FormErr'>Input Error</p>
          <input type="text" placeholder='Full Name' name='name' value={userData.name} onChange={changeInputHandler}/>
          <input type="text" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler}/>
          <input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInputHandler}/>
          <input type="password" placeholder='Confirm Password' name='cpassword' value={userData.cpassword} onChange={changeInputHandler}/>
          <button type='submit' className='SubmitBtn'>Confirm</button>
        </form>
        <small>Members please <Link to='/login'>sign in</Link></small>
      </div>
    </section>
  )
}

export default Signup