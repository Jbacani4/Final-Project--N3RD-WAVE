import React from 'react';
import { Link } from 'react-router-dom';

const RedirectToLogin = () => {
  return (
    <div>
      <h2>You must be signed in to view profiles.</h2>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default RedirectToLogin;