import { useEffect, useState } from "react";
import type { Category, Question,QuizOptions, QuizApiResponse } from "./quiz-types";

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

type CategoryApiResponse = {
    trivia_categories: Category[];
};

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

//retunerar frågelista från API:et
async function fetchQuestions(settings: QuizOptions): Promise<Question[]> {
    const url = new URL("https://opentdb.com/api.php");
    // Inställningarna från formuläret lägger vi i addressen
    url.searchParams.set("amount", String(settings.amount));
    url.searchParams.set("difficulty", settings.difficulty);

    // Bara frågor med flera svarsalternativ
    url.searchParams.set("type", "multiple");
    // null betyder alla kategorier: då utelämnar vi category
    if (settings.category !== null) {
        url.searchParams.set("category", String(settings.category));
    }
    const response = await safeFetchJson<QuizApiResponse>(url);

    // API:et kan rapportera fel även när HTTP-anropet lyckas
    if (response.response_code !== 0) {
        throw new Error(
            `Frågorna kunde inte hämtas. API-kod: ${response.response_code}`
        );
    }

    return response.results;

}

export { safeFetchJson, fetchCategories, useFetchCategories, fetchQuestions};