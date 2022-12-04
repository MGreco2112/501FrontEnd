import React, {useContext, useEffect, useState} from "react";
import { AuthContext } from "../poviders/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "../common/Container";
import InlineInputContainer from "../common/InlineInputContainer";
import Company from "../Companies/Company";


const CurrentUser = (props) => {

    const [auth] = useContext(AuthContext);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState();

    useEffect(() => {

        const _getCurrentUser = async () => {
            try {
                const res = await axios.get("http://localhost:8080/users/currentUser", {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                setUser(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err.message ? err.message : err.response);
            }
        }

        setLoading(true);
        if (auth.token) {
            _getCurrentUser();
        }
    }, [auth]);

    const onClick = (companyId) => {
        navigate(`/company/${companyId}`)
    }

    const formatPage = () => {
        console.log(user);
        return (
            <Container>
                <div style={{
                            flex: 1,
                            flexDirection: 'column',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
        
                    <h1>{user.username}</h1>

                    <Company
                        companyName={user.company.companyName}
                        companyId={user.company.companyId}
                        onSelect={onClick}
                    />
                </div>
            </Container>
        );
    }

    return (
        <Container>

            { loading ?

                <InlineInputContainer/>
            :
                formatPage()
            }

        </Container>
    )
}

export default CurrentUser;