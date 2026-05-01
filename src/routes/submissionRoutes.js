const express = require("express");
const {
  submitAssignment,
  getSubmissions
} = require("../controllers/submissionController");

const router = express.Router();

router.post("/", submitAssignment);
router.get("/", getSubmissions);

module.exports = router;