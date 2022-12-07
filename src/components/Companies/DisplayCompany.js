import React, {useState, useContext, useEffect} from "react";
import { AuthContext } from "../poviders/AuthProvider";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "../common/Container";
import InlineInputContainer from "../common/InlineInputContainer";
import Button from "../common/Button";
import User from "../user/User";
import Partner from "../Partner/Partner";
import { useNavigate } from "react-router-dom";

const DisplayCompany = () => {
    const navigate = useNavigate();

    const params = useParams();

    const [auth] = useContext(AuthContext);

    const [company, setCompany] = useState()

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const _getCompany = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/company/${params.companyId}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                console.log(res.data);
                setCompany(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err.message ? err.message : err.response);
            }
        }
        setLoading(true);
        if (auth.token) {
            _getCompany();
        }
    }, [auth, params.companyId]);

    const displayUsers = () => {
        if (company.users.length != 0) {
            return company.users.map(user => {
                return <User user={user} key={user.username} onSelect={onUserClick}/>
            });
        }
    }

    const displayPartners = () => {
        if (company.partnerSet.length != 0) {
            return company.partnerSet.map(partner => {
                return <Partner partner={partner} key={partner.name} onSelect={onPartnerClick}/>
            })
        }
    }

    const onClick = () => {
        navigate(`/service/${company.companyId}`);
    }
    
    const onUserClick = () => {

    }

    const onPartnerClick = () => {

    }

    const displayPage = () => {

        return (
            <Container>
                <div style={{
                            flex: 1,
                            flexDirection: 'column',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                    <h1>{company.companyName}</h1>
                    <h2>Company Info:</h2>

                    <div style={{flexDirection: 'row'}}>

                        <div style={{flexDirection: 'column'}}>

                            <h2>Services:</h2>
                            <Button type="button" onClick={onClick}>Show Connected Services</Button>
                        </div>
                        <div style={{flexDirection: 'column'}}>
                            
                            <h2>Funding Partners:</h2>

                            {displayPartners()}

                        </div>
                        <div style={{flexDirection: 'column'}}>
                            
                            <h2>Users:</h2>

                            {displayUsers()}

                        </div>
                    </div>
                </div>
            </Container>
        )
    }

    return (
        <Container>
            {loading ?
                <InlineInputContainer/>
                :
                displayPage()
            }
        </Container>
    );
}

export default DisplayCompany;