const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Bodyparser middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/database_connection').mongoURI;

// Connect to mongo
mongoose
    .connect(db)
    .then(() => console.log('Connected to Mongo DB'))
    .catch(error => (console.log(error)));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));