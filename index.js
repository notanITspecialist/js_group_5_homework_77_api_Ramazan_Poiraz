const express = require('express');
const cors = require('cors');
const aib = require('./app/aib');
const fileDb = require("./fileDb");

const port = 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/message', aib);

fileDb.init();

app.listen(port ,() => {
   console.log('Server started on ' + port + ' port')
});