const Assignment = require("../models/Assignment");
const Submission = require("../models/Submission");

const submitAssignment = async (req, res) => {
  try {
    const { assignmentId, studentName, content } = req.body;

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: "Not found" });
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

module.exports = { submitAssignment };