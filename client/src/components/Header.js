import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DataContext } from '../context/DataContext';

const Header = () => {
  const token = localStorage.getItem('token'); // Check if the user is logged in
  const navigate = useNavigate();
  const { userId, creatorId, setCreatorId, visitProfile, setVisitProfile } = useContext(DataContext);

  const handleProfile = () => {
    if (visitProfile && creatorId){
      setVisitProfile(false) 
      setCreatorId(null)
    }else if(!visitProfile && creatorId ){
      setVisitProfile(true)
    }
    navigate('/profile')
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Nav>
      <NavbarContainer>
        <NavbarMenu>
          <MenuItem><StyledLink to="/">Home</StyledLink></MenuItem>
          {token && <MenuItem><StyledLink to="/create">Make Post</StyledLink></MenuItem>}
          <MenuItem><StyledLink to="/about">What's 3rd Wave?</StyledLink></MenuItem>
          {token && <MenuItem><StyledLink as="button" onClick={handleProfile}>Profile</StyledLink></MenuItem>}
          {!token && <MenuItem><StyledLink to="/signup">Signup</StyledLink></MenuItem>}
          {!token && <MenuItem><StyledLink to="/login">Login</StyledLink></MenuItem>}
          {token && <MenuItem><StyledLink as="button" onClick={handleLogout}>Logout</StyledLink></MenuItem>}
        </NavbarMenu>
      </NavbarContainer>
    </Nav>
  );
};

// Style

const Nav = styled.nav`
  background: #333;
  color: #fff;
  padding: 0.5rem 1rem;
  z-index: 100;
  width: 100vw;
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavbarMenu = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li`
  padding: 0 1rem;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;

  &:hover {
    color: #04D9B2;
  }
`;

export default Header;
