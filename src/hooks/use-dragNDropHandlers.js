import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { projectsAction } from "../store/projectsSlice";

const useDragNDropHandlers = () => {
  const [curTodo, setCurTodo] = useState(null);
  const [curBoard, setCurBoard] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();

  return {
    dragStartHandler(e, todo, board) {
      setCurTodo(todo);
      setCurBoard(board);
    },

    dragLeaveHandler(e) {},

    dragOverHandler(e) {
      e.preventDefault();
    },

    dragEndHandler(e) {},

    dragDropHandler(e, todo, board) {
      e.preventDefault();
      if (e.target.className !== "todo") {
        return;
      }
      dispatch(
        projectsAction.dropAction({
          projectName: params.projectName,
          curTodo: curTodo,
          todo: todo,
          curBoard: curBoard,
          board: board,
        })
      );
    },

    onBoardDropHandler(e, board) {
      e.preventDefault();
      if (e.target.className !== "board") {
        return;
      }
      dispatch(
        projectsAction.dropOnBoardAction({
          projectName: params.projectName,
          curTodo: curTodo,
          curBoard: curBoard,
          board: board,
        })
      );
    },
  };
};

export default useDragNDropHandlers;
