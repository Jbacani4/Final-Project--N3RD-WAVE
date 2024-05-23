import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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
import DeletePost from './components/DeletePost';
import BaristaPosts from './components/BaristaPosts';
import Hub from './components/Hub'; // Use one path for Hub component
import About from './components/About';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Errors />,
    children: [
      { index: true, element: <Home /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
      { path: "baristas", element: <Baristas /> },
      { path: "profile/:id", element: <Profile /> },
      { path: "create", element: <CreatePosts /> },
      { path: "posts/:id", element: <ViewPost /> },
      { path: "posts/:id/edit", element: <EditPost /> },
      { path: "posts/:id/delete", element: <DeletePost /> },
      { path: "users/:id/posts", element: <Hub /> }, // Single path for viewing posts by user
      { path: "about", element: <About /> }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);