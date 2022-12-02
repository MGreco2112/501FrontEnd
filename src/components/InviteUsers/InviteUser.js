import React, {useContext, useState} from "react";
import InviteUserForm from "./InviteUserForm";
import axios from "axios";
import {AuthContext} from "../poviders/AuthProvider";
import Container from "../common/Container";


const InviteUser = () => {
    const [auth] = useContext(AuthContext);

    const [newUser, setNewUser] = useState({
        email: "",
        body: "",
        roles: []
    });

    const updateForm = (field, value) => {
        setNewUser({
            ...newUser,
            [field]: value
        });
    }

    const onSubmit = () => {
        _sendInviteCall(newUser);
    }

    const _sendInviteCall = async (data) => {

        setNewUser({
            ...newUser,
            body: "This is a test of the automated invite system via frontend"
        });

        try {
            const res = await axios.post("http://localhost:8080/users/inviteUser", data, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });


        } catch (err) {
            console.error(err.message ? err.message : err.response);
        }
    }

    return (
        <InviteUserForm
            onSubmit={onSubmit}
            onChange={updateForm}
            newUser={newUser}
        />
    );
}

export default InviteUser;