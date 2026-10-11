import {useOutletContext, useNavigate} from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function ResultsPage() {
    const {questions, answers, setAnswers} = useOutletContext<QuizContextValue>();
    const navigate = useNavigate();

    const correctAnswers = answers.filter(answer => {
        const question = questions[answer.questionIndex];
        return question && answer.selectedAnswer === question.correct_answer; //kontrollera om frågan finns och jämför sen svaren
    }).length;

    function restartQuiz(){
        setAnswers([]);
        navigate("/");
    }

    return (

        <Card className="mx-auto mt-4 w-full max-w-lg p-6">
            <CardHeader>
                <CardTitle>Resultat</CardTitle>
            </CardHeader>

            <CardContent>
                <h2>Du fick {correctAnswers} av {questions.length} rätt!</h2>
                <Button type="button" onClick={restartQuiz}>Till start</Button>
            </CardContent>
        </Card>

    );
}

export default ResultsPage;