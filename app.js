/* eslint-disable import/no-dynamic-require */
const express = require('express');

const app = express();
const path = require('path');
const mongoose = require('mongoose');

const routerUsers = require(path.join(__dirname, 'routes/router-users.js'));
const routerCards = require(path.join(__dirname, 'routes/router-cards.js'));

const routerErr = require(path.join(__dirname, 'middlewares/router-err.js'));
const { PORT = 3000 } = process.env;

const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.user = {
    _id: '5f0327ddbd97500a80f7b19b',
  };
  next();
});

app.use(bodyParser.json());
app.use('/', routerUsers);
app.use('/', routerCards);
app.use(routerErr);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// console.log('Запустили сервер');
