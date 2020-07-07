const routerCards = require('express').Router();

const { getCards, createCard, deleteCard } = require('../controllers/cards');

// routerCards.use(function timeLog(req, res, next) {
//   console.log('Вызвали рутер router-cards');
//   next();
// });
routerCards.get('/cards', getCards);
routerCards.post('/cards', createCard);
routerCards.delete('/cards/:id', deleteCard);
module.exports = routerCards;
