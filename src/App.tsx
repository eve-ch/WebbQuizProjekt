import { useState } from "react";
import { Link, Outlet } from "react-router";
import type { QuizQuestion, UserAnswer, QuizContextValue } from "./quiz-types";

function App() {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);

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