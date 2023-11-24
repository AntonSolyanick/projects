import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import MainPage from "./pages/MainPage";
import ProjectPage from "./pages/ProjectPage";
import "./App.css";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} exact></Route>
          <Route path="/:projectName" element={<ProjectPage />} exact></Route>
        </Routes>
      </Layout>

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
