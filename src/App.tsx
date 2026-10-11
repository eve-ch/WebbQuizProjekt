import { useState } from "react";
import { Link, Outlet } from "react-router";
import type { QuizQuestion, UserAnswer, QuizContextValue } from "./quiz-types";

function App() {
    const [questions, setQuestions] = useState<QuizQuestion[]>([
        {
            question: "What does HTML stand for?",
            correct_answer: "HyperText Markup Language",
            incorrect_answers: [
                "HighText Machine Language",
                "HyperText Markdown Language",
                "Home Tool Markup Language"
            ],
            options: [
                "HighText Machine Language",
                "HyperText Markup Language",
                "Home Tool Markup Language",
                "HyperText Markdown Language"
            ]
        },
        {
            question: "Which language is used to style web pages?",
            correct_answer: "CSS",
            incorrect_answers: ["HTML", "Python", "SQL"],
            options: ["HTML", "CSS", "Python", "SQL"]
        }
    ]);

    const [answers, setAnswers] = useState<UserAnswer[]>([]);

    const context: QuizContextValue = {
        questions,
        answers,
        setQuestions,
        setAnswers
    };

    return (
        <div>
            <h1>Quizappen</h1>

            <nav>
                <Link to="/">Inställningar</Link>
                {" | "}
                <Link to="/quiz">Quiz</Link>
                {" | "}
                <Link to="/results">Resultat</Link>
            </nav>

            <main>
                <Outlet context={context} />
            </main>
        </div>
    );
}

export default App;