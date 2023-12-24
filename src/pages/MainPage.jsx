import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

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

  // убрть useEffect, перенести функцию writePr... в
  useEffect(() => {
    if (sortedProjects.length > 0) {
      const addedProject = sortedProjects[sortedProjects.length - 1];
      writeProjectToDatabase(userData.id, "set", addedProject);
    }
  }, [sortedProjects]);

  const [inputedProjectName, setInputedProjectName] = useState("");

  const addNewProject = () => {
    if (
      projects.filter((project) => project.projectName === inputedProjectName)
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
    <>
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
        <ul className="projects--table">
          <li>
            <AddButton
              showModalHandler={showModalHandler}
              height={180}
              width={180}
              border={6}
              text={"New project"}
            />
          </li>

          {sortedProjects.map((project) => (
            <Project
              project={project}
              deleteProject={deleteProject}
              key={project.projectName}
            />
          ))}
        </ul>
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

          .projects--table {
            margin-top: 5vh;
            margin-left: 5vw;
            margin-right: 5vw;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            grid-row-gap: 35px;
            width: 80vw;
          }
        `}
      </style>
    </>
  );
};

export default MainPage;
