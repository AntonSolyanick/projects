import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, set, child, get } from "firebase/database";

import { projectsAction } from "../store/projectsSlice";

const MainPage = () => {
  const projects = useSelector((state) => state.projects);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `${userData.id}`))
      .then((snapshot) => {
        dispatch(projectsAction.setProjectsFromDbAction(snapshot.val()));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userData.id]);

  const writeUserData = (userId, projects, inputedProjectName) => {
    const db = getDatabase();
    set(ref(db, `${userId}/${inputedProjectName}`), {
      queue: projects[0].queue,
      development: projects[0].development,
      done: projects[0].done,
    });
  };

  const addNewProject = () => {
    const inputedProjectName = prompt();
    dispatch(projectsAction.addNewProjectAction(inputedProjectName));
    writeUserData(userData.id, projects, inputedProjectName);
  };

  return (
    <>
      <h1>Projects App</h1>
      <p>Select your project</p>
      <div>
        <button onClick={addNewProject}>Create new project</button>
        <ul>
          {projects.map((project) => (
            <li>
              <Link to={`/${project.projectName}`}>{project.projectName} </Link>
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
