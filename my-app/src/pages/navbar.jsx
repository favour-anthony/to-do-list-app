import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { db, auth } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"; 

const Navbar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [showModal, setShowModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("Auth state changed:", currentUser);
    });
    return () => unsubscribe(); 
  }, []);


  const toggleModal = () => setShowModal(!showModal);

  const addTask = async () => {
    if (!taskTitle.trim()) {
      alert("Task title cannot be empty!");
      return;
    }
    
    if (!user) {
      alert("You must be logged in to add a task.");
      return;
    }
    try {
      setLoading(true);
      console.log("Adding task for user:", user.uid);

      await addDoc(collection(db, "tasks"), {
        userId: user.uid,
        title: taskTitle,
        description: taskDescription,
        completed: false,
        createdAt: new Date(),
      });

      console.log("Task added successfully!");
      taskTitle("");
      taskDescription("");
      setShowModal(false);
    } catch (error) {
      console.error("Error adding task:", error.code, error.message);
      alert(`Firestore Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-1/5 bg-white p-5 shadow-lg h-screen">
      <h1 className="text-2xl font-bold text-center text-[#ba5112]" style={{marginBottom:"30px"}}>To-Do App</h1>

      <button
        className="flex items-center justify-center  text-black px-4 py-2 rounded shadow-lg  mx-auto "
        style={{ backgroundColor: "#ffffff", marginTop:"50px"}}
        onClick={toggleModal}
      >
        Add Task
        <span className="flex items-center justify-center  bg-[#ba5112] text-[#ffffff]" style={{height:"25px", width:"25px", fontSize:"large",fontWeight:"bold",borderRadius:"50%",marginLeft:"10px"}}>
          +
        </span>
      </button>

      <nav className="mt-15 text-center">
        <Link
          style={{marginBottom:"20px"}}
          to="/dashboard"
          className={`block px-4 py-2 rounded hover:bg-[#edb046f6] ${activeTab === "/" ? "bg-[#edb046] text-white" : "text-black"}`}
          onClick={() => setActiveTab("/")}
        >
          Dashboard
        </Link>

        <Link
          style={{marginBottom:"20px"}}
          to="/active"
          className={`block px-4 py-2 rounded hover:bg-[#edb046] ${activeTab === "/active" ? "bg-[#edb046] text-white" : "text-black"}`}
          onClick={() => setActiveTab("/active")}
        >
          Active
        </Link>
        <Link
          to="/completed"
          className={`block px-4 py-2 rounded hover:bg-[#edb046] ${activeTab === "/completed" ? "bg-[#edb046] text-white" : "text-black"}`}
          onClick={() => setActiveTab("/completed")}
        >
          Completed
        </Link>
      </nav>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-lg font-semibold mb-4">Add Task</h2>
            <input
              type="text"
              placeholder="Task Title"
              className="w-full p-2 border rounded mb-3"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <textarea
              placeholder="Task Description"
              className="w-full p-2 border rounded mb-3"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              
            ></textarea>
            <div className="flex justify-end gap-4">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={toggleModal}>
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#ba5112] text-black rounded"
                onClick={addTask}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
