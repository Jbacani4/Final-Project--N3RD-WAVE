import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Updated import
import styled from 'styled-components';
import { login } from '../services/authService'; // Import the login function
import { DataContext } from '../context/DataContext';

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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
    background-color: #403d39;
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
  const {setUserId} = useContext(DataContext)

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Updated to useNavigate

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(userData.email, userData.password);
      setError(''); // Clear any previous errors
      console.log('Logged in user:', data);
      setUserId(data.user._id)
      // Redirect to the desired page after login
      navigate('/'); // Change this to your desired route
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
      console.error(error);
    }
  };

  return (
    <LoginSection>
      <LoginContainer>
        <Heading>Welcome Back!</Heading>
        <Form onSubmit={handleSubmit}>
          {error && <FormError>{error}</FormError>}
          <Input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />
          <Button type="submit">Confirm</Button>
        </Form>
        <SmallText>
          Join us <Link to="/signup">here</Link>
        </SmallText>
      </LoginContainer>
    </LoginSection>
  );
};

export default Login;
