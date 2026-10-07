import { Link, Outlet } from "react-router";

function App() {
  return (

      <div>
        <h1>Quizappen</h1>

        <nav>
          <Link to="/">Inställningar</Link>
          {" | "}
          <Link to="/quiz">Quiz</Link>
          {" | "}
          <Link to="/results">Resultat</Link>
        </nav>

        <main>
          <Outlet/>
        </main>

      </div>
  );
}

export default App;