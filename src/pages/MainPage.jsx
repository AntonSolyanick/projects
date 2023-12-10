import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, set, child, get, remove } from "firebase/database";

import { projectsAction } from "../store/projectsSlice";
import { useWriteToDatabase } from "../hooks/use-writeToDataBase";

const MainPage = () => {
  const projects = useSelector((state) => state.projects);
  const sortedProjects = [...projects];
  projects.length > 1 &&
    sortedProjects.sort(function sortProjects(a, b) {
      return a.millisecondsDate - b.millisecondsDate;
    });

  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const writeProjectToDatabase = useWriteToDatabase();

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `${userData.id}`))
      .then((snapshot) => {
        if (userData.id === null) {
          dispatch(projectsAction.setProjectsFromDbAction([]));
        } else {
          const dataFromDb = snapshot.val();
          dataFromDb === null
            ? dispatch(projectsAction.setProjectsFromDbAction([]))
            : dispatch(projectsAction.setProjectsFromDbAction(snapshot.val()));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userData]);

  useEffect(() => {
    if (projects.length > 0) {
      if (userData.id === null) return;
      writeProjectToDatabase(userData.id, "set", projects[projects.length - 1]);
    }
  }, [projects]);

  const addNewProject = () => {
    const inputedProjectName = prompt();
    dispatch(projectsAction.addNewProjectAction(inputedProjectName));
  };

  const deleteProject = (projectName) => {
    dispatch(projectsAction.deleteProjectAction(projectName));
  };

  return (
    <>
      <h1>Projects App</h1>
      <p>Select your project</p>
      <div>
        <button onClick={addNewProject}>Create new project</button>
        <ul>
          {sortedProjects.map((project) => (
            <li>
              <Link to={`/${project.projectName}`}>{project.projectName} </Link>
              <button
                onClick={() => {
                  deleteProject(project.projectName);
                  writeProjectToDatabase(userData.id, "remove", project);
                }}
              >
                delete
              </button>
              <p>{project.projectDate}</p>
            </li>
          ))}
        </ul>
      </div>

      <style jsx="true">
        {`
          * {
            text-align: center;
          }
        `}
      </style>
    </>
  );
};

export default MainPage;
