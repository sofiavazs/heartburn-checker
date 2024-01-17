import React, { useEffect, useState } from "react";

import { Questionnaire } from "./lib/interfaces";
import { getFormData } from "../src/api/getFormData";
import PatientQuestionnaire from "./PatientQuestionnaire";

const App = () => {
  const [formData, setFormData] = useState<Questionnaire>();

  useEffect(() => {
    getFormData()
      .then((response) => setFormData(response))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {formData ? (
        <PatientQuestionnaire formData={formData} />
      ) : (
        <h1>Something went wrong, please try again.</h1>
      )}
    </>
  );
};

export default App;
