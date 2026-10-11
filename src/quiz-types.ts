// Användarens val i startformuläret
export type QuizOptions = {
    category: number | null;
    difficulty: "easy" | "medium" | "hard";
    amount: number;
};

// De fält vi behöver från en fråga i API
export type Question = {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};

// En fråga med färdigblandade svarsalternativ
export type QuizQuestion = Question & {
    options: string[]; // Alla svarsalternativ i blandad ordning
};

// Ett svar som användaren har lämnat
export type UserAnswer = {
    questionIndex: number;
    selectedAnswer: string;
};

// Svaret från API
export type QuizApiResponse = {
    response_code: number;
    results: Question[];
};

// Data och funktioner som App delar med undersidor
export type QuizContextValue = {
    questions: QuizQuestion[];
    answers: UserAnswer[];
    setQuestions: (newQuestions: QuizQuestion[]) => void;
    setAnswers: (newAnswers: UserAnswer[]) => void;
};

export type Category = {
    id: number;
    name: string;
};
