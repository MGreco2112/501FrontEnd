import React from "react";
import BorderCard from "../common/BorderCard";

const User = (props) => {
    const {user} = props;

    const onSelect = () => {
        props.onSelect(user.username);
    }

    return (
        <BorderCard onClick={onSelect} style={{flexDirection: "column", alignment: "center"}}>
            <h2>{user.username}</h2>
        </BorderCard>
    );
}

export default User;