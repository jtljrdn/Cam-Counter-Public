const { Schema, model, models } = require("mongoose");

const StatSchema = new Schema({
    guildCount: {
        type: Number,
        required: true,
    },
    userCount: {
        type: Number,
        required: false,
    },
});

const Stats = models.Stats || model("Stats", StatSchema);

module.exports = Stats;
