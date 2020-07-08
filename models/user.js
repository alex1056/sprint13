const mongoose = require('mongoose');
const validatorModule = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, 'Поле должно содержать значение'],
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, 'Поле должно содержать значение'],
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => validatorModule.isURL(v),
      message: (props) => `${props.value} некорректный формат ссылки!`,
    },
    required: [true, 'Ссылка на аватар пользователя обязательна'],
  },
});

module.exports = mongoose.model('user', userSchema);
