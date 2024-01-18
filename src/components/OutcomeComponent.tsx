import React from "react";
import { Outcome } from "../lib/interfaces";
import StyledButton from "../styles/StyledButton";

interface Props {
  outcome: Outcome;
}

const OutcomeComponent: React.FC<Props> = ({ outcome }) => {
  return (
    <>
      <h2>Thank you for answering all the questions</h2>
      <h3>{outcome?.text}</h3>
      <div>
        {outcome.show_booking_button && (
          <StyledButton>Book an appointment</StyledButton>
        )}
      </div>
    </>
  );
};

export default OutcomeComponent;
