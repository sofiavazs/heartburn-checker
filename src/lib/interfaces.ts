export interface Questionnaire {
  questions: Questions[];
  outcomes: Outcomes[];
}

export interface Questions {
  id: string;
  question_text: string;
  answers: Answers[];
  next: NextQuestion[];
}

interface Answers {
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

export interface Outcomes {
  id: string;
  text: string;
  show_booking_button: boolean;
}
