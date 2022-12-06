import React from "react";
import InlineInputContainer from "../common/InlineInputContainer";
import Input from "../common/Input";

const IntegerInputField = (props) => {
    const {onChange, newField} = props;

    return (
        <InlineInputContainer>
            <Input
                name="IntegerValue"
                id="IntegerValue"
                value={newField.IntegerValue}
                placeholder="Whole Number Data"
                onChange={onChange}
                required
                />
        </InlineInputContainer>
    );
}

export default IntegerInputField;