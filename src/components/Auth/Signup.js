import React, {useState} from "react";
import axios from "axios";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignupForm";
import NewCompanyForm from "./NewCompanyForm";
import InlineInputContainer from "../common/InlineInputContainer";

const Signup = () => {
    const navigate = useNavigate();

    const [userSubmitted, setUserSubmitted] = useState(false);

    const [companySubmitted, setCompanySubmitted] = useState(false);

    const [loading, setLoading] = useState(false);

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

    const [savedUserId, setSavedUserId] = useState();
    const [savedCompanyId, setSavedCompanyId] = useState();

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

    const onFinalSubmit = () => {
        const data = newUser;
        
        console.log("reached");
    
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
        console.log("hit this point");
        if (!loading) {

            try {
                const res = await axios.post("http://localhost:8080/auth/signup", data);

                setLoading(true);

                console.log(res.data);

                setSavedUserId(res.data.id);

                _login(data);
            } catch (err) {
                console.log(err.message ? err.message : err.response);
            }
        }
    }

    // Next: Create Company
    // Next: Connect User to Company
    // Next: User Account Invites via POP

    const _login = async (data) => {
        try {
            const res = await axios.post("http://localhost:8080/auth/signin", data);

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

            setSavedCompanyId(res.data.id);

            _connectUserToCompany(res.data.id, userId, token);
        } catch (err) {
            console.error(err.response ? err.response : err.message);
        }
    }

    const _connectUserToCompany = async (companyId, userId, token) => {
        console.log(companyId);
        console.log(userId);

        try {
            const res = await axios.put(`http://localhost:8080/users/addCompanyToUser/${userId}`, {id: companyId}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const resTwo = await axios.put(`http://localhost:8080/company/addPrimaryAdmin/${userId}`, {id: companyId}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const resThree = await axios.put(`http://localhost:8080/company/addUser/${userId}`, {id: companyId}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(res.data);
            console.log(resTwo.data);
            console.log(resThree.data);
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
                onSubmit={onFinalSubmit}
                onChange={updateCompanyForm}
                newCompany={newCompany}
            />
        )
    }

    const displayForms = () => {
        if (!userSubmitted) {
            return displaySignupForm();
        } else if (!companySubmitted) {
            return displayNewCompanyForm();   
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