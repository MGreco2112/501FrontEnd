import React from "react";
import BorderCard from "../common/BorderCard";

const Service = (props) => {
    const {service} = props;

    const onSelect = () => {
        props.onSelect(service);
    }

    return (
        <BorderCard onClick={onSelect} style={{flexDirection: "column", alignment: "center"}}>
            {service.name}
        </BorderCard>
    );
}

export default Service;