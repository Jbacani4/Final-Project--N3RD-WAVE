import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '../images/67610330_2586790641334079_2092126003500417024_n.jpg';
import { TbPhotoEdit } from "react-icons/tb";


const ProfileSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start; 
  padding-top: 10vh; 
  min-height: 90vh; 
  background-color: #f4f4f4;
`;


const ProfileContainer = styled.div`
  text-align: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 80%; 
  max-width: 600px; 
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  background-color: #6f4e37;
  color: white;
  text-decoration: none;

  &:hover {
    background-color: #403D39;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  margin: 20px auto;
  width: 150px;
  height: 150px;
`;

const AvatarProfile = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 4px solid #6f4e37;
  }
`;

const CustomLabel = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.8);
  padding: 6px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #6f4e37;
  }

  svg {
    color: #403D39;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const Profile = () => {
  const [avatar, setAvatar] = useState('');

  return (
    <ProfileSection>
      <ProfileContainer>
        <Button to={`/myposts/:id`}>My Spots</Button>
        <AvatarContainer>
          <AvatarProfile>
            <img src={Avatar} alt='Profile Avatar' />
            <form>
              <FileInput type='file' id='avatar' onChange={e => setAvatar(e.target.files[0])} accept="image/png, image/jpeg"/>
              <CustomLabel htmlFor='avatar'><TbPhotoEdit size={24} /></CustomLabel>
            </form>
          </AvatarProfile>
        </AvatarContainer>
        <h1>Romy Bacani</h1>
      </ProfileContainer>
    </ProfileSection>
  );
}

export default Profile;