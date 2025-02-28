import React, { useState, useEffect, useRef } from 'react';
import './Sidebar.css';
// import ProfilePicture from '../Profilepicture/Profilepicture';
import apiRequest from '../Auth/api/api';
import { useAuth } from '../Auth/contexts/AuthContext';
import Assets from '../../assets/Assets';
import { useNavigate } from 'react-router-dom';

function Sidebar({ onChannelSelect, onViewSelect }) {
  const channelname = useRef();
  const channeltypecd = useRef();
  const tagline = useRef();
  const about = useRef();
  const { currentUser, logout } = useAuth();
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [trigger, setTrigger] = useState();
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const idToken = await currentUser.getIdToken();
      const body = {};
      const response = await apiRequest('/channels', 'GET', body, idToken);
      setChannels(response.data);
    };
    fetchData();
  }, [currentUser, trigger]);

  useEffect(() => {
    const fetchprofile = async () => {
      const idToken = await currentUser.getIdToken();
      const body = {};
      const response = await apiRequest('/profiles/email/'+currentUser.email, 'GET', body, idToken);
      setProfile(response.data);
    };
    
  if (currentUser) {
    fetchprofile();
  }
  }, [currentUser]);

  const handleChannelClick = (channelId) => {
    setSelectedChannel(channelId);
    onChannelSelect(channelId);
  };

  const setView = (view) => {
    onViewSelect(view);
  }

  const handleCreateChannel = async () => {
    const privacycd = 'PU';
    const channelPic = 'https://www.google.com/source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjVz7zH9fQCFQAAAAAdAAAAABAD';
    const subscribers = [currentUser.displayName, 'ping.me'];

    const newChannel = {
      channelname: channelname.current.value,
      channeltypecd: channeltypecd.current.value,
      tagline: tagline.current.value,
      about: about.current.value,
      privacycd,
      channelPic,
      subscribers,
    };
    const idToken = await currentUser.getIdToken();
    const response = await apiRequest('/channels', 'POST', newChannel, idToken);
    if (response.success === true) {
      setTrigger(Math.random());
    }
    setIsPopupVisible(false);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  async function handleLogOut(){
		try{
			// await logout();
			// navigate('/login');
      const sure = window.confirm('Are you sure you want to log out? click ok if Yes');
      if (sure === true) {
        await logout();
        navigate('/login');
      }
		} catch {
      window.alert('Failed to Log Out');
		}
	}

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="title__container">
          {/* for later */}
          <img src={Assets.appLogo} alt="Logo" className='title__appLogo' />
        </div>

        <div className="sidebar__profile">
          {/* <ProfilePicture /> */}
          <h2 className="sidebar__username">ping.me @ <br /> {profile?.displayName || ''}</h2>
        </div>

        <div className='sidebar__channels'>
          {channels.map((channel) => (
            <div
              key={channel.channelid}
              className={`sidebar__channel ${selectedChannel === channel.channelid ? 'sidebar__channel--selected' : ''}`}
              onClick={() => handleChannelClick(channel.channelid)}
            >
              {channel.channelname}
            </div>
          ))}
        </div>

        <div className="sidebar__menu">
          <div className="sidebar__menuIcons">
            <img src={Assets.homeIcon} alt="home" className="sidebar__menuIcon" onClick={() => setView("home")} />
            <img src={Assets.profileIcon} alt="profile" className="sidebar__menuIcon" onClick={() => setView("profile")} />
            <img src={Assets.addIcon} alt="add" className="sidebar__menuIcon" onClick={() => setIsPopupVisible(true)} />
            <img src={Assets.logoutIcon} alt="add" className="sidebar__menuIcon" onClick={handleLogOut} />
          </div>
        </div>

        {isPopupVisible && (
          <div className="popup">
            <div className="popup__content">
              <div className="popup__close" onClick={handleClosePopup}>
                <img src={Assets.closeIcon} alt="close" onClick={handleClosePopup} />
              </div>
              <h1>Exited for New Channel!</h1>
              <div className="popup__field">
                <input type="text" ref={channelname} placeholder="Channel Name" required />
              </div>
              <div className="popup__field">
                <input type="text" ref={tagline} placeholder="Tagline" required />
              </div>
              <div className="popup__field">
                <input type="text" ref={channeltypecd} placeholder="Category" required />
              </div>
              <div className="popup__field">
                <input type="text" ref={about} placeholder="Description" required />
              </div>
              <button type="submit" onClick={handleCreateChannel} className="popup__btn">Launch Channel</button>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;