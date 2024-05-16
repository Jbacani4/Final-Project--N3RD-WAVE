import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background-color: #f4f4f4;
  padding-top: 10vh;
`;

const LoginContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  text-align: center;
  width: 300px;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  color: #6f4e37;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormError = styled.p`
  color: red;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    border-color: #6f4e37;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #6f4e37;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #403D39;
  }
`;

const SmallText = styled.small`
  display: block;
  margin-top: 10px;
  color: #666;

  a {
    color: #6f4e37;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  return (
    <LoginSection>
      <LoginContainer>
        <Heading>Welcome Back!</Heading>
        <Form>
          <FormError>Input Error</FormError>
          <Input 
            type="text" 
            placeholder='Email' 
            name='email' 
            value={userData.email} 
            onChange={changeInputHandler} 
          />
          <Input 
            type="password" 
            placeholder='Password' 
            name='password' 
            value={userData.password} 
            onChange={changeInputHandler} 
          />
          <Button type='submit'>Confirm</Button>
        </Form>
        <SmallText>Join us <Link to='/signup'>here</Link></SmallText>
      </LoginContainer>
    </LoginSection>
  );
};

export default Login;