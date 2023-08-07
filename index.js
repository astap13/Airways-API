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

const corsOptions = {
    origin: ['http://localhost:4200', 'https://64d15580ecae3730f58690bc--lively-gecko-128258.netlify.app'],
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  app.use(cors(corsOptions));

app.use('/', routes);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})