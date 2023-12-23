const { Schema, model, models } = require("mongoose");

const CountSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  
});

const Count = models.Count || model("Count", CountSchema);

module.exports = Count;
