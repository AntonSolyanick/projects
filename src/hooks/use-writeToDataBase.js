import { getDatabase, ref, set, remove } from "firebase/database";

const initialProject = {
  projectName: "New Project",
  projectDate: "project.projectDate",
  millisecondsDate: "0",
  queue: ["queue"],
  development: ["development"],
  done: ["done"],
};

export const useWriteToDatabase = () => {
  return (userId, action, project = initialProject) => {
    const db = getDatabase();
    if (action === "set") {
      set(ref(db, `${userId}/${project.projectName}`), {
        projectDate: project.projectDate,
        millisecondsDate: project.millisecondsDate,
        queue: project.queue,
        development: project.development,
        done: project.done,
      });
    } else {
      remove(ref(db, `${userId}/${project.projectName}`));
    }
  };
};