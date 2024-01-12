import React, { useState } from "react";

import { Outcomes, Questionnaire } from "./lib/interfaces";
import "./App.css";

interface Props {
  formData: Questionnaire;
}

const PatientQuestionnaire: React.FC<Props> = ({ formData }) => {
  const [questionId, setQuestionId] = useState<string>(
    formData.questions[0].id
  );
  const [patientScore, setPatientScore] = useState<number>(0);
  const [patientAnswers, setPatientAnswers] = useState<any>([]);
  const [outcome, setOutcome] = useState<Outcomes>();

  const question = formData?.questions.find(
    (question) => question.id === questionId
  );
  const answer =
    patientAnswers &&
    question?.answers.find(
      (answer) => answer.id === patientAnswers[questionId]
    );

  const selectAnswer = (answer: any) => {
    setPatientAnswers((prev: any) => ({
      ...prev,
      [questionId]: answer.id,
    }));
  };

  const nextQuestion = () => {
    const currentScore = patientScore + answer.score;
    setPatientScore(currentScore);

    const nextOptions = question?.next;

    const nextOption = nextOptions?.find((option: any) => {
      if (option.answered) {
        return option.answered === answer.id;
      } else if (typeof option.max_score === "number") {
        return currentScore <= option.max_score;
      } else {
        return true;
      }
    });

    if (nextOption?.next_question) {
      setQuestionId(nextOption.next_question);
    } else {
      const patientOutcome = formData?.outcomes.find(
        (outcome: any) => outcome.id === nextOption?.outcome
      );
      setOutcome(patientOutcome);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Heartburn checker</h1>
      </header>

      <div>
        {outcome ? (
          <div>
            <h2>Thank you for answering all the questions</h2>
            <p>{outcome.text}</p>
            {outcome.show_booking_button && (
              <button>Book an appointment</button>
            )}
          </div>
        ) : (
          <div>
            <h2>Question</h2>
            <h3>{question?.question_text}</h3>
            {question?.answers.map((answer) => (
              <button key={answer.id} onClick={() => selectAnswer(answer)}>
                {answer.label}
              </button>
            ))}
            <button disabled={!answer} onClick={nextQuestion}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientQuestionnaire;
