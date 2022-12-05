import React from "react";
import BorderCard from "../common/BorderCard";

const Partner = (props) => {
    const {partner} = props;

    const onSelect = () => {
        props.onSelect(partner.name);
    }

    return (
        <BorderCard onClick={onSelect} style={{flexDirection: "column", alignment: "center"}}>
            {partner.name}
        </BorderCard>
    );
}

export default Partner;