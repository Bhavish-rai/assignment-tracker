const Assignment = require("../models/Assignment");
const Submission = require("../models/Submission");

// SUBMIT
const submitAssignment = async (req, res) => {
  try {
    const { assignmentId, studentName, content } = req.body;

    if (!assignmentId || !studentName || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    if (new Date() > assignment.dueDate) {
      return res.status(400).json({ message: "Deadline passed" });
    }

    const submission = await Submission.create({
      assignmentId,
      studentName,
      content
    });

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SUBMISSIONS
const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find().populate("assignmentId");
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitAssignment,
  getSubmissions
};