import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Feed from "../Feed/Feed";
import "./Success.css";

function Success() {

    return (
        <div className="app">
            <div className="app__body">
                <Sidebar />
                <Feed />
            </div>
        </div>
    );
}

export default Success;