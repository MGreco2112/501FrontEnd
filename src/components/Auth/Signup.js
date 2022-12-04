import React, {useState, useContext} from "react";
import axios from "axios";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignupForm";
import { AuthContext } from "../poviders/AuthProvider";
import NewCompanyForm from "./NewCompanyForm";
import InlineInputContainer from "../common/InlineInputContainer";
import NewFundingPartnerForm from "./NewFundingPartnerForm";

const Signup = () => {
    const navigate = useNavigate();

    const [userSubmitted, setUserSubmitted] = useState(false);

    const [companySubmitted, setCompanySubmitted] = useState(false);

    const [loading, setLoading] = useState(false);

    const [auth, setAuth] = useContext(AuthContext);

    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        fName: "",
        lName: "",
        roles: ["admin"]
    });

    const [newCompany, setNewCompany] = useState({
        companyName: "",
        servesPeople: false,
        servesCompanies: false
    });

    const [newPartner, setNewPartner] = useState({
        name: "",
        fundingAmount: 0.0,
        fundingDate: "",
        approved: false,
        isOneTime: false,
        isFundedMonthly: false,
        isFundedAnnually: false
    })

    const updateForm = (field, value) => {
        setNewUser({
            ...newUser,
            [field]: value
        });
    }

    const updateCompanyForm = (field, value) => {
        setNewCompany({
            ...newCompany,
            [field]: value
        });
    }

    const updateNewPartnerForm = (field, value) => {
        setNewPartner({
            ...newPartner,
            [field]: value
        });
    }

    const onFinalSubmit = () => {
        const data = newUser;
    
        _createUser(data);
            
        
    }

    const onSubmit = () => {
        if (!userSubmitted) {
            setUserSubmitted(true);
        } else if (!companySubmitted) {
            setCompanySubmitted(true);
        }
        
    }

    const _createUser = async (data) => {
        if (!loading) {

            try {
                const res = await axios.post("http://localhost:8080/auth/signup", data);

                setLoading(true);

                _login(data);
            } catch (err) {
                console.log(err.message ? err.message : err.response);
            }
        }
    }

    const _login = async (data) => {
        try {
            const res = await axios.post("http://localhost:8080/auth/signin", data);

            setAuth({
                token: res.data.token,
                profile: {
                    id: res.data.id,
                    username: res.data.username
                },
                roles: res.data.roles
            });

            _createCompany(newCompany, res.data.token, res.data.id);
        } catch (err) {
            console.error(err.response ? err.response : err.message);
        }
    }

    const _createCompany = async (data, token, userId) => {
        try {
            const res = await axios.post("http://localhost:8080/company/newCompany", data, {
                headers :
                {
                    Authorization: `Bearer ${token}`
                }
            });

            // _connectUserToCompany(res.data.id, userId, token);
            _createNewPartner(newPartner, token, userId, res.data.id);
        } catch (err) {
            console.error(err.response ? err.response : err.message);
        }
    }

    const _createNewPartner = async (data, token, userId, companyId) => {
        try {
            const res = await axios.post("http://localhost:8080/fundingPartner", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            _connectUserToCompany(companyId, userId, token, res.data.id);
        } catch (err) {
            console.error(err.response ? err.response : err.message);
        }
    }

    const _connectUserToCompany = async (companyId, userId, token, partnerId) => {
            
        const company = {
            id: companyId
        };

        try {
            const res = await axios.put(`http://localhost:8080/users/addCompanyToUser/${userId}`, company, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            //TODO add choice between posting new partner and selecting existing partner to pair from Database
            const resFour = await axios.put(`http://localhost:8080/fundingPartner/addPartnerToCompany/${partnerId}`, company, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(res.data);
            console.log(resFour.data);

            navigate("/inviteUser");
        } catch (err) {
            console.error(err.message ? err.message : err.response);
        }
    }

    const displaySignupForm = () => {
        return (
            <SignupForm
                newUser={newUser}
                onChange={updateForm}
                onSubmit={onSubmit}
            />
        )
    }

    const displayNewCompanyForm = () => {
        return (
            <NewCompanyForm
                onSubmit={onSubmit}
                onChange={updateCompanyForm}
                newCompany={newCompany}
            />
        )
    }

    const displayNewFundingPartnerForm = () => {
        return (
            <NewFundingPartnerForm
                onSubmit={onFinalSubmit}
                onChange={updateNewPartnerForm}
                newPartner={newPartner}
            />
        )
    }

    const displayForms = () => {
        if (!userSubmitted) {
            return displaySignupForm();
        } else if (!companySubmitted) {
            return displayNewCompanyForm();   
        } else if (companySubmitted) {
            return displayNewFundingPartnerForm();
        }
    }

    return (
        <Container>
            <h1>Signup</h1>
            { loading ?
                <h1>Loading...</h1>
                :
                displayForms()
            }            
        </Container>
    )
}

export default Signup;