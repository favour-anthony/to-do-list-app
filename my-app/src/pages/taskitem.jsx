import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const TaskItem = ({ task }) => {
  const toggleCompletion = async () => {
    const taskRef = doc(db, "tasks", task.id);
    await updateDoc(taskRef, { completed: !task.completed });
  };

  
  return (
    <div className={`flex items-center justify-between p-4 mt-2 rounded ${task.completed ? "bg-[#edb046]" : "bg-white border"}`}>
      <p className="text-lg">{task.title}</p>
      <button className="px-3 py-1 bg-white -500 text-black rounded" onClick={toggleCompletion}>
        {task.completed ? "Undo" : "Mark as Done"}
      </button>
    </div>
  );
};

export default TaskItem;

