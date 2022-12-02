import React from "react";
import Container from "../common/Container";
import InlineInputContainer from "../common/InlineInputContainer";
import Form from "../common/Form";
import Input from "../common/Input";
import Checkbox from "../common/Checkbox";
import Button from "../common/Button";

const InviteUserForm = (props) => {
    const {onSubmit, onChange, newUser} = props;

    const handleChange = (e) => {
        onChange(e.target.id, e.target.value);
    }

    const onClick = () => {
        const roleButtons = document.getElementsByName("roleButtons");
        const userRoles = [];

        for (let i = 0; i < roleButtons.length; i++) {
            if (roleButtons[i].checked) {
                userRoles.push(roleButtons[i].value);
            }
        }

        newUser.roles = userRoles;

    }

    return (
        <Container>
            <Form onSubmit={onSubmit} style={{marginTop: "1em"}}>
                <InlineInputContainer>
                    <Input
                        name="email"
                        id="email"
                        value={newUser.email}
                        placeholder={"Email Address"}
                        onChange={handleChange}
                        type="email"
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                    <Checkbox id="admin" name="roleButtons" value="admin" onChange={onClick} label="Admin Access"/>
                    <Checkbox id="manager" name="roleButtons" value="manager" onChange={onClick} label="Manager Access"/>
                    <Checkbox id="view-only" name="roleButtons" value="view only" onChange={onClick} label="Read-Only Access"/>
                </InlineInputContainer>
                <Button>Submit</Button>
            </Form>
        </Container>
    );
}

export default InviteUserForm;