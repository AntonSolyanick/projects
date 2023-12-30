import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import MainPage from "../pages/MainPage";
import ProjectPage from "../pages/ProjectPage";

const AnimatedRoutes = ({ showModal, showModalHandler }) => {
  const location = useLocation();

  const routes = [
    { path: "/", Component: MainPage },
    { path: "/:projectName", Component: ProjectPage },
  ];

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        {routes.map(({ path, Component }) => (
          <Route
            key={path}
            exact
            path={path}
            element={
              <Component
                showModal={showModal}
                showModalHandler={showModalHandler}
              />
            }
          />
        ))}
      </Routes>
      <style jsx="true"></style>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
