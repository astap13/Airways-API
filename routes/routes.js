const express = require('express');
const Model = require('../model/model');
const router = express.Router();

module.exports = router;

// Post Method
router.post('/post', async (req, res) => {
  const { from, to, date } = req.body;

  // Генерация случайных значений для рейса
  const seats = Math.floor(Math.random() * 200) + 1;
  const freeSeats = Math.floor(Math.random() * seats) + 1;
  const price = Math.floor(Math.random() * 1000) + 1;
  const flightNumber = generateFlightNumber();
  const time = generateRandomTime();

  const data = new Model({
    from: from,
    to: to,
    date: date,
    seats: seats,
    freeSeats: freeSeats,
    price: price,
    flightNumber: flightNumber,
    time: time,
  });

  try {
    const savedData = await data.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Generate a random flight number
function generateFlightNumber() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  let flightNumber = '';

  for (let i = 0; i < 3; i++) {
    flightNumber += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  for (let i = 0; i < 3; i++) {
    flightNumber += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  return flightNumber;
}

// Generate a random time
function generateRandomTime() {
  const startTime = new Date();
  const endTime = new Date();
  endTime.setHours(startTime.getHours() + Math.floor(Math.random() * 12) + 1);

  return {
    from: startTime,
    to: endTime,
  };
}

// Get all Method
router.get('/getAll', async (req, res) => {
  try {
    const allData = await Model.find();
    res.status(200).json(allData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get by ID Method
router.get('/getOne/:id', async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update by ID Method
router.patch('/update/:id', async (req, res) => {
  try {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!data) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
  try {
    const data = await Model.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.status(200).json({ message: 'Data deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
