import React from "react";
import BorderCard from "../common/BorderCard"

const Company = (props) => {

    const {companyName, companyId} = props;

    const onSelect = () => {
        props.onSelect(companyId);
    }

    return (
        <BorderCard style={{flexDirection: "column", alignment: "center"}}>
            <h2>{companyName}</h2>
        </BorderCard>
    );
}

export default Company;