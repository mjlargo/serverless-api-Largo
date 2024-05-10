const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/author');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
    // your mongoDB Cloud URL
const dbCloudUrl = 'mongodb+srv://mjlargo:8iWkU86sZrpspceS@cluster1.9eeyuzd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';
    // your mongoDB Cloud URL
const dbLocalUrl = 'mongodb://localhost:27017/serverless-api';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
    .connect(dbCloudUrl || dbLocalUrl)
    .then(() => console.log('Connected to MongoDB')) 
    .catch((error) => console.error('Failed to connect to MongoDB', error));

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });

// app.use('/', router);

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
