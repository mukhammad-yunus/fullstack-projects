const express = require("express");
const cors = require("cors");
const db = require("./db");
const { json } = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/tasks", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tasks ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/tasks/:id", (req, res) => {});
app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    const result = await db.query(
      "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
      [title]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err)
    res.status(500).json({error: "Database error"})
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const { completed } = req.body;
    const result = await db.query("UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *",
      [completed, id]
    );
    res.json(result.rows[0])
    
  } catch (err) {
    console.error(err)
    res.status(500).json({error: "Database error"})
  }
});

app.delete("/tasks/:id", async(req, res) => {
  try {
    await db.query("DELETE FROM tasks WHERE id = $1", [req.params.id])
    res.json({message: "Task deleted"})
  } catch (err) {
    console.error(err)
    res.status(500).json({error: "Database error"})
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
