import { Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import ProjectPage from "./pages/ProjectPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} exact></Route>
      <Route path="/:projectName" element={<ProjectPage />} exact></Route>
      {/* <div className="head">Heading</div>

      <style jsx>
        {`
          .head {
            background-color: black;
          }
        `}
      </style> */}
    </Routes>
  );
}

export default App;
