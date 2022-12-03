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

        const updatedBody = `This is a test of the automated invite system via frontend`

        if (data.roles.contains("admin")) {
            updatedBody += `\nClick link to sign up http://localhost:3000/invite/admin/${data.email}/${auth.profile.id}`
        } else if (data.roles.contains("manager")) {
            updatedBody += `\nClick link to sign up http://localhost:3000/invite/manager/${data.email}/${auth.profile.id}`
        } else if (data.roles.contains("view only")) {
            updatedBody += `\nClick link to sign up http://localhost:3000/invite/viewOnly/${data.email}/${auth.profile.id}`
        } else {
            updatedBody += `\nClick link to sign up http://localhost:3000/invite/user/${data.email}/${auth.profile.id}`
        }

        setNewUser({
            ...newUser,
            body: updatedBody
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