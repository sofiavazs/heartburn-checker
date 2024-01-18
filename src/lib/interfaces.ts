export interface Questionnaire {
  questions: Question[];
  outcomes: Outcome[];
}

export interface Question {
  id: string;
  question_text: string;
  answers: Answers[];
  next: NextQuestion[];
}

export interface Answers {
  id: string;
  label: string;
  score: string;
}

interface NextQuestion {
  answered?: string;
  next_question?: string;
  max_score?: string;
  outcome?: string;
}

export interface Outcome {
  id: string;
  text: string;
  show_booking_button: boolean;
}
