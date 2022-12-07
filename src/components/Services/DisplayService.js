import React, {useEffect, useState, useContext} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "../common/Container";
import { AuthContext } from "../poviders/AuthProvider";
import EditServiceForm from "../Services/EditServiceForm";

const DisplayService = (props) => {
    const location = useLocation();

    const [auth] = useContext(AuthContext);

    const [service, setService] = useState();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadService = () => {
            setService(location.state);
            setLoading(false);
        }

        setLoading(true);
        loadService();
    }, []);

    if (!loading) {
        console.log(service);
    }

    const updateServiceForm = (field, value) => {
        setService({
            ...service,
            [field]: value
        });
    }

    return (
        <Container>
            { loading ?
                <h1>Loading...</h1>
                :

                <EditServiceForm
                    onChange={updateServiceForm}
                    service={service}
                    customFields={service.customServiceFields}
                />
                
                
            }
        </Container>
    );
}

export default DisplayService;