import React, {useContext, useState, useEffect} from "react";
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

    const [company, setCompany] = useState({
        companyId: ""
    });

    useEffect(() => {
        const _getCompanyId = async () => {
            try {
                const res = await axios.get("http://localhost:8080/users/currentUser", {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                setCompany({
                    companyId: res.data.company.companyId
                });
            } catch (err) {
                console.error(err.message ? err.message : err.response);
            }
        }

        if (auth.token) {
            _getCompanyId();
        }
    }, [auth])

    const updateForm = (field, value) => {
        setNewUser({
            ...newUser,
            [field]: value
        });
    }

    const onSubmit = () => {
        console.log(company.companyId);

        _sendInviteCall(newUser);
    }

    const _sendInviteCall = async (data) => {

        const updatedBody = `This is a test of the automated invite system via frontend`

        if (data.roles.contains("admin")) {
            updatedBody += `\nClick link to sign up http://localhost:3000/invite/admin/`
        } else if (data.roles.contains("manager")) {
            updatedBody += `\nClick link to sign up http://localhost:3000/invite/manager/`
        } else if (data.roles.contains("view only")) {
            updatedBody += `\nClick link to sign up http://localhost:3000/invite/viewOnly/`
        } else {
            updatedBody += `\nClick link to sign up http://localhost:3000/invite/user/`
        }

        updatedBody += `${data.email}/${company.companyId}`;

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