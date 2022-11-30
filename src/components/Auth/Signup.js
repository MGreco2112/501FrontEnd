import React, {useState} from "react";
import axios from "axios";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignupForm";

const Signup = () => {
    const navigate = useNavigate();

    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        fName: "",
        lName: "",
        roles: ["admin"]
    })

    const updateForm = (field, value) => {
        setNewUser({
            ...newUser,
            [field]: value
        });
    }

    const onSubmit = () => {
        const data = newUser;

        _createUser(data);
    }

    const _createUser = async (data) => {
        try {
            const res = await axios.post("http://localhost:8080/auth/signup", data);

            console.log(res.data);

            _login(data);
        } catch (err) {
            console.log(err.message ? err.message : err.response);
        }
    }

    // Next: Create Company
    // Next: Connect User to Company
    // Next: User Account Invites via POP

    const _login = async (data) => {
        try {
            const res = await axios.post("http://localhost:8080/auth/signin", data);

            navigate("/login")
        } catch (err) {
            console.error(err.response ? err.response : err.message);
        }
    }

    return (
        <Container>
            <h1>Signup</h1>

            <SignupForm
                newUser={newUser}
                onChange={updateForm}
                onSubmit={onSubmit}
            />
        </Container>
    )
}

export default Signup;