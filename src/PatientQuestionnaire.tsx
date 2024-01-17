import React, { useState } from "react";

import { Outcomes, Questionnaire } from "./lib/interfaces";
import styled from "styled-components";

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

  console.log(formData);

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

  const previousQuestion = () => {
    const currentQuestionIndex = formData.questions.findIndex(
      (current) => current.id === questionId
    );
    if (currentQuestionIndex > 0) {
      const previousQuestionId =
        formData.questions[currentQuestionIndex - 1].id;
      setQuestionId(previousQuestionId);
    }
  };

  console.log(patientAnswers);

  return (
    <PageWrapper>
      {outcome ? (
        <>
          <StyledCard>
            <CardHeader>
              <h1>Heartburn Checker</h1>
            </CardHeader>
          </StyledCard>
          <h2>Thank you for answering all the questions</h2>
          <h3>{outcome.text}</h3>
          {outcome.show_booking_button && <button>Book an appointment</button>}
        </>
      ) : (
        <StyledCard>
          <CardHeader>
            {patientScore > 0 && (
              <button className="previous" onClick={previousQuestion} />
            )}
            <h1>Heartburn Checker</h1>
          </CardHeader>
          <CardBody>
            <h2>Question</h2>
            <h3>{question?.question_text}</h3>
            <div>
              <div className="answer-buttons-container">
                {question?.answers.map((answer) => (
                  <button key={answer.id} onClick={() => selectAnswer(answer)}>
                    {answer.label}
                  </button>
                ))}
              </div>
              <div className="next-button-container">
                <button
                  className="next"
                  disabled={!answer}
                  onClick={nextQuestion}
                >
                  Next
                </button>
              </div>
            </div>
          </CardBody>
        </StyledCard>
      )}
    </PageWrapper>
  );
};

export default PatientQuestionnaire;

const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledCard = styled.div`
  display: flex;
  width: 30vw;
  height: auto;
  margin: 1rem;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.51);
  text-decoration: none;

  button.previous {
    border: none;
    content: "";
    position: relative;
    left: -70px;
    background: url("./assets/icon-chevron-left.svg") no-repeat;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;

const CardHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: #3f6072;
  border-bottom: 1px solid #e3e1e1;

  h1 {
    font-size: 1rem;
    padding: 1rem;
  }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;

  h2,
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #3f6072;
  }

  div {
    display: flex;
    flex-direction: column;

    .answer-buttons-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      button {
        width: 135px;
        padding: 16px;
        background-color: transparent;
        border: 2px solid #e3e1e1;
        border-radius: 40px;
        font-size: 16px;
        font-weight: 600;
        color: #75d0be;
        cursor: pointer;

        &:focus {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #75d0be;
          color: #fff;
          border: none;
          transition: all 0.3s ease-in-out;

          &:after {
            content: "";
            display: inline-flex;
            background: url("./assets/icon-check.svg") no-repeat right;
            width: 24px;
            height: 24px;
          }
        }
      }
    }

    .next-button-container {
      display: flex;
      margin-top: 24vh;

      button.next {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 16px;
        background-color: #75d0be;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 600;
        color: #fff;
        cursor: pointer;

        &:after {
          content: "";
          position: relative;
          right: -40%;
          background: url("./assets/icon-chevron-right.svg") no-repeat;
          width: 24px;
          height: 24px;
        }

        &:disabled {
          background-color: #eceff1;
          color: #7b99a9;

          &:after {
            background: url("./assets/icon-chevron-right-grey.svg") no-repeat;
            width: 24px;
            height: 24px;
          }
        }
      }
    }
  }
`;
