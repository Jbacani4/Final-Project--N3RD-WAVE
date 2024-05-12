import React, { useState } from 'react'
import PostItem from './PostItem'
import styled from 'styled-components';

import thumbnail1 from '../images/0014_11A.jpg'
import thumbnail2 from '../images/0021_4A.jpg'

const TESTPOSTS = [
    {
        id: '1',
        thumbnail: thumbnail1,
        title: 'Amazing blog',
        desc: 'buncha guys being dudes and having so much fun',
        authorID: 3
    },
    {
        id: '2',
        thumbnail: thumbnail2,
        title: 'coworkers',
        desc: 'buncha guys being dudes and having so much fun. buncha guys being dudes and having so much fun',
        authorID: 1
    },
]

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