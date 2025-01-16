import React, {useState} from 'react';
import './Header.css';
import assets from '../../assets/Assets.js'; 
import ProfilePicture from '../Profilepicture/Profilepicture.js';
import { useAuth } from '../Auth/contexts/AuthContext.js';
import { useNavigate } from 'react-router-dom';

function Header() {
	const [open, setOpen] = useState(false);
	const {logout } = useAuth();
	const [error, setError] = useState('');
	const navigate = useNavigate();

	async function handleLogOut(){
		setError('');
		try{
			await logout();
			navigate('/login');
		} catch {
			setError('Failed to Log Out');
		}
	}

	async function handleUpdateProfile(){
		navigate('/updateprofile');
	}
	
  return (
	<>
	  {error && <div className="errorMessage">{error}</div>}
	  <div className="header">
		<div className="headerLeft">
		  <h1 className='titleStatement'>Tiger is live</h1>
		</div>
		<div className='headerCenter'>
		  <img src={assets.appLogo} alt="Logo" className='appLogo' />
		</div>
		<div className="headerRight">
		  <h1 className='titleName'>ping.me</h1>
		  <div className='profileIcon'>
			<div onClick={()=>{setOpen(!open)}}>
			  <ProfilePicture/>
			</div>
			<div className={`dropContainer ${open? 'active' : 'inactive'}`}>	
			  <h3>Vishvam Patel<br/><span>Tiger Gang</span></h3>
			  <div className='dropLine'>
				<ul>
				<li className='dropItem'>
						<p onClick={handleUpdateProfile}>Update Profile</p>
					</li>
				  	<li className='dropItem'>
						<p onClick={handleLogOut}>Log Out</p>
					</li>
				</ul>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</>
  );
}

export default Header;