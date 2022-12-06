import React, {useState, useContext} from "react";
import axios from "axios";
import { AuthContext } from "../poviders/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import NewServiceForm from "./NewServiceForm";

const PostNewService = () => {
    const params = useParams();

    const navigate = useNavigate();

    const [auth] = useContext(AuthContext);

    const [serviceSubmitted, setServiceSubmitted] = useState(true);

    const [newService, setNewService] = useState({
       name: "",
       isExternallyFunded: undefined,
       date: "",
       fName: "",
       lName: "",
       address: "",
       city: "",
       gender: "",
       age: undefined
    });

    const [newServiceFields, setNewServiceFields] = useState([]);

    const updateNewServiceForm = (field, value) => {
        setNewService({
            ...newService,
            [field]: value
        });
    }

    const _postService = async (data) => {
        try {
            const res = await axios.post(`http://localhost:8080/service/${params.companyId}`, data, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            _postNewServiceFields(newServiceFields, res.data.id);
        } catch (err) {
            console.error(err.message ? err.message : err.response);
        }
    }

    const _postNewServiceFields = async (data, serviceId) => {
        let route = `http://localhost:8080/service/customServiceField`;

        if (data.length > 0) {
            route += `/bulk`;
        } else {

            if (data[0].isString) {
                route += `/string`;
            } else if (data[0].isInt) {
                route += `/integer`;
            } else {
                route += `/float`;
            }

            data = data[0];
        }
        

        route += `/${serviceId}`;

        try {
            const res = await axios.post(route, data, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });


        } catch (err) {
            console.error(err.message ? err.message : err.response);
        }
    }

    const onServiceFormSubmit = () => {
        setServiceSubmitted(true);
    }

    const displayForms = () => {
        if (!serviceSubmitted) {
            displayNewServiceForm();
        } else {

        }
    }

    const displayNewServiceForm = () => {
        return (
            <NewServiceForm
                onSubmit={onServiceFormSubmit}
                onChange={updateNewServiceForm}
                newService={newService}
            />
        )
    }


    return (
        <Container>
            {displayForms()}
        </Container>
    );
}

export default PostNewService;