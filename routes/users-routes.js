const express = require("express");
const router = express.Router();
const { UserModel } = require("../model/model");

module.exports = router;

// Получение информации о пользователе по UID
router.get("/:uid", async (req, res) => {
  try {
    const uid = req.params.uid;

    const user = await UserModel.findOne({ uid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Создание нового пользователя
router.post("/", async (req, res) => {
  try {
    const { uid } = req.body;

    const existingUser = await UserModel.findOne({ uid });

    if (existingUser) {
      res.status(200).json(existingUser);
    }

    const newUser = new UserModel({ uid });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Добавление рейса в корзину пользователя
router.post("/:uid/cart", async (req, res) => {
  try {
    const uid = req.params.uid;
    const { flightId, passengers } = req.body;

    const user = await UserModel.findOne({ uid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart.push({ flightId, passengers });
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Удаление рейса из корзины пользователя
router.post("/:uid/cart/remove", async (req, res) => {
  try {
    const uid = req.params.uid;
    const { flightId } = req.body;

    const user = await UserModel.findOne({ uid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = user.cart.filter((item) => item.flightId !== flightId);
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
