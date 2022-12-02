import React from "react";
import Container from "../common/Container";
import Form from "../common/Form";
import Input from "../common/Input";
import InlineInputContainer from "../common/InlineInputContainer";
import Button from "../common/Button";

const AcceptUserInviteForm = (props) => {
    const {onSubmit, onChange, newUser} = props;

    const handleChange = (e) => {
        onChange(e.target.id, e.target.value);
    }

    return (
        <Container>
            <Form onSubmit={onSubmit} style={{marginTop: '1em'}}>
                <InlineInputContainer>
                    <p>Username: </p>
                    <p>{newUser.username}</p>
                </InlineInputContainer>
                <InlineInputContainer>
                    <Input
                        name="password"
                        id="password"
                        value={newUser.password}
                        placeholder="password"
                        onChange={handleChange}
                        type="password"
                        required
                    />
                </InlineInputContainer>
                <Button>Submit</Button>
            </Form>
        </Container>
    );
}

export default AcceptUserInviteForm;