import React, {useContext, useEffect} from "react";
import { AuthContext } from "../poviders/AuthProvider";
import axios from "axios";


const CurrentUser = (props) => {

    const [auth] = useContext(AuthContext);

    useEffect(() => {
        console.log(auth.token);

        const _getCurrentUser = async () => {
            try {
                const res = await axios.get("http://localhost:8080/users/currentUser", {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                console.log(res.data);
            } catch (err) {
                console.error(err.message ? err.message : err.response);
            }
        }

        if (auth.token) {
            _getCurrentUser();
        }
    }, [auth])

    return (
        <h1>Current User</h1>
    )
}

export default CurrentUser;