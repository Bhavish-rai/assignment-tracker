const Assignment = require("../models/Assignment");

// CREATE
const createAssignment = async (req, res) => {
  try {
    const { title, subject, description, dueDate } = req.body;

    const assignment = await Assignment.create({
      title,
      subject,
      description,
      dueDate
    });

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET
const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();

    const updated = assignments.map((a) => {
      if (new Date() > a.dueDate) {
        a.status = "expired";
      }
      return a;
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
const updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
const deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment
};