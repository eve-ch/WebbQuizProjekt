import { useEffect, useState } from "react";
import type { Category, QuizQuestion, QuizOptions, CategoryApiResponse, QuizApiResponse} from "./quiz-types";

async function safeFetchJson<T>(url: string | URL, init?: RequestInit) {

    return fetch(url, init).then((response) => {
        if (!response.ok) {
            throw new Error(
                `${url} returned status ${response.status} (${response.statusText})`
            );
        }
        return response.json() as Promise<T>;
    });

}

// Hämtar kategorierna från API:et
async function fetchCategories(url: string): Promise<Category[]> {

    const response = await safeFetchJson<CategoryApiResponse>(url);

    return response.trivia_categories;
}

// Kopplar hämtningen till React-state
function useFetchCategories(url: string) {
    const [data, setData] = useState<Category[]>([]);
    useEffect(() => {
        let ignore = false;
        fetchCategories(url).then(categories => {
                if (!ignore) {
                    setData(categories);
                }
            });
        return () => {
            ignore = true;
        };
    }, [url]);
    return data;
}

//Hanterar specialtecken
function decodeText(text: string): string {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
}

//retunerar frågelista från API:et
async function fetchQuestions(settings: QuizOptions): Promise<QuizQuestion[]> {
    const url = new URL("https://opentdb.com/api.php");
    // Inställningarna från formuläret lägger vi i addressen
    url.searchParams.set("amount", String(settings.amount));
    url.searchParams.set("difficulty", settings.difficulty);
    url.searchParams.set("type", "multiple");

    // null betyder alla kategorier: då utelämnar vi category
    if (settings.category !== null) {
        url.searchParams.set("category", String(settings.category));
    }
    const response = await safeFetchJson<QuizApiResponse>(url);

    // API:et kan rapportera fel även när HTTP-anropet lyckas
    if (response.response_code !== 0) {
        throw new Error(
            `Questions could not be loaded. API-code: ${response.response_code}`
        );
    }

    return response.results.map(question => { //förbereda varje fråga
       const correctAnswer = decodeText(question.correct_answer);
       const incorrectAnswers = question.incorrect_answers.map(decodeText);

        return{
            ...question,
            question: decodeText(question.question),
            correct_answer: correctAnswer,
            incorrect_answers: incorrectAnswers,
            options: shuffleOptions([ //blanda lista
                correctAnswer,
                ...incorrectAnswers,
            ]),
        };
        });

}

//Hjälp funktion för att blanda alternativen
function shuffleOptions(options: string[]): string[] {
    const shuffled = [...options];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        const temporary = shuffled[i]!;
        shuffled[i] = shuffled[j]!;
        shuffled[j] = temporary;
    }
    return shuffled;
}
export { safeFetchJson, fetchCategories, useFetchCategories, fetchQuestions};