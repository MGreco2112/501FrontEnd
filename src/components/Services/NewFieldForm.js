import React from "react";
import Form from "../common/Form";
import InlineInputContainer from "../common/InlineInputContainer";
import Button from "../common/Button";
import Container from "../common/Container";
import Input from "../common/Input";
import Radio from "../common/Radio";
import Checkbox from "../common/Checkbox";
import StringInputField from "./StringInputField";
import IntegerInputField from "./IntegerInputField";
import FloatInputField from "./FloatInputField";

const NewFieldForm = (props) => {
    const {onSubmit, onChange, newField} = props;

    const handleChange = (e) => {
        onChange(e.target.id, e.target.value);
    }

    const handleRadio = () => {
        if (document.getElementById("isString").checked) {
            onChange("isString", true);
        } else {
            onChange("isString", false);
        }

        if (document.getElementById("isInt").checked) {
            onChange("isInt", true);
        } else {
            onChange("isInt", false);
        }

        if (document.getElementById("isFloat").checked) {
            onChange("isFloat", true);
        } else {
            onChange("isFloat", false);
        }

    }

    const handleCheckbox = () => {
        if (document.getElementById("pii").checked) {
            newField.isPii = true;
        }
    }

    const displayForm = () => {
        return (
            <Form onSubmit={onSubmit} style={{marginTop: '1em'}}>
                <InlineInputContainer>
                    <Input
                        name="name"
                        id="name"
                        value={newField.name}
                        placeholder="Field Name"
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                    <Radio id="isString" name="fieldType" label="Text Data" onClick={handleRadio}/>
                    <Radio id="isInt" name="fieldType" label="Standard Number" onClick={handleRadio}/>
                    <Radio id="isFloat" name="fieldType" label="Decimal Number" onClick={handleRadio}/>
                </InlineInputContainer>
                <InlineInputContainer>
                    <Checkbox id="pii" name="pii" onChange={handleCheckbox} label="Confidential Information"/>
                </InlineInputContainer>
                <InlineInputContainer>
                    {newField.isString ?
                        <StringInputField onChange={handleChange} newField={newField}/>
                        :
                        <InlineInputContainer/>
                    }
                    {newField.isInt ?
                        <IntegerInputField onChange={handleChange} newField={newField}/>
                        :
                        <InlineInputContainer/>
                    }
                    {newField.isFloat ?
                        <FloatInputField onChange={handleChange} newField={newField}/>
                        :
                        <InlineInputContainer/>
                    }
                </InlineInputContainer>
                <Button>Submit</Button>
            </Form>
        );
    }

    return (
        <Container>
            {displayForm()}
        </Container>
    );
}

export default NewFieldForm;