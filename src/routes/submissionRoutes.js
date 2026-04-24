const express = require("express");
const { submitAssignment } = require("../controllers/submissionController");

const router = express.Router();

router.post("/", submitAssignment);

module.exports = router;