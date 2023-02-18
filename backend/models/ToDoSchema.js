const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
  title: {
    require: true,
    type: String,
    trim: true,
  },
  text: {
    type: String,
  },
  time: {
    hr: { type: Number },
    mins: { type: Number },
    day: { type: [Number] },
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Todo", ToDoSchema);
