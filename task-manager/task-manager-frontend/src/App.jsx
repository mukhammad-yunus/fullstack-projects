import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then((res) => setTasks(res.data));
  }, []);
  const addTask = ()=>{
    if(newTask.trim()){
      axios.post("http://localhost:5000/tasks", {title: newTask, completed: false}).then((res)=>{
        setTasks([...tasks, res.data]);
        setNewTask("")
      })
    }
  }

  const toggleTask = (id)=>{
    const task = tasks.find((t) => t.id == id)
    axios.put(`http://localhost:5000/tasks/${id}`, {completed: !task.completed}).then((res)=>{
      setTasks(tasks.map((t)=>(t.id === id? res.data : t)))
    })
  }

  const deleteTask = (id)=>{
    axios.delete(`http://localhost:5000/tasks/${id}`).then(()=>{
      setTasks(tasks.filter((t)=> t.id !== id))
    })
  }
  return (
    <div>
      <h1>Task Manager</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.title}
            <button onClick={()=> toggleTask(task.id)}>✔</button>
            <button onClick={()=> deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
