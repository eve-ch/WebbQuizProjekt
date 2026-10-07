import { useOutletContext } from "react-router";
import type { QuizContextValue } from "./quiz-types";


function QuizPage() {
    const { questions } = useOutletContext<QuizContextValue>(); //hämta datan som App skickar genom sitt outlet

    return(
        <div>
            <h2>Quiz</h2>
            <p>Antal hämtade frågor: {questions.length}</p>
        </div>
);
}

export default QuizPage;