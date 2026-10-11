import { useEffect, useState } from "react";
import type { Category } from "./quiz-types";

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
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;

        fetchCategories(url)
            .then(categories => {
                if (!ignore) {
                    setData(categories);
                    setError(null);
                }
            }).catch(() => {
                if (!ignore) {
                    setError("Kategorierna kunde inte hämtas.");
                }
            });

        return () => {
            ignore = true;
        };
    }, [url]);

    return { data, error };
}
export { safeFetchJson, fetchCategories, useFetchCategories };