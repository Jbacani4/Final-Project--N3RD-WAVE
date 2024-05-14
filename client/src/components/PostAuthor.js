import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../images/67610330_2586790641334079_2092126003500417024_n.jpg';
import styled from 'styled-components';

const AuthorCard = styled(Link)`
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

const PostAuthor = () => {
  return (
    <AuthorCard to={`/profile/:id`}>
      <AuthorIcon>
        <img src={Icon} alt='Author Icon' />
      </AuthorIcon>
      <AuthorInfo>
        <h3>By: Romy Bacani</h3>
      </AuthorInfo>
    </AuthorCard>
  );
}

export default PostAuthor;