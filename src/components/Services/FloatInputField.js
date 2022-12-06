import React from "react";
import InlineInputContainer from "../common/InlineInputContainer";
import Input from "../common/Input";

const FloatInputField = (props) => {
    const {onChange, newField} = props;

    return (
        <InlineInputContainer>
            <Input
                name="FloatValue"
                id="FloatValue"
                value={newField.FloatValue}
                placeholder="Decimal Number Data"
                onChange={onChange}
                required
                />
        </InlineInputContainer>
    );
}

export default FloatInputField;