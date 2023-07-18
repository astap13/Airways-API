import { MongoClient, ServerApiVersion } from "mongodb";
import { uri } from '../secret.js';

export const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});

// Подключение к базе данных при запуске сервера
client.connect((err) => {
    if (err) {
        console.error("Ошибка подключения к базе данных:", err);
        process.exit(1); // Прерываем запуск сервера при ошибке подключения
    } else {
        console.log("Подключено к базе данных");
        // Здесь можно добавить любую другую логику, связанную с подключением к базе данных
    }
});

async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);