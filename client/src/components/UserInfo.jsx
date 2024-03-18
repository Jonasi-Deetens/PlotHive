import "../assets/styles/components/UserInfo/userinfo.css"
import React, { useContext, useState } from 'react'
import profile from "../assets/img/portraits/portrait1.jpeg";
import { UserContext } from '../providers/UserContext';
import UserUpdateForm from './UserUpdateForm';

const UserInfo = () => {
    const { user, logout } = useContext(UserContext);
    const [editing, setEditing] = useState(false);
    return (
        <div className='profile'>
            <img src={profile} alt="profile-picture" />     
            <br />       
            <button onClick={() => setEditing(!editing)} className="profile-button">{ editing ? '< Back' : 'Change password' }</button>
            {editing ? (
                <div className="profile-update">
                    <UserUpdateForm setEditing={setEditing} />
                </div>
            ) : ( 
                <div className='profile-info'>
                    <p className="profile-name">Hey, {user && user.username}</p>
                    <p className="profile-email">{user && user.email}</p>
                </div>
            )}     
            <hr />
            <button className="profile-logout" onClick={logout}>Logout</button>
        </div>
    )
}

export default UserInfo