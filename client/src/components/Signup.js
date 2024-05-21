import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Updated import
import styled from 'styled-components';
import { register } from '../services/authService'; // Import the register function

const SignupSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background-color: #f4f4f4;
  padding-top: 10vh;
`;

const SignupContainer = styled.div`
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

const Signup = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '' // Ensure this is included
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Updated to useNavigate

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.cpassword) {
      setError('Passwords do not match');
      return;
    }
  
    console.log('Submitting registration form:', userData); // Log the user data
  
    try {
      const data = await register(userData.name, userData.email, userData.password, userData.cpassword);
      setError(''); // Clear any previous errors
      console.log('Registered user:', data);
      // Redirect to the login page after successful registration
      navigate('/login');
    } catch (error) {
      setError(error.response.data.message || 'Registration failed. Please try again.');
      console.error('Error details:', error.response.data); // Log error details
    }
  };

  return (
    <SignupSection>
      <SignupContainer>
        <Heading>Join us!</Heading>
        <Form onSubmit={handleSubmit}>
          {error && <FormError>{error}</FormError>}
          <Input 
            type="text" 
            placeholder='Full Name' 
            name='name' 
            value={userData.name} 
            onChange={changeInputHandler} 
          />
          <Input 
            type="email" 
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
          <Input 
            type="password" 
            placeholder='Confirm Password' 
            name='cpassword' 
            value={userData.cpassword} 
            onChange={changeInputHandler} 
          />
          <Button type='submit'>Confirm</Button>
        </Form>
        <SmallText>Members please <Link to='/login'>sign in</Link></SmallText>
      </SignupContainer>
    </SignupSection>
  );
};

export default Signup;