import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { DataContext } from '../context/DataContext';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
`;

const FormField = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input, textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #6f4e37;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #403D39;
  }
`;

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', description: '', location: '', image: null });
  const { userId } = useContext(DataContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://final-project-n3rd-wave.onrender.com/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPost((prevPost) => ({
      ...prevPost,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('description', post.description);
    formData.append('location', post.location);
    formData.append('creator', userId);
    if (post.image) {
      formData.append('image', post.image);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.patch(`https://final-project-n3rd-wave.onrender.com/api/posts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  return (
    <FormContainer>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <FormField>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleInputChange}
            required
          />
        </FormField>
        <FormField>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={post.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </FormField>
        <FormField>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={post.location}
            onChange={handleInputChange}
            required
          />
        </FormField>
        <FormField>
          <label htmlFor="image">Image</label>
          <input type="file" id="image" name="image" onChange={handleImageChange} />
        </FormField>
        <Button type="submit">Update Post</Button>
      </form>
    </FormContainer>
  );
};

export default EditPost;
