import React, {useState, useContext} from "react";
import axios from "axios";
import { AuthContext } from "../poviders/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Container from "../common/Container";
import NewServiceForm from "./NewServiceForm";
import NewFieldForm from "./NewFieldForm";

const PostNewService = () => {
    const params = useParams();

    const navigate = useNavigate();

    const [auth] = useContext(AuthContext);

    const [serviceSubmitted, setServiceSubmitted] = useState(false);

    const [newService, setNewService] = useState({
       name: "",
       isExternallyFunded: false,
       date: "",
       fName: "",
       lName: "",
       address: "",
       city: "",
       gender: "",
       age: undefined
    });

    const [newServiceFields, setNewServiceFields] = useState([]);

    const [newServiceField, setNewServiceField] = useState({
        name: "",
        isString: false,
        isInt: false,
        isFloat: false,
        isPii: false,
        stringValue: "",
        intValue: undefined,
        floatValue: undefined
    });

    const updateNewServiceForm = (field, value) => {
        setNewService({
            ...newService,
            [field]: value
        });
    }

    const updateNewFieldForm = (field, value) => {
        setNewServiceField({
            ...newServiceField,
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

    const onFieldFormSubmit = () => {
        alert("Form Completed");
    }

    const displayForms = () => {
        if (!serviceSubmitted) {
            return displayNewServiceForm();
        } else {
            return displayNewFieldForm();
        }
    }

    const displayNewServiceForm = () => {
        return (
            <NewServiceForm
                onSubmit={onServiceFormSubmit}
                onChange={updateNewServiceForm}
                newService={newService}
            />
        );
    }

    const displayNewFieldForm = () => {
        return (
            <NewFieldForm
                onSubmit={onFieldFormSubmit}
                onChange={updateNewFieldForm}
                newField={newServiceField}
            />
        );
    }


    return (
        <Container>
            {displayForms()}
        </Container>
    );
}

export default PostNewService;