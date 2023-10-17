import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { projectsAction } from "../store/projectsSlice";

const MainPage = () => {
  const projects = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  const addNewProject = () => {
    dispatch(projectsAction.addNewProjectAction(prompt()));
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
