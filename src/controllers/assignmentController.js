const Assignment = require("../models/Assignment");

// CREATE
const createAssignment = async (req, res) => {
  try {
    const { title, subject, description, dueDate } = req.body;

    // ✅ Validation
    if (!title || !subject || !description || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

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

// GET ALL
const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();

    // auto update status
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
    res.json({ message: "Assignment deleted" });
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