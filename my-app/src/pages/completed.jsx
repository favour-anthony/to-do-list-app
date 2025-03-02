import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "./firebase";
import TaskItem from "./taskitem";

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const tasksQuery = query(collection(db, "tasks"), where("userId", "==", user.uid), where("completed", "==", true));
      const querySnapshot = await getDocs(tasksQuery);
      setCompletedTasks(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchCompletedTasks();
  }, []);

  return (
    <div>
      <h2>Completed Tasks</h2>
      {completedTasks.length > 0 ? (
        completedTasks.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <p>No completed tasks yet.</p>
      )}
    </div>
  );
};

export default CompletedTasks;

