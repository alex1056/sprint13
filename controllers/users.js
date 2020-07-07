const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getUserById = async (req, res) => {
  try {
    const found = await User.findById(req.params.id)
      .orFail(new Error('Пользователь не найден'));
    res.send({ user: found });
  } catch (err) {
    // console.log(err.message);
    res.status(404).send(err.message);
  }
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => res.send({ data: newUser }))
    .catch((err) => res.status(404).send(err.message));
};
