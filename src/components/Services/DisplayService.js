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

    const formatPage = () => {
        return (
            <Container>
                <div style={{
                            flex: 1,
                            flexDirection: 'column',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                    <h1>{service.name}</h1>

                    <div style={{flexDirection: 'row'}}>

                        <div style={{flexDirection: 'column'}}>
                            <h2>Funding Date</h2>
                            <h3>{service.date}</h3>
                        </div>
                    </div>    
                </div>
            </Container>
        );
    }

    return (
        <Container>
            {loading ? 
                <h1>Loading...</h1>
                :
                formatPage()
            }
        </Container>
    );
}

export default DisplayService;