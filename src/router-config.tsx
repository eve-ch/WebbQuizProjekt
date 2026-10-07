import { createBrowserRouter, type RouteObject } from "react-router";

import App from "./App";
import QuizSettings from "./QuizSettings";
import QuizPage from "./QuizPage";
import ResultsPage from "./ResultsPage";

const routerConfig: RouteObject[] = [
    {
        Component: App,
        children: [
            {
                index: true,
                Component: QuizSettings,
            },
            {
                path: "quiz",
                Component: QuizPage,
            },
            {
                path: "results",
                Component: ResultsPage,
            },
            {
                path: "*",
                Component: PageNotFound,
            },
        ],
    },
];

function PageNotFound (){
    return <h2> Sidan kunde inte hittas</h2>;
}
const router = createBrowserRouter(routerConfig);

export default router;