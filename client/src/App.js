import "./App.css";
import { createContext } from "react";
import User from "./Contexts/User";
import Router from "./Router";

export const UserContext = createContext();

function App() {
  return (
    <div className="App">
      <User>
        <Router />
      </User>
    </div>
  );
}

export default App;
