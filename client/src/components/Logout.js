import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DataContext } from '../context/DataContext';

const LogoutSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4;
  padding: 20px;
`;

const LogoutContainer = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  color: #6f4e37;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #6f4e37;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  flex: 1;
  margin: 0 10px;

  &:hover {
    background-color: #403d39;
  }
`;

const CancelButton = styled(Button)`
  background-color: #ccc;

  &:hover {
    background-color: #999;
  }
`;

const Logout = () => {
  const navigate = useNavigate();

  const {setUserId} = useContext(DataContext)


  const handleLogout = () => {
    setUserId('')

    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Redirect to the login page
    navigate('/login');
  };

  const handleCancel = () => {
    // Redirect to the home page or previous page
    navigate('/');
  };

  return (
    <LogoutSection>
      <LogoutContainer>
        <Heading>Confirm Logout</Heading>
        <p>Are you sure you want to log out?</p>
        <ButtonGroup>
          <Button onClick={handleLogout}>Yes</Button>
          <CancelButton onClick={handleCancel}>No</CancelButton>
        </ButtonGroup>
      </LogoutContainer>
    </LogoutSection>
  );
};

export default Logout;