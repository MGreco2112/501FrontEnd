import React, {useEffect, useState, useContext} from "react";
import Container from "../common/Container";
import axios from "axios";
import { AuthContext } from "../poviders/AuthProvider";
import { useParams } from "react-router-dom";

const DisplayService = () => {
    const params = useParams();

    const [auth] = useContext(AuthContext);

    const [displayedServices, setDisplayedServices] = useState();

    const [displayedPIIServices, setDisplayedPIIServices] = useState();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const _getParsedServicesByCompanyId = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/service/servicesByCompanyId/parsed/${params.companyId}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                setDisplayedServices(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err.message ? err.message : err.response);
            }
        }

        setLoading(true);
        if (auth.token) {
            _getParsedServicesByCompanyId();
        }
    }, [auth]);

    const _getPIIServices = async () => {
        if (auth.roles.contains("ROLE_ADMIN") || auth.roles.contains("ROLE_MANAGER")) {        
            try {
                const res = await axios.get(`localhost:8080/service/servicesByCompanyId/${params.companyId}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                setDisplayedPIIServices(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err.message ? err.message : err.response);
            }
        }
    }

    const displayPage = () => {
        return (
            <Container>

            </Container>
        );
    }

    return (
        <Container>
            {loading ?
                <h1>Loading...</h1>
                
                :
                <h1>DisplayService</h1>
            }

        </Container>
    );
}

export default DisplayService;