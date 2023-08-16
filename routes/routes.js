const express = require("express");
const Model = require("../model/model");
const router = express.Router();

module.exports = router;

router.get("/getAll", async (req, res) => {
  try {
    const allData = await Model.find();
    res.status(200).json(allData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Маршрут для поиска рейсов по направлению и дате
router.get("/searchByDirection", async (req, res) => {
  try {
    const { from, to, date } = req.query;

    const flights = await Model.findOne({
      from: new RegExp(from, "i"),
      to: new RegExp(to, "i"),
      date: new RegExp(date.split("T")[0]),
    });

    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Маршрут для поиска рейса по номеру рейса
router.get("/searchByFlightNumber/:flightNumber", async (req, res) => {
  try {
    const flightNumber = req.params.flightNumber;

    const flight = await Model.findOne({
      flightNumber: flightNumber,
    });

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
