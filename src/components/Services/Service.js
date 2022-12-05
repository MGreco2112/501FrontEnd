import React from "react";
import BorderCard from "../common/BorderCard";

const Service = (props) => {
    const {name} = props;

    const onSelect = () => {
        props.onSelect(name);
    }

    return (
        <BorderCard onClick={onSelect} style={{flexDirection: "column", alignment: "center"}}>
            {name}
        </BorderCard>
    );
}

export default Service;