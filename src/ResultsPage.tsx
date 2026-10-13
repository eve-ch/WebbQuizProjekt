import { useOutletContext, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import type { QuizContextValue } from "@/quiz-types.ts";

function ResultsPage() {
    const { questions, answers, setAnswers } = useOutletContext<QuizContextValue>();

    const navigate = useNavigate();

    // visa meddelandet om quizet inte är genomfört
    if (questions.length === 0 || answers.length < questions.length) {
        return <div className="flex min-h-[60vh] items-center justify-center px-6">
                <p className="text-center text-2xl font-semibold text-foreground">
                    Complete a quiz first to see your result
                </p>
            </div>
    }

    // Resultatet beräknas bara när quizet är genomfört
    const correctAnswers = answers.filter(answer => {
        const question = questions[answer.questionIndex];

        return (question && answer.selectedAnswer === question.correct_answer);
    }).length;

    function restartQuiz() {
        setAnswers([]);
        navigate("/");
    }

    return (
        <Card className="mx-auto mt-4 w-full max-w-lg p-6">
            <CardHeader>
                <CardTitle>Result</CardTitle>
            </CardHeader>

            <CardContent>
                <h2>
                    You got {correctAnswers} of {questions.length} Correct!
                </h2>

                <Button type="button" onClick={restartQuiz}>
                    Start again
                </Button>
            </CardContent>
        </Card>
    );
}

export default ResultsPage;