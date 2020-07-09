const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createCard = (req, res) => {
  const {
    name, link,
  } = req.body;

  Card.create({
    name, link, owner: req.user._id,
  })
    .then((newCard) => res.send({ data: newCard }))
    .catch((err) => res.status(400).send(err.message));
};

module.exports.deleteCard = async (req, res) => {
  try {
    await Card.findByIdAndRemove(req.params.id)
      .then((card) => {
        if (!card) res.status(404).send({ message: `Карточка с id=${req.params.id} не найдена` });
        else res.send({ data: card });
      })
      .catch((err) => res.status(500).send(err));
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.likeCard = async (req, res) => {
  try {
    const found = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .orFail(new Error(`Карточка с id=${req.params.cardId} не найдена`));
    res.send({ data: found });
  } catch (err) {
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
      .orFail(new Error(`Карточка с id=${req.params.cardId} не найдена`));
    res.send({ data: found });
  } catch (err) {
    res.status(404).send(err.message);
  }
};
