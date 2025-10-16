// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

// ⚙️ MongoDB Connection
mongoose.connect("mongodb+srv://dheeraj:dheeraj123@cluster0.xcpnmyo.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.error("❌ MongoDB connection error:", err.message));

// 🧩 Todo Schema & Model
const todoSchema = new mongoose.Schema({
  text: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

const Todo = mongoose.model("Todo", todoSchema);

// 🌐 Routes
app.get("/", (_, res) => res.send("🔥 Todo API is Live!"));

// ➕ Create Todo
app.post("/create", async (req, res) => {
  try {
    const todo = new Todo({ text: req.body.text });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📋 Get All Todos
app.get("/todos", async (_, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Update Todo
app.patch("/update/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );
    if (!todo) return res.status(404).send("Todo not found");
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ❌ Delete Todo
app.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Todo not found");
    res.send("Deleted successfully");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🖥 Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`⚙️ Server running on port ${PORT}`));
