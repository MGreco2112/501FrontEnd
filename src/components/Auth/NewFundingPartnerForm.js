import React from "react";
import Container from "../common/Container";
import Form from "../common/Form";
import InlineInputContainer from "../common/InlineInputContainer";
import Input from "../common/Input";
import Radio from "../common/Radio";
import Button from "../common/Button";

const NewFundingPartnerForm = (props) => {
    const {onSubmit, onChange, newPartner} = props;

    const handleChange = (e) => {
        onChange(e.target.id, e.target.value);
    }

    const onClick = () => {
        const radioButtons = document.getElementsByName("fundingRate");

        if (radioButtons[0].checked) {
            newPartner.isOneTime = true;
        } else if (radioButtons[1].checked) {
            newPartner.isFundedMonthly = true;
        } else {
            newPartner.isFundedAnnually = true;
        }
    }

    return (
        <Container>
            <h1>Submit New Funding Partner</h1>
            <Form onSubmit={onSubmit} style={{marginTop: "1em"}}>
                <InlineInputContainer>
                    <Input
                        name="partnerName"
                        id="partnerName"
                        value={newPartner.partnerName}
                        placeholder="New Partner Name"
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                    <Input
                        name="fundingAmount"
                        id="fundingAmount"
                        value={newPartner.fundingAmount}
                        placeholder="Amount To Be Funded"
                        onChange={handleChange}
                        required
                    />
                    <Input
                        name="fundingDate"
                        id="fundingDate"
                        value={newPartner.fundingDate}
                        placeholder="Funding Date"
                        onChange={handleChange}
                        required
                    />
                </InlineInputContainer>
                <InlineInputContainer>
                    <Radio id="isOneTime" name="fundingRate" label="One Time Funding" onClick={onClick}/>
                    <Radio id="isFundedMonthly" name="fundingRate" label="Monthly Funding" onClick={onClick}/>
                    <Radio id="isFundedAnnually" name="fundingRate" label="Annual Funding" onClick={onClick}/>
                </InlineInputContainer>
                <Button>Submit</Button>
            </Form>
        </Container>
    );
}

export default NewFundingPartnerForm;