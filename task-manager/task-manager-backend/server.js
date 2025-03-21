const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json())

// Temporary database (in-memory)
let tasks = [
  {id: 1, title: "Learn Node.js", completed: false},
  {id: 2, title: "Build a full-stack app", completed: false},
]

app.get("/tasks", (req, res)=>{
  res.json(tasks);
})

app.get("/tasks/:id", (req, res)=>{
  const {id} = req.params;
  const index = tasks.findIndex((task)=> task.id == id)
  if (index != -1) {
    res.json(tasks[index])
  } else {
    res.status(404).json({error: "Task not found"})
  }
})
app.post("/tasks", (req, res)=>{
  const newTask = {id: tasks.length + 1, ...req.body};
  tasks.push(newTask)
  res.json(newTask)
})

app.put('/tasks/:id', (req, res)=>{
  const {id} = req.params;
  const index = tasks.findIndex((task)=> task.id == id);
  if(index !=-1){
    tasks[index] = {...tasks[index], ...req.body};
    res.json(tasks[index])
  } else{
    res.status(404).json({error: "Task not found"})
  }
})

app.delete("/tasks/:id", (req, res)=>{
  tasks= tasks.filter((task)=> task.id != req.params.id);
  res.json({message: "Task deleted"})
})

app.listen(5000, ()=> console.log("Server running on port 5000"));