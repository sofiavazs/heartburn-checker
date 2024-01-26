import React, { useState } from "react";
import styled from "styled-components";

import { Answers, Outcome, Questionnaire } from "../lib/interfaces";
import ProgressBar from "./ProgressBar";
import OutcomeComponent from "./OutcomeComponent";
import StyledButton from "../styles/StyledButton";

interface Props {
  formData: Questionnaire;
}

const PatientQuestionnaire: React.FC<Props> = ({ formData }) => {
  const totalNumberQuestions = formData && formData.questions.length;
  const progressIncrement = 100 / totalNumberQuestions;
  const [questionId, setQuestionId] = useState<string>(
    formData.questions[0].id
  );
  const [patientScore, setPatientScore] = useState<number>(0);
  const [patientAnswers, setPatientAnswers] = useState<{
    [key: string]: string;
  }>({});
  const [outcome, setOutcome] = useState<Outcome>();
  const [progress, setProgress] = useState<number>(progressIncrement);
  const [answerSelected, setAnswerSelected] = useState<string>("");

  /* Stores the question when there's a match with the questionId state
    which is initialised with the first question
    */
  const question = formData?.questions.find(
    (question) => question.id === questionId
  );

  const currentQuestionIndex = formData.questions.findIndex(
    (current) => current.id === questionId
  );

  /* Stores when there's a match between the answer id
     and the item from the patientAnswers state accessed with the questionId
     */
  const answer =
    patientAnswers &&
    question?.answers.find(
      (answer) => answer.id === patientAnswers[questionId]
    );

  /*
  Allows to add new answers to the patient answers state
  Everytime it's invoked on the answer buttons the answer object is sent in
  and the patientAnswers state is updated, by keep adding new items with the questionId as a key and the answer.id as the value
  */
  const selectAnswer = (answer: any) => {
    setPatientAnswers((prev: any) => ({
      ...prev,
      [questionId]: answer.id,
    }));
    setAnswerSelected(answer?.id);
  };

  const nextQuestion = () => {
    const currentScore = patientScore + answer!.score;
    setPatientScore(currentScore);

    // gets the next question
    const nextOptions = question?.next;

    /*
    Finds the next question, there's two instances where the next array in the question object
    is different: the first question which has the property "answered" and the last question where
    we have the "max_score" and/or "outcome"

    First question: when there's a match from the "answered" with the answer.id the object is returned,
    that then is used on the next if statement block to set the questionId and get the next question.

    Last question: when there's the property "max_score", then if the current score is less than or equal to the
    "max_score" we return that item, that then is used on the next block to update the outcome state.
    */

    const nextOption = nextOptions?.find((option: any) => {
      if (option.answered) {
        return option.answered === answer?.id;
      } else if (option.max_score) {
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
    if (progress <= 100) {
      setProgress(progress + progressIncrement);
    }
  };

  const previousQuestion = () => {
    const previousQuestionId = formData.questions[currentQuestionIndex - 1].id;
    const previousAnswer = patientAnswers[previousQuestionId];
    const answers = formData.questions.flatMap((answer) => answer.answers);
    const previousAnswerMatch = answers.find(
      (answer) => answer.id === previousAnswer
    );
    const currentAnswerScore = previousAnswerMatch?.score!;

    if (previousAnswerMatch) {
      setAnswerSelected(previousAnswerMatch.id);
    }
    setQuestionId(previousQuestionId);
    setPatientScore(patientScore - currentAnswerScore);
    setProgress(progress - progressIncrement);
  };

  return (
    <PageWrapper>
      <StyledCard>
        <CardHeader>
          {currentQuestionIndex > 0 && !outcome && (
            <button className="previous" onClick={previousQuestion} />
          )}
          <h1>Heartburn Checker</h1>
        </CardHeader>
        <ProgressBar value={progress} />
        {outcome ? (
          <>
            <CardBody>
              <OutcomeComponent outcome={outcome} />
            </CardBody>
            <CardFooter>
              <a href="/">Back to the start screen</a>
            </CardFooter>
          </>
        ) : (
          <>
            <CardBody>
              <h2>{question?.question_text}</h2>
              <span className="underline" />
              <div>
                <div className="answer-buttons-container">
                  {question?.answers.map((answer) => {
                    const isAnswerSelected = answerSelected === answer.id;
                    return (
                      <button
                        className={isAnswerSelected ? "selected" : ""}
                        key={answer.id}
                        onClick={() => selectAnswer(answer)}
                      >
                        {answer.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <StyledButton disabled={!answer} onClick={nextQuestion}>
                Next
              </StyledButton>
            </CardFooter>
          </>
        )}
      </StyledCard>
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
  max-width: 25rem;
  height: 80vh;
  margin: 1rem;
  flex-direction: column;
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

  h1 {
    font-size: 1rem;
    font-weight: 600;
    padding: 1rem;
  }
`;

const CardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 2rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 900;
    color: #3f6072;
  }

  h3 {
    font-size: 1rem;
    font-weight: 400;
    color: #3f6072;
  }

  .underline {
    width: 2.5rem;
    height: 3px;
    background-color: #e3e1e1;
    margin-bottom: 1rem;
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
        font-family: "Montserrat", sans-serif;
        font-size: 1rem;
        font-weight: 600;
        color: #75d0be;
        cursor: pointer;

        &.selected {
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
  }
`;

const CardFooter = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: center;
  padding: 2rem;

  a {
    color: #75d0be;
  }
`;
