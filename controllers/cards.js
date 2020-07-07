const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createCard = (req, res) => {
  const {
    name, link, likes, createdAt,
  } = req.body;

  Card.create({
    name, link, owner: req.user._id, likes, createdAt,
  })
    .then((newCard) => res.send({ data: newCard }))
    .catch((err) => res.status(404).send(err.message));
};

module.exports.deleteCard = (req, res) => {
  console.log('req.params.id=', req.params.id);
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send(err));
};
