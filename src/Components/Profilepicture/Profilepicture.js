import React from 'react';
import './Profilepicture.css';
import assets from '../../assets/Assets.js';

function ProfilePicture() {
  return (
    <div className='profilePicture'>
      <img src={assets.tiger} alt="Profile" className='profilePicture__image'/>
    </div>
  );
}

export default ProfilePicture;