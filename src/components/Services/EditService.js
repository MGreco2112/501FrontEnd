import React, {useEffect, useState, useContext} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "../common/Container";
import { AuthContext } from "../poviders/AuthProvider";
import EditServiceForm from "../Services/EditServiceForm";

const EditService = (props) => {
    const [loading, setLoading] = useState(true);

    const {service} = props;

    const updateServiceForm = (field, value) => {

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

export default EditService;