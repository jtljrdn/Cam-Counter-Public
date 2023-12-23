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
    type: {type: Schema.Types.ObjectId, ref: 'Count'},
  },
  
});

const Server = models.Count || model("Server", ServerSchema);

module.exports = Server;
