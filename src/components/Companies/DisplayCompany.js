import React, {useState, useContext, useEffect} from "react";
import { AuthContext } from "../poviders/AuthProvider";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "../common/Container";
import InlineInputContainer from "../common/InlineInputContainer";

const DisplayCompany = () => {
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

    console.log(company);

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

                            {/* {displayRecords()} */}
                            <h2>Test Information</h2>
                                
                        </div>
                        <div style={{flexDirection: 'column'}}>
                            
                            {/* {formatComments()} */}
                            <h2>Test Information</h2>

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