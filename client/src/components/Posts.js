import React, { useState } from 'react'
import PostItem from './PostItem'
import styled from 'styled-components';
import { TESTPOSTS } from '../Data';





const PostContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 20px;
`;

const Posts = () => {
    const [posts, setPosts] =useState(TESTPOSTS);

    return(
        <section className='posts'>
        <PostContainer>
            {posts.map(({ id, thumbnail, title, desc, authorID }) => 
                <PostItem key={id} postID={id} thumbnail={thumbnail} title={title} desc={desc} authorID={authorID} />)
            }
        </PostContainer>
    </section>
    )
}

export default Posts