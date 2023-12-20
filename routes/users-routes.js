const express = require("express");
const router = express.Router();
const { UserModel } = require("../model/model");

module.exports = router;

// // Получение информации о пользователе по UID
// async getUserInfo() {
//   const user = JSON.parse(localStorage.getItem('user'));

//   if (!user || !user.uid) {
//     // Обработка случая, когда информация о пользователе отсутствует или некорректна
//     console.error('User information is missing or invalid');
//     return; // или выполните другие действия по обработке ошибки
//   }

//   const uid = user.uid;
//   const url = `https://airways-api-ckd3.onrender.com/user/${uid}`;

//   try {
//     const response = await this.http.get(url).toPromise();
//     // Обработка данных ответа, если это необходимо
//     console.log(response);
//   } catch (error) {
//     // Обработка ошибок
//     console.error('Error fetching user data:', error);
//     // Выполните дополнительные действия по обработке ошибок
//   }
// }

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
