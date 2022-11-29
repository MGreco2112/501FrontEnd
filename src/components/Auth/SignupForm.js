import React from "react";
import Container from "../common/Container";
import InLineInputContainer from "../common/InlineInputContainer";
import Form from "../common/Form";
import Input from "../common/Input";
import Button from "../common/Button";
import Signup from "./Signup";

const SignupForm = (props) => {
    const {onSubmit, onChange, newUser} = props;

    const handleChange = (e) => {
        onChange(e.target.id, e.target.value);
    }

    return (
        <Container>
            <Form onSubmit={onSubmit} style={{marginTop: '1em'}}>
                <InLineInputContainer>
                    <Input
                        name="fName"
                        id="fName"
                        value={newUser.fName}
                        placeholder={"First Name"}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        name="lName"
                        id="lName"
                        value={newUser.lName}
                        placeholder={"Last Name"}
                        onChange={handleChange}
                        required
                    />
                </InLineInputContainer>
                <InLineInputContainer>
                <Input
                        name="username"
                        id="username"
                        value={newUser.username}
                        placeholder={"Email"}
                        onChange={handleChange}
                        required
                    />
                </InLineInputContainer>
                {/* TODO create password regex for valid passwords */}
                <InLineInputContainer>
                <Input
                        name="password"
                        id="password"
                        value={newUser.password}
                        placeholder={"password"}
                        onChange={handleChange}
                        type="password"
                        required
                    />
                </InLineInputContainer>
                <Button>Submit</Button>
            </Form>
        </Container>
    )
}

export default SignupForm;
