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

/*
module.exports.deleteCard = (req, res) => {
  // console.log('req.params.id=', req.params.id);
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send(err));
};
*/

module.exports.deleteCard = async (req, res) => {
  try {
    await Card.findByIdAndRemove(req.params.id)
      .then((card) => {
        if (!card) res.status(404).send({ message: 'Пользователь не найден' });
        else res.send({ data: card });
      })
      .catch((err) => res.status(500).send(err));
  } catch (err) {
    // console.log(err.message);
    res.status(500).send(err.message);
  }
};

module.exports.likeCard = async (req, res) => {
  try {
    const found = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    )
      .orFail(new Error('Пользователь не найден'));
    res.send({ card: found });
  } catch (err) {
    // console.log(err.message);
    res.status(404).send(err.message);
  }
};

module.exports.dislikeCard = async (req, res) => {
  try {
    const found = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .orFail(new Error('Пользователь не найден'));
    res.send({ card: found });
  } catch (err) {
    // console.log(err.message);
    res.status(404).send(err.message);
  }
};
