import React from "react";
import {Route, Routes} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Home from "../Home";
import Signup from "../Auth/Signup";
import Login from "../Auth/Login";
import CurrentUser from "../user/CurrentUser";

const AppRouter = () => {
    return (
        <div style={{width: "100%", flexDirection: "column"}}>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="currentUser" element={<CurrentUser/>}/>
        </Routes>
    </div>
    )
    
}

export default AppRouter;