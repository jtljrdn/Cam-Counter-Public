const { Schema, model, models } = require("mongoose");

const TicketSchema = new Schema({
    ticketName: {
        type: String,
        required: true,
    },
    ticketDescription: {
        type: String,
        required: true,
    },
    ticketGuild: {
        type: { type: Schema.Types.ObjectId, ref: "Server" },
        required: true,
    },
});

const Tickets = models.Tickets || model("Tickets", TicketSchema);

module.exports = Tickets;
