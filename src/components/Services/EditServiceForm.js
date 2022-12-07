/**private String name;
    private boolean isExternallyFunded;
    private boolean isFunded;
    private String date; */
import React from "react";
import Container from "../common/Container";
import Form from "../common/Form";
import Button from "../common/Button";
import Input from "../common/Input";
import InlineInputContainer from "../common/InlineInputContainer";
import Checkbox from "../common/Checkbox";
import EditCustomFields from "./EditCustomFields";

const EditServiceForm = (props) => {
    const {onSubmit, onChange, service, customFields} = props;

    const handleChange = (e) => {
        onChange(e.target.id, e.target.value);
    }

    const handleFunding = () => {
        if (document.getElementById("isFunded").checked) {
            onChange("isFunded", true);
        } else {
            onChange("isFunded", false);
        }
    }

    const handleExternalFunding = () => {
        if (document.getElementById("isExternallyFunded").checked) {
            onChange("isExternallyFunded", true);
        } else {
            onChange("isExternallyFunded", false);
        }
    }

    const displayCustomFields = () => {
        return customFields.map(field => {
            return (
                // <EditCustomFields field={field} key={field.id}/>
                <div/>
            );
        })
    }

    return (
        <Container>
            <Form onSubmit={onSubmit} style={{marginTop: '1em'}}>
                <InlineInputContainer>
                    <Input
                        name="name"
                        id="name"
                        value={service.name}
                        placeholder="Service Name"
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                    <Input
                        name="date"
                        id="date"
                        value={service.date}
                        placeholder="Service Date"
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                    <Checkbox id="isExternallyFunded" name="funding" onChange={handleExternalFunding} label="Externally Funded" checked={service.isExternallyFunded}/>
                    <Checkbox id="isFunded" name="funding" onChange={handleFunding} label="Funding Complete" checked={service.isFunded}/>
                </InlineInputContainer>
                {displayCustomFields()}
            <Button>Submit</Button>
            </Form>
        </Container>
    )
}

export default EditServiceForm;