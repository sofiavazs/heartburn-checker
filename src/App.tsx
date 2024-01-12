import React, { useEffect, useState } from "react";

import { Questionnaire } from "./lib/interfaces";
import { getFormData } from "../src/api/getFormData";
import PatientQuestionnaire from "./PatientQuestionnaire";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState<Questionnaire>();

  useEffect(() => {
    getFormData()
      .then((response) => setFormData(response))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      {formData ? (
        <PatientQuestionnaire formData={formData} />
      ) : (
        <p>Something went wrong, please try again.</p>
      )}
    </div>
  );
};

export default App;
