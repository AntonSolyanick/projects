import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { addNewTodoAction } from "../store";

const ProjectPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const project = useSelector(
    (state) =>
      state.filter((project) => {
        return project.name === params.projectName;
      })[0]
  );

  const addNewTodo = () => {
    dispatch(
      addNewTodoAction({ projectName: params.projectName, todoText: prompt() })
    );
  };

  return (
    <>
      <h2>Todos of {params.projectName} project </h2>
      <button onClick={addNewTodo}>add new Todo</button>
      <ul>
        {console.log(project.todos)}
        {project.todos.map((todo) => (
          <li>{todo}</li>
        ))}
      </ul>
    </>
  );
};

export default ProjectPage;
