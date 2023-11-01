const mongoose = require("mongoose");

const passengersItemSchema = new mongoose.Schema({
  ageGroup: String,
  firstName: String,
  lastName: String,
  gender: String,
  birthDate: mongoose.Schema.Types.Mixed,
});

const cartItemSchema = new mongoose.Schema({
  flightId: String,
  passengers: {
    type: [passengersItemSchema],
    required: true,
  },
});

const flightDataSchema = new mongoose.Schema({
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

const userDataSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  cart: {
    type: [cartItemSchema],
    required: true,
  },
});

const FlightModel = mongoose.model("flights", flightDataSchema);
const UserModel = mongoose.model("users", userDataSchema);

module.exports = {
  FlightModel,
  UserModel,
};
