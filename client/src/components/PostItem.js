import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled component for the entire post
const Article = styled.article`
    background: #fff;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: translateY(-5px);
    }
`;

// Styled component for the post thumbnail
const PostThumbnail = styled.div`
    width: 100%;
    height: 200px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

// Styled component for the post content
const PostContent = styled.div`
    padding: 15px;
`;

// Styled title link
const TitleLink = styled(Link)`
    text-decoration: none;
    color: #333;

    h3 {
        margin: 0 0 10px;
        font-size: 1.5rem;
        transition: color 0.2s ease-in-out;

        &:hover {
            color: #6f4e37;
        }
    }
`;

// Styled paragraph for the description
const Description = styled.p`
    color: #666;
`;

const PostItem = ({ postID, thumbnail, title, desc, authorID }) => {
    const tileDesc = desc.length > 25 ? desc.substr(0,25) + '..' :desc;
  return (
    <Article className='post'>
        <PostThumbnail className='PostThumbnail'>
            <img src={thumbnail} alt={title} />
        </PostThumbnail>
        <PostContent className='PostContent'>
            <TitleLink to={`/posts/${postID}`}>
                <h3>{title}</h3>
            </TitleLink>
            <Description>{tileDesc}</Description>
        </PostContent>
    </Article>
  )
}

export default PostItem;