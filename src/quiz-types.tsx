// De fält vi behöver från en fråga i API
export type Question = {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};

// Användarens val i startformuläret
export type QuizOptions = {
    category: number | null;
    difficulty: "easy" | "medium" | "hard";
    amount: number;
};

// Ett svar som användaren har lämnat
export type UserAnswer = {
    questionIndex: number;
    selectedAnswer: string;
};

// Hela svaret från API
export type QuizApiResponse = {
    response_code: number;
    results: Question[];
};

// Data och funktioner som App delar med undersidor
export type QuizContextValue = {
    questions: Question[];
    answers: UserAnswer[];
    setQuestions: (newQuestions: Question[]) => void;
    setAnswers: (newAnswers: UserAnswer[]) => void;
};