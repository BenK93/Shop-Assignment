import "./App.css";
// Components
import Navbar from "./components/Menu/Navbar";

import { BaseRouter } from "./routes";

function App() {
  return (
    <>
      <Navbar />
      <main className="app">
        <BaseRouter />
      </main>
    </>
  );
}

export default App;
