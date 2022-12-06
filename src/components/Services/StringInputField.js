import React from "react";
import InlineInputContainer from "../common/InlineInputContainer";
import Input from "../common/Input";

const StringInputField = (props) => {
    const {onChange, newField} = props;

    return (
        <InlineInputContainer>
            <Input
                name="stringValue"
                id="stringValue"
                value={newField.stringValue}
                placeholder="Text Data"
                onChange={onChange}
                required
                />
        </InlineInputContainer>
    );
}

export default StringInputField;