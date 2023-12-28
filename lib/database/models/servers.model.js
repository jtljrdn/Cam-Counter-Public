const { Schema, model, models } = require("mongoose");

const ServerSchema = new Schema({
  guildId: {
    type: String,
    required: true,
  },
  guildName: {
    type: String,
    required: true,
  },
  currentCount: {
    type: { type: Schema.Types.ObjectId, ref: "Count" },
  },
  countChannel: {
    type: String,
  },
  joinedAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

const Server = models.Count || model("Server", ServerSchema);

module.exports = Server;
