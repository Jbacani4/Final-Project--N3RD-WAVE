import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const DeletePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  

  useEffect(() => {
    const deletePost = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`https://final-project-n3rd-wave.onrender.com/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        navigate('/');
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    };

    deletePost();
  }, [id, navigate]);

  return (
    <div>
      Deleting post...
    </div>
  );
};

export default DeletePost;
