import React, {useEffect, useState, useContext} from "react";
import Container from "../common/Container";
import axios from "axios";
import { AuthContext } from "../poviders/AuthProvider";
import { useParams } from "react-router-dom";
import Service from "../Services/Service";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

const DisplayService = () => {
    const params = useParams();

    const navigate = useNavigate();

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

                console.log(res.data);
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

    const displayServices = () => {
        return displayedServices.map(service => {
            return <Service service={service} key={service.name} isPII={false}/>
        });
    }

    const onClick = () => {
        navigate(`/service/newService/${params.companyId}`);
    }

    const displayParsedPage = () => {
        return (
            <Container>
                {displayServices()}
             
            <Button onClick={onClick}>Add New Service</Button>
            </Container>
        );
    }

    return (
        <Container>
            {loading ?
                <h1>Loading...</h1>
                :
                displayParsedPage()
            }

        </Container>
    );
}

export default DisplayService;