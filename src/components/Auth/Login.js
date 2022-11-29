import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../poviders/AuthProvider";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";

const Login = () => {
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState({
        username: "",
        password: ""
    });

    const [auth, setAuth] = useContext(AuthContext);

    const updateForm = (field, value) => {
        setCurrentUser({
            ...currentUser,
            [field]: value
        });
    }

    const onSubmit = () => {
        const data = currentUser;

        _loginUser(data);
    }

    const _loginUser = async (data) => {
        try {
            const res = await axios.post("http://localhost:8080/auth/signin", data);

            setAuth({
                token: res.data.token,
                profile: {
                    id: res.data.id,
                    username: res.data.username
                },
                roles: res.data.roles
            });

            console.log(res.data);

            navigate("/");
        } catch (err) {
            console.error(err.message ? err.message : err.response);
        }
    }

    return (
        <Container>
            <h1>Login</h1>

            <LoginForm
                currentUser={currentUser}
                onChange={updateForm}
                onSubmit={onSubmit}
            />
        </Container>
    )
}

export default Login;