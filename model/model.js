const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  freeSeats: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  flightNumber: {
    type: String,
    required: true,
  },
  time: {
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
  },
});

module.exports = mongoose.model("flights", dataSchema);