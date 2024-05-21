import api from './api';

export const login = async (email, password) => {
  const response = await api.post('/users/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token); // Store the token in localStorage
  }
  return response.data;
};


export const register = async (name, email, password, cpassword) => {
    console.log('Payload:', { name, email, password, cpassword }); // Log the payload
    const response = await api.post('/users/register', { name, email, password, cpassword });
    return response.data;
  };
