import React from "react";
import BorderCard from "../common/BorderCard";

const User = (props) => {
    const {username} = props;

    const onSelect = () => {
        props.onSelect(username);
    }

    return (
        <BorderCard onClick={onSelect} style={{flexDirection: "column", alignment: "center"}}>
            <h2>{props.username}</h2>
        </BorderCard>
    );
}

export default User;