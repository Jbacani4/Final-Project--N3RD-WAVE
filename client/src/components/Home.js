import React, { useEffect, useState } from 'react';
import Posts from './Posts';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://final-project-n3rd-wave.onrender.com/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Check out these amazing Cafés:</h1>
      <Posts posts={posts} />
    </div>
  );
};

export default Home;
