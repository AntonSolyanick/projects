import { Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import ProjectPage from "./pages/ProjectPage";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} exact></Route>
        <Route path="/:projectName" element={<ProjectPage />} exact></Route>
      </Routes>

      <style jsx="true">
        {`
          * {
            list-style-type: none;
          }
        `}
      </style>
    </>
  );
}

export default App;
