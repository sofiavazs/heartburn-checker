# Heartburn Checker 🩺

Multi step questionnaire to assess heartburn and provide an outcome based on the patient's answers.

## How to run locally

First, run `npm install` to install the dependencies needed.

To start the development server run:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- Typescript
- React
- Styled Components
- Axios

## Project Structure

`App.tsx`: Parent component, data is fecthed, set in a state and sent in as a prop to the `PatientQuestionnaire.tsx` component

`/api`: data request using axios to mimic an API request.

`/components`:

`PatientQuestionnaire.tsx`: Renders the questionnaire questions, answers and encapsulates the logic for the user to advance in the questionnaire once it selects an answer or move backwards, also renders the `ProgressBar.tsx` and `OutcomeComponent.tsx` components.

`ProgressBar.tsx`: reusable progress bar component that accepts a value as prop and fills incrementally giving a visualisation how far the user is along the questionnaire.

`OutcomeComponent.tsx`: Renders the outcome

## Styling

Styling was done with `styled components` (CSS-in-JS) following mock-ups provided. My approach was to keep most of the styled components within the component they're being used except the button which is being used in couple components - in the future I would like to extract and make them more reusable so they can be used globally.
