const express = require("express");
const cors = require("cors");

const assignmentRoutes = require("./routes/assignmentRoutes");
const submissionRoutes = require("./routes/submissionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/assignments", assignmentRoutes);
app.use("/api/submissions", submissionRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;