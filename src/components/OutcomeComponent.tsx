import React from "react";

import { Outcome } from "../lib/interfaces";
import Button from "./ui/Button";

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
          <Button variant={"primary"} label={"Book an appointment"} />
        )}
      </div>
    </>
  );
};

export default OutcomeComponent;
