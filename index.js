require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const cors = require('cors'); 



mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
app.use(bodyParser.json());

app.use('/', routes);
app.use(cors());

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})