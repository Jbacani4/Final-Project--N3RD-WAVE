import React from 'react';
import PostAuthor from './PostAuthor';
import { Link } from 'react-router-dom';
import Thumbnail from '../images/0014_11A.jpg';
import styled from 'styled-components';

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

const PostButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ButtonLink = styled(Link)`
  padding: 10px 15px;
  background-color: #6f4e37;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #403D39;
  }
`;

const PostThumbnail = styled.div`
  margin-top: 20px;
  img {
    width: 100%;
    height: auto;
  }
`;

const ViewPost = () => {
  return (
    <PostSection>
      <PostContainer>
        <PostAuthor />
        <PostButtons>
          <ButtonLink to={`posts/:id/edit`}>Edit</ButtonLink>
          <ButtonLink to={`posts/:id/delete`}>Delete</ButtonLink>
        </PostButtons>
        <h1>POST TITLE LOL</h1>
        <PostThumbnail>
          <img src={Thumbnail} alt='' />
        </PostThumbnail>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eleifend suscipit massa, vel ultricies ipsum ornare fermentum. Morbi at pulvinar eros, ut eleifend est. Vestibulum quis vestibulum neque. Aenean aliquet orci vulputate eros ultrices, eget consectetur urna porta. Aenean at luctus magna. Fusce eu scelerisque lacus. Pellentesque ultrices ligula diam, eget rhoncus nulla rutrum a. Sed et lacus ac mauris porttitor tincidunt. Nunc et risus luctus, porttitor ex quis, auctor nisi. Aliquam erat volutpat. Suspendisse elementum ligula sed nibh cursus scelerisque. Pellentesque ac metus nulla. Maecenas faucibus lacinia rhoncus. Fusce mollis risus eu odio sodales, nec sollicitudin lectus hendrerit. Proin viverra odio nec magna placerat, id venenatis mi porttitor. Curabitur placerat velit nibh, vitae luctus ipsum tincidunt sit amet.
        </p>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eleifend suscipit massa, vel ultricies ipsum ornare fermentum. Morbi at pulvinar eros, ut eleifend est. Vestibulum quis vestibulum neque. Aenean aliquet orci vulputate eros ultrices, eget consectetur urna porta. Aenean at luctus magna. Fusce eu scelerisque lacus. Pellentesque ultrices ligula diam, eget rhoncus nulla rutrum a. Sed et lacus ac mauris porttitor tincidunt. Nunc et risus luctus, porttitor ex quis, auctor nisi. Aliquam erat volutpat. Suspendisse elementum ligula sed nibh cursus scelerisque. Pellentesque ac metus nulla. Maecenas faucibus lacinia rhoncus. Fusce mollis risus eu odio sodales, nec sollicitudin lectus hendrerit. Proin viverra odio nec magna placerat, id venenatis mi porttitor. Curabitur placerat velit nibh, vitae luctus ipsum tincidunt sit amet.
        </p>
        <p>
          Nam hendrerit sapien sed est efficitur scelerisque. Donec ornare ligula eget erat gravida pharetra...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eleifend suscipit massa, vel ultricies ipsum ornare fermentum. Morbi at pulvinar eros, ut eleifend est. Vestibulum quis vestibulum neque. Aenean aliquet orci vulputate eros ultrices, eget consectetur urna porta. Aenean at luctus magna. Fusce eu scelerisque lacus. Pellentesque ultrices ligula diam, eget rhoncus nulla rutrum a. Sed et lacus ac mauris porttitor tincidunt. Nunc et risus luctus, porttitor ex quis, auctor nisi. Aliquam erat volutpat. Suspendisse elementum ligula sed nibh cursus scelerisque. Pellentesque ac metus nulla. Maecenas faucibus lacinia rhoncus. Fusce mollis risus eu odio sodales, nec sollicitudin lectus hendrerit. Proin viverra odio nec magna placerat, id venenatis mi porttitor. Curabitur placerat velit nibh, vitae luctus ipsum tincidunt sit amet.
        </p>
      </PostContainer>
    </PostSection>
  )
}

export default ViewPost;