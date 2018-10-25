const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./route/api/items')

const app = express();
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));