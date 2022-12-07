import React, {useEffect, useState, useContext} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../common/Container";
import { AuthContext } from "../poviders/AuthProvider";

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

                        <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <h2>Funding Date:</h2>
                            <h3>{service.date}</h3>
                        </div>
                        {service.fName != null ? 
                            <div style={{flexDirection: 'column'}}>
                                <h2>Name:</h2>
                                <h3>{service.fName}</h3> <h3>{service.lName}</h3>
                                <h2>Address:</h2> <h2>City:</h2>
                                <h3>{service.address}</h3> <h3>{service.city}</h3>
                                <h2>Gender:</h2>
                                <h3>{service.gender}</h3>
                            </div>
                            :
                            <div/>    
                        }
                        <div style={{flexDirection: 'column', paddingLeft: '20px'}}>
                            {service.funded ?
                                <h2>Service Funded</h2>
                                :
                                <h2>Service Not Funded</h2>
                            }
                            {service.isEnternallyFunded ?
                                <h2>Externally Funded</h2>
                                :
                                null
                            }
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