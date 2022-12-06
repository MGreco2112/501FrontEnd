import React, {useState, useContext} from "react";
import axios from "axios";
import { AuthContext } from "../poviders/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const PostNewService = () => {
    const params = useParams();

    const navigate = useNavigate();

    const [auth] = useContext(AuthContext);

    const [newService, setNewService] = useState({
       name: "",
       isExternallyFunded: undefined,
       isFunded: undefined,
       date: "",
       fName: "",
       lName: "",
       address: "",
       city: "",
       gender: "",
       age: undefined
    });

    

    return (
        <h1>NewService</h1>
    );
}

export default PostNewService;