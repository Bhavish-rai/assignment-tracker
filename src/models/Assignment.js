const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    title: String,
    subject: String,
    description: String,
    dueDate: Date,
    status: {
      type: String,
      default: "active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assignment", assignmentSchema);