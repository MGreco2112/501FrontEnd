import React from "react";
import Form from "../common/Form";
import InlineInputContainer from "../common/InlineInputContainer";
import Button from "../common/Button";
import Container from "../common/Container";
import Input from "../common/Input";
import Radio from "../common/Radio";
import Checkbox from "../common/Checkbox";

const NewFieldForm = (props) => {
    const {onSubmit, onChange, newField} = props;

    const handleChange = (e) => {
        onChange(e.target.id, e.target.value);
    }

    const handleRadio = () => {
        if (document.getElementById("isString").checked) {
            newField.isString = true;
        } else if (document.getElementById("isInt").checked) {
            newField.isInt = true;
        } else if (document.getElementById("isFloat").checked) {
            newField.isFloat = true;
        }

        placeNewInputs();
    }

    const placeNewInputs = () => {
        let destination = document.getElementById("inputPlane");

        if (newField.isString) {

            destination =
                <Input
                    name="stringValue"
                    id="stringValue"
                    value={newField.stringValue}
                    placeholder="Text Data"
                    onChange={handleChange}
                    required
                />
            ;
            console.log(destination);
            return;
        } else if (newField.isInt) {

            destination = (
                <Input
                    name="intValue"
                    id="intValue"
                    value={newField.intValue}
                    placeholder="Number Value"
                    onChange={handleChange}
                    required
                />
            );
            console.log(destination);
            return;
        } else if (newField.isFloat) {
            destination = (
                <Input
                    name="floatValue"
                    id="floatValue"
                    value={newField.floatValue}
                    placeholder="Decimal Number Value"
                    onChange={handleChange}
                    required
                />
            );
            console.log(destination);
            return;
        } else {
            destination = (
                <div/>
            );
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
                    <div id="inputPlane"/>
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