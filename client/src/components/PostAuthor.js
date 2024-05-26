import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';

const AuthorCard = styled.button`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const AuthorIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;

  img {
    width: 100%;
    height: auto;
  }
`;

const AuthorInfo = styled.div`
  h3 {
    margin: 0;
    font-size: 1.2rem;
  }
`;

const PostAuthor = ({ authorId }) => {
  const [author, setAuthor] = useState({});
  const { setCreatorId, setVisitProfile, userId } = useContext(DataContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(`https://final-project-n3rd-wave.onrender.com/api/users/${authorId}`);
        setAuthor(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch author:', error);
      }
    };

    if (authorId) {
      console.log(authorId);
      fetchAuthor();
    }
  }, [authorId]);

   const handleClick = () => {
    if (userId) {
      setCreatorId(authorId);
      setVisitProfile(true);
      navigate('/profile');
      console.log(isLoggedIn);
      console.log(userId);
    } else {
      navigate('/redirect-to-login');
    }
  };

  return (
    <AuthorCard onClick={handleClick} >
      <AuthorIcon>
        <img src={author.avatar} alt='Author Avatar' />
      </AuthorIcon>
      <AuthorInfo>
        <h3>By: {author.name}</h3>
      </AuthorInfo>
    </AuthorCard>
  );
}

export default PostAuthor;
