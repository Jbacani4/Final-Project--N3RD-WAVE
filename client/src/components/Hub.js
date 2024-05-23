import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import axios from 'axios';

// Style for the main section of the hub
const HubSection = styled.section`
  padding: 20px;
  background: #f4f4f4;
  min-height: 100vh;
`;

// Container for all posts
const HubContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// Each post block
const HubPost = styled.article`
  display: flex;
  align-items: center;
  background: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

// Post info including image and title
const HubPostInfo = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

// Small thumbnail for the post
const HubPostImg = styled.div`
  width: 60px;
  height: 60px;
  margin-right: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

// Styled title
const PostTitle = styled.h3`
  margin: 0;
  color: #333;
  flex-grow: 1;
`;

// Container for buttons
const PostButtons = styled.div`
  display: flex;
  gap: 10px;
`;

// Styled link button with conditional styling for delete button
const Button = styled(Link)`
  padding: 8px 16px;
  border-radius: 5px;
  color: white;
  text-decoration: none;
  background-color: #6f4e37; // default color

  &:hover {
    background-color: #403D39;
  }

  ${props => props.delete && css`
    background-color: #d9534f; // Red color for delete button

    &:hover {
      background-color: #c9302c; // Darker red on hover
    }
  `}
`;

const Hub = () => {
  const [posts, setPosts] = useState([]);
  const { id } = useParams(); // Get user ID from URL params
  const token = localStorage.getItem('token'); // Get JWT token from localStorage

  useEffect(() => {
    // Fetch user's posts
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch user posts:', error);
      }
    };

    fetchUserPosts();
  }, [id, token]);

  return (
    <HubSection>
      {posts.length ? (
        <HubContainer>
          {posts.map(post => (
            <HubPost key={post._id}>
              <HubPostInfo>
                <HubPostImg>
                  <img src={post.image} alt={post.title} />
                </HubPostImg>
                <PostTitle>{post.title}</PostTitle>
              </HubPostInfo>
              <PostButtons>
                <Button to={`/posts/${post._id}`} className='btnView'>View</Button>
                <Button to={`/posts/${post._id}/edit`} className='btnEdit'>Edit</Button>
                <Button to={`/posts/${post._id}/delete`} delete className='btnDelete'>Delete</Button>
              </PostButtons>
            </HubPost>
          ))}
        </HubContainer>
      ) : (
        <h1>No posts yet :C</h1>
      )}
    </HubSection>
  );
};

export default Hub;