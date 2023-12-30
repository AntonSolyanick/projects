import { Link } from "react-router-dom";

import DeleteButton from "./DeleteButton";

const Project = ({ project, deleteProject }) => {
  return (
    <li className="project--container">
      <Link
        to={`/${project.projectName}`}
        className="container--grid"
        onClick={(e) => {
          if (e.target.tagName === "BUTTON") {
            e.preventDefault();
            deleteProject(project);
          }
        }}
      >
        <p className="project--date">{project.projectDate}</p>
        <p className="project--name">{project.projectName}</p>
        <DeleteButton width={65} />
      </Link>

      <style jsx="true">
        {`
          .project--container {
            box-sizing: border-box;
            width: 180px;
            height: 180px;
            border-radius: 25px;
            background-color: #3f3333;
            border: 1px solid white;
            box-shadow: 2px 3px 3px white;
          }

          .project--container:hover {
            transform: scale(1.03, 1.03);
          }
          .project--name {
            margin-top: 5px;
            margin-bottom: 30px;
            width: 145px;
            word-break: break-all;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: bold;
            height: 50px;
            color: white;
            text-shadow: 2px 2px black;
          }
          .project--date {
            position: relative;
            left: 40px;
            top: -10px;
            font-size: 13px;
          }
          .container--grid {
            vertical-align: middle;
            vertical-align: baseline;
            display: grid;
            max-height: 140px;
            grid-template-rows: 0.5fr 1fr 0.5fr;
            justify-items: center;
          }
        `}
      </style>
    </li>
  );
};

export default Project;
