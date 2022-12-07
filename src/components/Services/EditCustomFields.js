import React, {useState} from "react";
import Container from "../common/Container";
import InlineInputContainer from "../common/InlineInputContainer";
import Input from "../common/Input";
import Checkbox from "../common/Checkbox";

const EditCustomFields = (props) => {
    const {field} = props;

    const [dataType, setDataType] = useState("");

    // const updateField = (e) => {
    //     field = {
    //         ...field,
    //         [e.target.id]: e.target.value
    //     }
    // };

    // const updateCustomField = (e) => {
    //     field = {
    //         ...field,
    //         [dataType]: e.target.value
    //     }
    // }

    const handleDisplayField = (field) => {
        if (field.stringValue != null) {
            setDataType("stringValue");
            return field.stringValue;
        } else if (field.intValue != null) {
            setDataType("intValue");
            return field.intValue;
        } else {
            setDataType("floatValue");
            return field.floatValue;
        }
    }

    return (
        <Container>
            <InlineInputContainer>
                <Input
                    name="name"
                    id="id"
                    value={field.name}
                    placeholder={"name"}
                    // onChange={updateField}
                    required
                />
            </InlineInputContainer>
            <InlineInputContainer>
                <Input
                    name="value"
                    id="value"
                    value={handleDisplayField(field)}
                    // onChange={updateCustomField}
                    required
                />
            </InlineInputContainer>
        </Container>
    );
}

export default EditCustomFields;