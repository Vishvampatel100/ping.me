import React from 'react';
import './Sidebar.css';
import ProfilePicture from '../Profilepicture/Profilepicture';


function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__profile">
          <ProfilePicture />
          <h2 className="sidebar__username">Pramukh Swami</h2>
        </div>
        <div className='sidebar__channels'>  {/*max length of 15 */}
          <h2 className="sidebar__channel">Channels</h2>
          <h2 className="sidebar__channel">Channel2</h2>
          <h2 className="sidebar__channel">Channel3</h2>
          <h2 className="sidebar__channel">Channels</h2>
          <h2 className="sidebar__channel">Channel2</h2>
          <h2 className="sidebar__channel">Channel3</h2>
          <h2 className="sidebar__channel">Channels</h2>
          <h2 className="sidebar__channel">Channel2</h2>
          <h2 className="sidebar__channel">Channel3</h2>
          <h2 className="sidebar__channel">Channels</h2>
          <h2 className="sidebar__channel">Channel2</h2>
          <h2 className="sidebar__channel">Channel3</h2>
          <h2 className="sidebar__channel">Channels</h2>
          <h2 className="sidebar__channel">Channel2</h2>
          <h2 className="sidebar__channel">Channel3</h2>
          <h2 className="sidebar__channel">Channels</h2>
          <h2 className="sidebar__channel">Channel2</h2>
          <h2 className="sidebar__channel">Channel3</h2>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;     