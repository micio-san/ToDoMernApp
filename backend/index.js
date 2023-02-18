const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./models/ToDoSchema");
require("dotenv").config();
let connected = false;
const app = express();
const cors = require("cors");
const { updateOne } = require("./models/ToDoSchema");

app.use(express.json());
app.use(cors());

app.post("/", async (req, res) => {
  const newTodo = await req.body;
  console.log(newTodo);
  if (newTodo.title === "") {
    return;
  } else {
    await Todo.create(newTodo);
  }
});

app.get("/", async (req, res) => {
  const todos = await Todo.find({});
  res.status(200).json({ todos });
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findOne({ _id: id });
  res.status(200).json(todo);
});

app.patch("/post/:id", async (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;
  const todoUpd = await Todo.findByIdAndUpdate(
    { _id: id },
    { completed: !completed }
  );
});

app.patch("/postpatch/:id", async (req, res) => {
  const { time, title, text } = req.body;
  const { id } = req.params;
  const updatedTodo = await Todo.findByIdAndUpdate(
    { _id: id },
    {
      title: title,
      text: text,
      time: { hr: time.hr, mins: time.mins, day: time.day },
    }
  );
});

app.delete("/post/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findOneAndDelete({ _id: id });
  res.status(200).json(todo);
});

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_KEY);
app.listen(process.env.PORT);
