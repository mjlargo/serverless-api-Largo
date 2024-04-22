const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/author');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
    // your mongoDB Cloud URL
const dbCloudUrl =
    'mongodb+srv: mjlargo015:<redblue>@cluster0.eih4rsy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    // your mongoDB Cloud URL
const dbLocalUrl = 'mongodb://localhost:27017/express-mongo-api';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose
    .connect(dbCloudUrl || dbLocalUrl)
    .then(() => console.log('Connected to MongoDB')) 
    .catch((error) => console.error('Failed to connect to MongoDB', error));


app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
