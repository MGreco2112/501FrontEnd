import React from "react";
import Container from "../common/Container";
import InlineInputContainer from "../common/InlineInputContainer";
import Form from "../common/Form";
import Button from "../common/Button";
import Input from "../common/Input";
import Radio from "../common/Radio";

const NewCompanyForm = (props) => {
    const {onSubmit, onChange, newCompany} = props;

    const handleChange = (e) => {
        onChange(e.target.id, e.target.value);
    }

    const onClick = () => {
        const radioButtons = document.getElementsByName("companyType");

        if (radioButtons[0].checked) {
            newCompany.servesPeople = true;
            newCompany.servesCompanies = false;
        } else {
            newCompany.servesPeople = false;
            newCompany.servesCompanies = true;
        }
    }

    return (
        <Container>
            <Form onSubmit={onSubmit} style={{marginTop: '1em'}}>
                <InlineInputContainer>
                    <Input
                        name="companyName"
                        id="companyName"
                        value={newCompany.companyName}
                        placeholder="Company Name"
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                    <Radio id="servesPeople" name="companyType" value={0} label="Company Serves People" onClick={onClick}/>
                    <Radio id="servesCompanies" name="companyType" value={1} label="Company Serves Companies" onClick={onClick}/>
                </InlineInputContainer>
            <Button>Submit</Button>
            </Form>
        </Container>
    );
}

export default NewCompanyForm;