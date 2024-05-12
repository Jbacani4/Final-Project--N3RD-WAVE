import React, { useState } from 'react'
import { TESTPOSTS } from '../Data'
import PostItem from './PostItem'
import styled from 'styled-components';

const PostContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 20px;
`;


const BaristaPosts = () => {
  const [posts, setPosts] = useState(TESTPOSTS)
  return (
    <section className='BaristPosts'>
        <PostContainer>
            {posts.map(({ id, thumbnail, title, desc, authorID }) => 
                <PostItem key={id} postID={id} thumbnail={thumbnail} title={title} desc={desc} authorID={authorID} />)
            }
        </PostContainer>
    </section>
  )
}

export default BaristaPosts


