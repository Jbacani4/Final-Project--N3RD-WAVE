import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  return (
    <Nav>
      <NavbarContainer>
        <NavbarMenu>
          <MenuItem><StyledLink to="/">Home</StyledLink></MenuItem>
          <MenuItem><StyledLink to="/create">Make Post</StyledLink></MenuItem>
          <MenuItem><StyledLink to="/baristas">Baristas</StyledLink></MenuItem>
          <MenuItem><StyledLink to={`/profile/:id`}>Profile</StyledLink></MenuItem>
          <MenuItem><StyledLink to="/about">What's 3rd Wave?</StyledLink></MenuItem>
          <MenuItem><StyledLink to="/logout">Logout</StyledLink></MenuItem>
        </NavbarMenu>
      </NavbarContainer>
    </Nav>
  )
}


//style

const Nav = styled.nav`
  background: #333;
  color: #fff;
  padding: 0.5rem 1rem;
  z-index: 100;
  //position: fixed;
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

export default Header