import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Container from "../common/Container";
import AcceptUserInviteForm from "./AcceptUserInviteForm";


const AcceptUserRoleInvite = () => {
    const params = useParams();

    const navigate = useNavigate();
    
    const [newUser, setNewUser] = useState({
        username: params.username,
        password: ""
    });

    const updateForm = (field, value) => {
        setNewUser({
            ...newUser,
            [field]: value
        });
    }

    const onSubmit = () => {
        _postNewUser(newUser);
    }

    const _postNewUser = async (data) => {
        try {
            const res = await axios.post("http://localhost:8080/auth/signup", data);
            
            navigate("/login");
        } catch (err) {
            console.error(err.response ? err.response : err.message);
        }
    }
    
    return (
        <Container>
            <AcceptUserInviteForm
                onSubmit={onSubmit}
                onChange={updateForm}
                newUser={newUser}
            />
        </Container>
    );
}

export default AcceptUserRoleInvite;