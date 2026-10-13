import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Card, CardHeader, CardTitle,} from "@/components/ui/card";

import type {Category, QuizOptions, QuizContextValue, SelectOption} from "./quiz-types";
import {useFetchCategories, fetchQuestions} from "./fetchQuestions";

import { useOutletContext } from "react-router";
import { useNavigate } from "react-router";


//Omvandlar API-katogerier till formuläralternativ
function makeOptions (categories: Category[]) : SelectOption[]{
  return categories.map(category =>({
      label: category.name,
           value: String(category.id),
  }));
}

const amountOptions: SelectOption[] = [
    { label: "3", value: "3" },
    { label: "5", value: "5" },
    { label: "10", value: "10" },
];

const difficultyOptions: SelectOption[] = [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
];
function QuizSettings() {

    //hämtning
    const categories = useFetchCategories("https://opentdb.com/api_category.php");

    const categoryOptions = makeOptions(categories);

    //formuläret börjar utan valda alternativ
    const [category, setCategory] = useState<SelectOption | null>(null);
    const [amount, setAmount] = useState<SelectOption | null>(null);
    const [difficulty, setDifficulty] = useState<SelectOption | null>(null);
    const [showError, setShowError] = useState(false);

    //uppdatera state i App
    const { setQuestions, setAnswers } = useOutletContext<QuizContextValue>();
    const navigate = useNavigate();

    //hanterar laddning och hämtningsfel i formuläret
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

   async function handleSubmit(event: React.SubmitEvent){
        event.preventDefault();

        if(isLoading) return;

        //alla tre fält måste vara valda
        if(!category|| !amount || !difficulty){
            setShowError(true);
            return;
        }

        // Omvandla formulärvalen till inställningar för API:et
        const quizOptions: QuizOptions = {
            category: Number(category.value),
            amount: Number(amount.value),
            difficulty: difficulty.value,
        };

        setShowError(false);
        setFetchError(null);
        setIsLoading(true);

        try {
            const newQuestions = await fetchQuestions(quizOptions);

            setQuestions(newQuestions);
            setAnswers([]);

            navigate("/quiz");
        } catch (error) {
            setFetchError(
                error instanceof Error
                    ? error.message
                    : "Questions could not be loaded. Try again.");
        } finally {
            setIsLoading(false);
        }
    }
    return (
    <Card className="mx-auto mt-4 w-full max-w-lg p-6">
        <CardHeader>
            <CardTitle>Quiz settings</CardTitle>
        </CardHeader>

        <form noValidate onSubmit={handleSubmit} className="space-y-6">
            <Select value={category} onValueChange={setCategory}>

                <SelectTrigger aria-label="Choose category">
                    <SelectValue placeholder="Choose category" />
                </SelectTrigger>

                <SelectContent className= "w-[420px]">
                    {categoryOptions.map(option => (
                        <SelectItem key={option.value} value={option}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select value={amount} onValueChange={setAmount}>
                <SelectTrigger aria-label="Select number of questions">
                    <SelectValue placeholder="Select number of questions" />
                </SelectTrigger>

                <SelectContent>
                    {amountOptions.map(option => (
                        <SelectItem key={option.value} value={option}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger aria-label="Select Difficulty">
                    <SelectValue placeholder="Select Difficulty" />
                </SelectTrigger>

                <SelectContent>
                    {difficultyOptions.map(option => (
                        <SelectItem key={option.value} value={option}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {showError && (
                <p role="alert">
                    Please complete all fields
                </p>
            )}
            {fetchError && (
                <p role="alert">{fetchError}</p>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Loading..." : "Start quiz"}
            </Button>
        </form>
    </Card>
);
}


export default QuizSettings;
