import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav>
      <div className='navbarContainer'>
        <ul className='navbarMenu'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create">Make Post</Link></li>
          <li><Link to="/baristas">Baristas</Link></li>
          <li><Link to="/profile/:id">Profile</Link></li>
          <li><Link to="/about">What's 3rd Wave?</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Header