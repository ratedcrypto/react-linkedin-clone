import { Avatar } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import './Sidebar.css';
import tree from '../images/trees.jpg';
import { selectUser } from '../features/userSlice';

function Sidebar() {
  const user = useSelector(selectUser);

  const recentItem = (topic) => (
    <div className="sidebar__recentItem">
      <span className="sidebar__hash">#</span>
      <p>{topic}</p>
    </div>
  );

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img src={tree} alt="cover" />
        <Avatar src={user.photoUrl} className="sidebar_avatar">
          {user.email[0]}
        </Avatar>
        <h2>{user.displayName}</h2>
        <h4>{user.email}</h4>
      </div>

      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p className="sidebar__statText">Who viewed you</p>
          <p className="sidebar__statNumber">5,000</p>
        </div>
        <div className="sidebar__stat">
          <p className="sidebar__statText">Views on post</p>
          <p className="sidebar__statNumber">8,000</p>
        </div>
      </div>

      <div className="sidebar__bottom">
        <p>Recent</p>
        {recentItem('programming')}
        {recentItem('reactjs')}
        {recentItem('firebase')}
      </div>
    </div>
  );
}

export default Sidebar;
