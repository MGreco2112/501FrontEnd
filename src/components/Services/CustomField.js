import React from "react";
import BorderCard from "../common/BorderCard";

const CustomField = (props) => {
    const {field} = props;

    const onSelect = () => {
        props.onSelect(field);
    }

    const determineValue = () => {
        if (field.isString) {
            return field.stringValue;
        } else if (field.isInt) {
            return field.intValue;
        } else {
            return field.floatValue;
        }
    }

    console.log(field);

    return (

        <BorderCard onClick={onSelect} style={{flexDirection: "column", alignment: "center"}}>
            {field.name}
            {determineValue()}
        </BorderCard>
    );
}

export default CustomField;