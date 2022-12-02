import React from "react";
import {Route, Routes} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Home from "../Home";
import Signup from "../Auth/Signup";
import Login from "../Auth/Login";
import CurrentUser from "../user/CurrentUser";
import InviteUser from "../InviteUsers/InviteUser";
import AcceptUserRoleInvite from "../InviteUsers/AcceptUserRoleInvite";

const AppRouter = () => {
    return (
        <div style={{width: "100%", flexDirection: "column"}}>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/currentUser" element={<CurrentUser/>}/>
            <Route path="/inviteUser" element={<InviteUser/>}/>
            <Route path="/invite/userRole/:username" element={<AcceptUserRoleInvite/>}/>
        </Routes>
    </div>
    )
    
}

export default AppRouter;