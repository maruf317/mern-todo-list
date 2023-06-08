const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

// Bodyparser middleware
app.use(express.json());

// DB config
const db = config.get('mongoUri');

// Connect to mongo
mongoose
    .connect(db)
    .then(() => console.log('Connected to Mongo DB'))
    .catch(error => (console.log(error)));

// Use Routes
// Tell app to route any request that is of the form
// api/items/* to be handled by the code in items (second arg) file
// ie anyting that goes to api/items should refer to the "items" variable
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));