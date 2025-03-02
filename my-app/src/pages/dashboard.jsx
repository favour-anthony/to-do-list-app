import React, { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db, auth } from "./firebase";
import TaskItem from "./taskitem";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let allTasks = [];
      let completed = 0;

      snapshot.forEach((doc) => {
        const taskData = { id: doc.id, ...doc.data() };
        if (taskData.completed) completed++;
        allTasks.push(taskData);
      });

      setTasks(allTasks);
      setCompletedCount(completed);
    });

    return () => unsubscribe();
  }, []);

  let totalTasks = tasks.length;
  let completionRate = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
  return (
    <div className="flex" >


      <div className="w-5/5">
        <button className=" px-4 py-2 text-black rounded " style={{backgroundColor:"#ba5112",marginLeft:"880px", marginBotto:"20px"}}>sign Out</button>
        <div  className="shadow-lg" style={{borde:"1px solid black", padding:"30px", boxShadow:""}}>
          <h2 className="text-3xl font-bold" >Hello, Beautiful Human!</h2>
          <div style={{paddingTop:"10px"}}>What do you want to do today?</div>
          
        </div>

        <div className="mt-6 w-4/6">
          <h3 className="text-xl font-semibold">Today's Tasks</h3>
          {tasks.length === 0 ? (
            <p>No tasks found. Add some!</p>
          ) : (
            tasks.map((task) => <TaskItem key={task.id} task={task} />)
          )}
        </div>

      
        <div className="mt-13" style={{marginLeft:"800px", position:"absolute",top:"200px"}}>
          <div style={{marginBottom:"20px"}} className="w-40 h-40 bg-[#ba5112] text-white flex flex-col items-center justify-center rounded-lg">
            <p className="text-3xl font-bold">{completionRate}%</p>
            <p>Completed tasks</p>
          </div>
          <div className="w-40 h-40 bg-[#edb046] text-white flex flex-col items-center justify-center rounded-lg">
            <p className="text-3xl font-bold">{100 - completionRate}%</p>
            <p>Active tasks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
















































































