import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const ActiveTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where("userId", "==", user.uid), where("completed", "==", false));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const activeTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(activeTasks);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center">Active Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-center mt-4 text-gray-500">No active tasks.</p>
      ) : (
        <ul className="mt-6">
          {tasks.map((task) => (
            <li key={task.id} className="border p-3 mb-3 rounded shadow">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <p className="mt-2 text-red-600">Pending</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActiveTasks;

