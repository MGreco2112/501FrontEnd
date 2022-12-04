import React, {useState, useContext, useEffect} from "react";
import { AuthContext } from "../poviders/AuthProvider";
import { useParams } from "react-router-dom";
import axios from "axios";

const DisplayCompany = () => {
    const params = useParams();

    const [auth] = useContext(AuthContext);

    const [company, setCompany] = useState()

    useEffect(() => {
        const _getCompany = async () => {
            try {
                const res = await axios.get("http://localhost:8080/users/currentUser", {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                console.log(res.data.company);
                setCompany(res.data.company);
            } catch (err) {
                console.error(err.message ? err.message : err.response);
            }
        }

        if (auth.token) {
            _getCompany();
        }
    }, [auth]);

    console.log(company);

    return (
        <h1>DisplayCompany</h1>
    );
}

export default DisplayCompany;