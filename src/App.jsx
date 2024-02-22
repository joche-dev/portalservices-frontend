import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserContext } from "./providers/UserProvider";
import Navbar from "./components/Navbar";

function App() {
  const { token } = useContext(UserContext);

  return (
    <>
      <Navbar />
    </>
  )
}

export default App
