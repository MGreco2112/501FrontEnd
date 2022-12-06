import React from "react";
import BorderCard from "../common/BorderCard";

const Service = (props) => {
    const {service, isPII} = props;

    const onSelect = () => {
        props.onSelect(service);
    }

    if (isPII) {
        return (
            <BorderCard onClick={onSelect} style={{flexDirection: "column", alignment: "center"}}>
                {service.name}
                CONTAINS PII
            </BorderCard>
        )
    } else {

        return (
            <BorderCard onClick={onSelect} style={{flexDirection: "column", alignment: "center"}}>
                {service.name}
            </BorderCard>
        );
    }
}

export default Service;