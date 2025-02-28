import React, {useEffect, useState, useRef} from "react";
import Sidebar from "../Sidebar/Sidebar";
import Feed from "../Feed/Feed";
import Header from "../Header/Header";
import { useAuth } from "./contexts/AuthContext";
import apiRequest from "./api/api";
import "./Success.css";

function Success() {
    const fname = useRef();
    const sname = useRef();
    const bdate = useRef();
    const displayName = useRef();
    const tagline = useRef();
    const [selectedChannelId, setSelectedChannelId] = useState(null);
    const [view, setView] = useState("home");
    const [isnewProfile, setIsnewProfile] = useState(false);
    const { currentUser } = useAuth()

    useEffect(() => {
            fetchprofile();
    }, [currentUser]);

    const fetchprofile = async () => {
        const idToken = await currentUser.getIdToken();
        const body = {};
        try {
            const response = await apiRequest('/profiles/email/'+currentUser.email, 'GET', body, idToken);
            if (response.message === "Profile not found") {
                setIsnewProfile(true);
            }
        } catch (e) {
            console.log('Error fetching profile:', e);
        }
    };

    const handleCreateProfile = async () => {
        const newProfile = {
            fname: fname.current.value,
            sname: sname.current.value,
            bdate: bdate.current.value,
            email: currentUser.email,
            displayName: displayName.current.value,
            tagline: tagline.current.value,
        };
        const idToken = await currentUser.getIdToken();
        const body = newProfile;
        const response = await apiRequest('/profiles', 'POST', newProfile, idToken);
        if (response.success === true) {
            setIsnewProfile(false);
        }
    }
    return (
        <div className="app">
            {isnewProfile ? (
                <div className="new__profile">
                    <p>Exited to see you Join!</p>
                    <div className="new__profile__form">
                        <input className="form__field" type="text" ref={fname} placeholder="Name" />
                        <input className="form__field" type="text" ref={sname} placeholder="Surname" />
                        <input className="form__field" type="date" ref={bdate} placeholder="Birthdate" />
                        <input className="form__field" type="text" ref={displayName} placeholder="Display Name" />
                        <input className="form__field" type="text" ref={tagline} placeholder="Tagline" />
                        <button className="form__btn" onClick={handleCreateProfile}>Done!</button>
                    </div>
                </div>
            ) : 
            <>
            <div className="app__header">
                <Header />
            </div>
            <div className="app__body">
                <Sidebar onChannelSelect={setSelectedChannelId} onViewSelect={setView}/>
                <Feed selectedChannelId={selectedChannelId} view={view}/>
            </div>
            </>
            }   
        </div>
    );
}

export default Success;