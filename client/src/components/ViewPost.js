import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
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

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const { setAuthorId } = useContext(DataContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(response.data);
        //setAuthorId(response.data.creator); // Update context with author ID
        //console.log(response.data.creator);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      }
    };

    fetchPost();
  }, [id, setAuthorId]);

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
      </PostContainer>
    </PostSection>
  );
};

export default ViewPost;
