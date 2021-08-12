import React from 'react'
import "./ProfileScreen.css";
import Nav from "../Nav"
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice"
import { auth } from '../firebase';
import { useHistory } from "react-router-dom"

function ProfileScreen() {
    const history = useHistory();

    const user = useSelector(selectUser);
    return (
        <div className="profileScreen">
            <Nav />
            <div className="profileScreen__body">
                <h1>Edit Profile</h1>
                <div className="profileScreen__info">
                    <img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" alt="" />
                    <div className="profileScreen__details">
                        <h2>{user.email}</h2>

                        <div className="profileScreen__plans">
                            <h3>Plans ( Current Plan : Free )</h3>
                            <p>Expiry Date : Never</p>
                            <p>Netflix Free</p>
                            
                            <button onClick={() => {history.push("/");auth.signOut()}} className="profileScreen__signout">Sign out</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen
