import React from "react";
import {Route, Routes} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Home from "../Home";
import Signup from "../Auth/Signup";
import Login from "../Auth/Login";
import CurrentUser from "../user/CurrentUser";
import InviteUser from "../InviteUsers/InviteUser";
import AcceptUserRoleInvite from "../InviteUsers/AcceptUserRoleInvite";
import DisplayCompany from "../Companies/DisplayCompany";
import DisplayService from "../Services/DisplayService";

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
            <Route path="/invite/:role/:username/:inviteId" element={<AcceptUserRoleInvite/>}/>
            <Route path="/company/:companyId" element={<DisplayCompany/>}/>
            <Route path="/service/:companyId" element={<DisplayService/>}/>
        </Routes>
    </div>
    )
    
}

export default AppRouter;