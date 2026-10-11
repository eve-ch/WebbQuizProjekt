import { useOutletContext, useNavigate } from "react-router";
import { useState } from "react";
import type { QuizQuestion, UserAnswer, QuizContextValue } from "./quiz-types";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";


function QuizPage() {
    const {questions, answers, setAnswers} = useOutletContext<QuizContextValue>();//hämta datan som App skickar genom sitt outlet
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); //börjar med frågan på index 0
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); //inget svar till en början
    const currentQuestion = questions[currentQuestionIndex]; //ändra senare

    if (!currentQuestion) {return <p>Inga frågor tillgängliga.</p>;}

    function nextQuestion(){
        if(selectedAnswer === null){return;} //gör inget om en knapp inte valts

        const newAnswer: UserAnswer = {questionIndex: currentQuestionIndex, selectedAnswer: selectedAnswer};

        setAnswers([...answers, newAnswer]);

        if(currentQuestionIndex < questions.length - 1){ //Om det finns fler frågor
            setCurrentQuestionIndex(currentQuestionIndex + 1); //gå till nästa fråga
            setSelectedAnswer(null); //nollställ svar
        } else {
            navigate("/results");
        }

    }

    return (
        <Card className="mx-auto mt-4 w-full max-w-lg p-6">
            <CardHeader>
                <CardTitle>Quiz</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                <p>
                    Fråga {currentQuestionIndex + 1} av {questions.length}
                </p>

                <h3>{currentQuestion.question}</h3>

                <div className="flex flex-col gap-3">
                    {currentQuestion.options.map((option) => (
                        <Button
                            key={option}
                            type="button"
                            variant={
                                selectedAnswer === option
                                    ? "default"
                                    : "outline"
                            }
                            onClick={() => setSelectedAnswer(option)}
                            className="h-auto min-h-10 whitespace-normal"
                        >
                            {option}
                        </Button>
                    ))}
                </div>

                <Button
                    type="button"
                    className="w-full"
                    disabled={selectedAnswer === null}
                    onClick={nextQuestion}
                >
                    {currentQuestionIndex === questions.length - 1 ? "visa resultat" : "Nästa fråga"}
                </Button>
            </CardContent>
        </Card>
    );
}

export default QuizPage;