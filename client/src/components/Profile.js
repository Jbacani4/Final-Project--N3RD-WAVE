import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { TbPhotoEdit } from "react-icons/tb";
import axios from 'axios';

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
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState(''); // Store the uploaded file
  const { id } = useParams(); // Get user ID from URL params
  const token = localStorage.getItem('token'); // Get JWT token from localStorage

  useEffect(() => {
    // Fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
        setAvatar(response.data.avatar); // Set avatar state to user's avatar URL
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, [id, token]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    setAvatar(URL.createObjectURL(file)); // Preview the selected image

    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('userId', id);

    try {
      const response = await axios.post('http://localhost:5000/api/users/change-avatar', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setUser(response.data.user); // Update user data with the new avatar
      setAvatar(response.data.avatarUrl); // Update avatar state
    } catch (error) {
      console.error('Failed to update avatar:', error);
    }
  };

  return (
    <ProfileSection>
      <ProfileContainer>
        <Button to={`/users/${id}/posts`}>My Spots</Button>
        <AvatarContainer>
          <AvatarProfile>
            <img src={avatar || user.avatar} alt='Profile Avatar' />
            <form>
              <FileInput type='file' id='avatar' onChange={handleAvatarChange} accept="image/png, image/jpeg" />
              <CustomLabel htmlFor='avatar'><TbPhotoEdit size={24} /></CustomLabel>
            </form>
          </AvatarProfile>
        </AvatarContainer>
        <h1>{user.name}</h1>
      </ProfileContainer>
    </ProfileSection>
  );
}

export default Profile;