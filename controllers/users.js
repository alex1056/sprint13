const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .orFail(new Error(`Пользователь с id=${req.params.id} не найдена`));
    res.send({ data: user });
  } catch (err) {
    res.status(404).send(err.message);
  }
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => res.send({ data: newUser }))
    .catch((err) => res.status(400).send(err.message));
};

module.exports.updateUserProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    const opts = { runValidators: true, new: true };
    const user = await User.findByIdAndUpdate(req.user._id, { name, about }, opts)
      .orFail(new Error(`Пользователь с id=${req.user._id} не найден`));
    res.send({ data: user });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports.updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const opts = { runValidators: true, new: true };
    const user = await User.findByIdAndUpdate(req.user._id, { avatar }, opts)
      .orFail(new Error(`Пользователь с id=${req.user._id} не найден`));
    res.send({ data: user });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
