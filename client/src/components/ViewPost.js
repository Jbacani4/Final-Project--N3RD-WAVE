import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled, { css } from 'styled-components';
import PostAuthor from './PostAuthor';
import { DataContext } from '../context/DataContext';


const PostSection = styled.section`
  background: #fff;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostThumbnail = styled.div`
  margin-top: 20px;
  img {
    width: 100%;
    height: auto;
  }
`;

const PostButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled(Link)`
  padding: 10px 15px;
  background-color: #6f4e37;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #403D39;
  }

  ${props => props.delete && css`
    background-color: #d9534f;

    &:hover {
      background-color: #c9302c;
    }
  `}
`;

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const { userId, setCreatorId } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://final-project-n3rd-wave.onrender.com/api/posts/${id}`);
        setPost(response.data);
        setCreatorId(response.data.creator); // Update context with author ID
      } catch (error) {
        console.error('Failed to fetch post:', error);
      }
    };

    fetchPost();
  }, [id, setCreatorId]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://final-project-n3rd-wave.onrender.com/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/');
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <PostSection>
      <PostContainer>
        <PostAuthor authorId={post.creator} />
        <h1>{post.title}</h1>
        <PostThumbnail>
          <img src={post.image} alt={post.title} />
        </PostThumbnail>
        <p>{post.description}</p>
        <p>{post.location}</p>
        { userId === post.creator && (
          <PostButtons>
            <Button to={`/posts/${post._id}/edit`} className='btnEdit'>Edit</Button>
            <Button as="button" onClick={handleDelete} delete="true" className='btnDelete'>Delete</Button>
          </PostButtons>
        )}
      </PostContainer>
    </PostSection>
  );
};

export default ViewPost;
