import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { motion } from "framer-motion";

import { projectsAction } from "../store/projectsSlice";
import { useWriteToDatabase } from "../hooks/use-writeToDataBase";
import AddButton from "../components/AddButton";
import Project from "../components/Project";
import InputModal from "../components/InputModal";

const MainPage = ({ showModalHandler, showModal }) => {
  const projects = useSelector((state) => state.projects);
  const sortedProjects = [...projects];
  projects.length > 1 &&
    sortedProjects.sort(function sortProjects(a, b) {
      return a.milliseconds - b.milliseconds;
    });
  const [inputError, setInputError] = useState("");
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const writeProjectToDatabase = useWriteToDatabase();

  useEffect(() => {
    if (sortedProjects.length > 0) {
      if (userData.id === null) return;
      const addedProject = sortedProjects[sortedProjects.length - 1];
      writeProjectToDatabase(userData.id, "set", addedProject);
    }
  }, [sortedProjects]);

  const [inputedProjectName, setInputedProjectName] = useState("");

  const addNewProject = () => {
    const re = /([\\\/\.\#\$\[\]])/;

    if (re.test(String(inputedProjectName).toLowerCase())) {
      setInputError(
        `The project name can't contain ".", "#", "$", "/", "\" "[", or "]"`
      );
      return;
    }
    if (
      projects?.filter((project) => project.projectName === inputedProjectName)
        .length > 0 ||
      inputedProjectName === ""
    ) {
      setInputError(
        "The project name must be unique and consist of at least 1 character"
      );
      return;
    }

    showModalHandler();
    setInputError("");
    dispatch(projectsAction.addNewProjectAction(inputedProjectName));
  };

  const deleteProject = (project) => {
    dispatch(projectsAction.deleteProjectAction(project.projectName));
    writeProjectToDatabase(userData.id, "remove", project);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: { duration: 0.7 },
      }}
    >
      {showModal && (
        <InputModal
          addNewItemHandler={addNewProject}
          showModalHandler={showModalHandler}
          inputedItemName={inputedProjectName}
          setInputedItemName={setInputedProjectName}
          text={`Choose a project name`}
          inputError={inputError}
        />
      )}
      <div className="container--flex">
        <TransitionGroup component="ul" className="projects--table">
          <li className="button--add">
            <AddButton
              showModalHandler={showModalHandler}
              text={"New project"}
            />
          </li>

          {sortedProjects.map((project) => (
            <CSSTransition
              key={project.projectName}
              timeout={500}
              classNames="item-animated"
            >
              <Project project={project} deleteProject={deleteProject} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>

      <style jsx="true">
        {`
          * {
            text-align: center;
          }

          .container--flex {
            display: flex;
            justify-content: center;
          }
          .button--add {
            width: 180px;
            height: 180px;
            border: 6px solid white;
            box-sizing: border-box;
            border-radius: 3px;
          }
          .button--add:hover {
            cursor: pointer;
            transform: scale(1.03, 1.03);
          }
          .projects--table {
            margin-top: 5vh;
            margin-left: 5vw;
            margin-right: 5vw;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            grid-row-gap: 35px;
            width: 80vw;
          }

          .item-animated-enter {
            opacity: 0;
          }
          .item-animated-enter-active {
            opacity: 1;
            transition: opacity 400ms ease-in;
          }
          .item-animated-exit {
            opacity: 1;
          }
          .item-animated-exit-active {
            opacity: 0;
            transition: opacity 400ms ease-in;
          }
        `}
      </style>
    </motion.div>
  );
};

export default MainPage;
