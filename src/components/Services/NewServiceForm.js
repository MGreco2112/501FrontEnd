import React from "react";
import Container from "../common/Container";
import Form from "../common/Form";
import Button from "../common/Button";
import Input from "../common/Input";
import InlineInputContainer from "../common/InlineInputContainer";
import Checkbox from "../common/Checkbox";


const NewServiceForm = (props) => {

    const {onSubmit, onChange, newService} = props;

    const handleChange = (e) => {
        onChange(e.target.id, e.target.value);
    }

    const handleCheckbox = () => {
        const box = document.getElementById("isExternallyFunded");

        if (box.checked) {
            newService.isExternallyFunded = true;
        } else {
            newService.isExternallyFunded = false;
        }
    }

    return (
        <Container>
            <Form onSubmit={onSubmit} style={{marginTop: '1em'}}>
                <InlineInputContainer>
                    <Input
                        name="name"
                        id="name"
                        value={newService.name}
                        placeholder="Service Name"
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                    <Input
                        name="name"
                        id="name"
                        value={newService.name}
                        placeholder="Service Name"
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                    <Input
                        name="date"
                        id="date"
                        value={newService.date}
                        placeholder="Service Date"
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                    <Input
                        name="fName"
                        id="fName"
                        value={newService.fName}
                        placeholder="First Name"
                        onChange={handleChange}
                        required
                    />
                    <Input
                        name="lName"
                        id="lName"
                        value={newService.lName}
                        placeholder="Last Name"
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                    <Input
                        name="address"
                        id="address"
                        value={newService.address}
                        placeholder="Street Address"
                        onChange={handleChange}
                        required
                    />
                    <Input
                        name="city"
                        id="city"
                        value={newService.city}
                        placeholder="City"
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                    <Input
                        name="gender"
                        id="gender"
                        value={newService.gender}
                        placeholder="Gender"
                        onChange={handleChange}
                        required
                    />
                    <Input
                        name="age"
                        id="age"
                        value={newService.age}
                        placeholder="Age"
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                    <Checkbox id="isExternallyFunded" name="isExternallyFunded" onChange={handleCheckbox} label="Externally Funded"/>
                </InlineInputContainer>
                <Button>Submit</Button>
            </Form>
        </Container>
    );
}

export default NewServiceForm;