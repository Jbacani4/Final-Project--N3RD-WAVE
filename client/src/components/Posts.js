import React, { useState, useEffect } from 'react';
import PostItem from './PostItem';
import styled from 'styled-components';
import axios from 'axios';

const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://final-project-n3rd-wave.onrender.com/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="posts">
      <PostContainer>
        {posts.map((post) => (
          <PostItem
            key={post._id}
            postID={post._id}
            thumbnail={post.image}
            title={post.title}
            desc={post.description}
            authorID={post.creator}
          />
        ))}
      </PostContainer>
    </section>
  );
};

export default Posts;
