import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { addNewProjectAction } from "../store";

const MainPage = () => {
  const projects = useSelector((state) => state);
  const dispatch = useDispatch();

  const prj = Array.from(projects);

  const addNewProject = () => {
    dispatch(addNewProjectAction(prompt()));
  };

  return (
    <>
      <h1>Projects App</h1>
      <p>Select your project</p>
      <div>
        <button onClick={addNewProject}>Create new project</button>
        {console.log(projects)}
        <ul>
          {prj.map((project) => (
            <li>
              <Link to={`/${project.name}`}>{project.name} </Link>
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
