import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import type { QuizQuestion, UserAnswer, QuizContextValue } from "./quiz-types";

function App() {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);

    const [answers, setAnswers] = useState<UserAnswer[]>([]);

    const context: QuizContextValue = {questions, answers, setQuestions, setAnswers};

    const location = useLocation();

    function startSameQuiz(){
        if(location.pathname !== "/quiz"){
            setAnswers([]);
        }
    }

    return (
        <div>
            <h1 className= "text-foreground">
                Quiz App
            </h1>

            <nav>
                <Link to="/"> Settings </Link>
                <Link to="/quiz" onClick={startSameQuiz}> Quiz </Link>
                <Link to="/results"> Result </Link>
            </nav>

            <main>
                <Outlet context={context} />
            </main>
        </div>
    );
}

export default App;