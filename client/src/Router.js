// Components
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import RandomNumberGen from "./components/RandomNumberGen/RandomNumberGen";
import Navbar2 from "./components/Navbar2/Navbar2";
import Todo from "./components/Todo/Todo";
import SignUp from "./components/Sign up/SignUp";
import Files from "./components/Files/Files";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./App";

function Router() {
  const user = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/numberGen" element={<RandomNumberGen />} />
        <Route exact path="/todo" element={<Todo />} />
        <Route exact path="/files" element={<Files />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signUp" element={<SignUp />} />
      </Routes>
      <Navbar2 />
    </BrowserRouter>
  );
}

export default Router;
