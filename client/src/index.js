import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Main from './components/Main';
import Errors from './components/Errors';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Baristas from './components/Baristas';
import CreatePosts from './components/CreatePosts';
import Profile from './components/Profile';
import ViewPost from './components/ViewPost';
import EditPost from './components/EditPost';
import BaristaPosts from './components/BaristaPosts';
import Hub from './components/Hub';
import About from './components/About';
//import App from './App';
//import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    errorElement: <Errors/>,
    children:[
      {index: true, element: <Home />},
      {path: "signup", element: <Signup />},
      {path: "login", element: <Login />},
      {path: "logout", element: <Logout />},
      {path: "baristas", element: <Baristas />},
      {path: "profile/:id", element: <Profile />},
      {path: "create", element: <CreatePosts />},
      {path: "posts/:id", element: <ViewPost />},
      {path: "posts/:id/edit", element: <EditPost />},
      {path: "posts/users/:id", element: <BaristaPosts />},
      {path: "myposts/:id", element: <Hub />},
      {path: "about", element: <About />}
    ]

  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
