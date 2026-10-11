import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Card, CardHeader, CardTitle,} from "@/components/ui/card";

import type {Category, QuizOptions, QuizContextValue} from "./quiz-types";
import {useFetchCategories, fetchQuestions} from "./fetchQuestions";

import { useOutletContext } from "react-router";
import { useNavigate } from "react-router";

//Ett alternativ i formuläret
type SelectOption = {
    label: string;
    value: string;
}

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
    { label: "Lätt", value: "easy" },
    { label: "Medel", value: "medium" },
    { label: "Svår", value: "hard" },
];
function QuizSettings() {

    //hämtning sköts av hooken i fetchQuestions
    const categories =
        useFetchCategories("https://opentdb.com/api_category.php");

    const categoryOptions: SelectOption[] = [
        {label: "Alla kategorier", value: "all"}, ...makeOptions(categories),
    ];

    //formuläret börjar utan valda alternativ
    const [category, setCategory] = useState<SelectOption | null>(null);
    const [amount, setAmount] = useState<SelectOption | null>(null);
    const [difficulty, setDifficulty] = useState<SelectOption | null>(null);
    const [showError, setShowError] = useState(false);

    //uppdatera state i App
    const { setQuestions, setAnswers } = useOutletContext<QuizContextValue>();

    const navigate = useNavigate();
    //hanterar ladning och hämtningsfel i formuläret
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

   async function handleSubmit(event: React.SubmitEvent){
        event.preventDefault(); //hindra formuläret att ladda om sidan

        if(isLoading) return;

        //alla tre fält måste vara valda
        if(!category|| !amount || !difficulty){
            setShowError(true);
            return;
        }
        const selectedDifficulty = difficulty.value;

        // Kontrollera att svårighetsgraden passar QuizOptions
        if (
            selectedDifficulty !== "easy" &&
            selectedDifficulty !== "medium" &&
            selectedDifficulty !== "hard"
        ) {
            return;
        }

        // Omvandla formulärvalen till inställningar för API:et
        const quizOptions: QuizOptions = {
            category:
                category.value === "all"
                    ? null
                    : Number(category.value),
            amount: Number(amount.value),
            difficulty: selectedDifficulty,
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
                    : "Frågorna kunde inte hämtas. Försök igen."
            );
        } finally {
            setIsLoading(false);
        }
    }
    return (
    <Card className="mx-auto mt-4 w-full max-w-lg p-6">
        <CardHeader>
            <CardTitle>Quizets inställningar</CardTitle>
        </CardHeader>

        <form noValidate onSubmit={handleSubmit} className="space-y-6">
            <Select value={category} onValueChange={setCategory}>

                <SelectTrigger aria-label="Välj kategori">
                    <SelectValue placeholder="Välj kategori" />
                </SelectTrigger>

                <SelectContent>
                    {categoryOptions.map(option => (
                        <SelectItem key={option.value} value={option}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select value={amount} onValueChange={setAmount}>
                <SelectTrigger aria-label="Välj antal frågor">
                    <SelectValue placeholder="Välj antal frågor" />
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
                <SelectTrigger aria-label="Välj svårighetsgrad">
                    <SelectValue placeholder="Välj svårighetsgrad" />
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
                    Välj kategori, antal frågor och
                    svårighetsgrad.
                </p>
            )}
            {fetchError && (
                <p role="alert">{fetchError}</p>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Hämtar frågor..." : "Starta quiz"}
            </Button>
        </form>
    </Card>
);
}


export default QuizSettings;
