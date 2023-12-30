const { Schema, model, models } = require("mongoose");

const BugSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  submittedBy: {
    type: String,
    required: true,
  },
  createdAt: {
    default: Date.now(),
    type: Date,
    required: true,
  }
});

const Bug = models.Bug || model("Bug", BugSchema);

module.exports = Bug;
