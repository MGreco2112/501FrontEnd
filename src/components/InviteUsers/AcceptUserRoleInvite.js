import React, {useState, useEffect} from "react";
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
        password: "",
        roles: []
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

    useEffect(() => {
        const populateRoles = () => {
            console.log(params.role);

            let userRoles = [];

            switch (params.role) {
                case "user":
                    userRoles = ["user"];
                    break;
                case "manager":
                    userRoles = ["user", "manager"];
                    break;
                case "admin":
                    userRoles = ["user", "admin"];
                    break;
                case "readOnly":
                    userRoles = ["read-only"];
                    break;
                default:
                    alert("Invalid Invite");
                    // useNavigate("/");
                    break;
            }

            setNewUser({
                ...newUser,
                roles: userRoles
            })
        }
        populateRoles();
    }, [])

    const _postNewUser = async (data) => {
        const invite = {
            inviteId: params.inviteId
        };

        try {
            const res = await axios.post("http://localhost:8080/auth/signup", data);

            _loginUser(data);
        } catch (err) {
            console.error(err.response ? err.response : err.message);
        }
    }

    const _loginUser = async (data) => {
        try {
            const login = await axios.post("http://localhost:8080/auth/signin", data);

            _acceptInvite(login.data.token);
        } catch (err) {
            console.error(err.message ? err.response : err.message);
        }
    }

    const _acceptInvite = async (token) => {
        const invite = {
            inviteId: params.inviteId
        };

        try {
            const acceptInvite = await axios.put("http://localhost:8080/users/acceptInviteToCompany", invite, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
            });
            
            console.log(acceptInvite.data);

            navigate("/login");
        } catch (err) {
            console.error(err.message ? err.message : err.response);
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