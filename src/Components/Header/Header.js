import React, {useEffect, useState} from 'react';
import './Header.css';
import assets from '../../assets/Assets.js'; 
import ProfilePicture from '../Profilepicture/Profilepicture.js';
import { useAuth } from '../Auth/contexts/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../Auth/api/api.js';

function Header() {
	const [open, setOpen] = useState(false);
	const {logout, currentUser } = useAuth();
	const [error, setError] = useState('');
	const [profile, setProfile] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		const fetchprofile = async () => {
			const idToken = await currentUser.getIdToken();
			const body = {};
			const response = await apiRequest('/profiles/email/'+currentUser.email, 'GET', body, idToken);
			setProfile(response.data);
		};
		if(currentUser){
			fetchprofile();
		}

	}, [currentUser]);

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
		</div>
		
		<div className='headerCenter'>
			<p>ping</p>
			<div className='headerCenterIcon'>
				<img src={assets.messageIcon}/> 
			</div>
			<p>me</p>
		</div>
		
		<div className="headerRight">
		  <div className='profileIcon'>
			<div onClick={()=>{setOpen(!open)}}>
			  <ProfilePicture/>
			</div>
			<div className={`dropContainer ${open? 'active' : 'inactive'}`}>	
			<h3>{profile?.displayName || ''}<br/><span>{profile?.tagline || ''}</span></h3>
			  <div className='dropLine'>
				<ul>
				<li className='dropItem'>
						<p onClick={handleUpdateProfile}>Change Password</p>
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