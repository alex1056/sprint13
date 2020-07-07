const path = require('path');

const { readFile } = require(path.join(__dirname, 'read-file.js'));

function filterUserById(usersObj, id) {
  const userById = usersObj.filter((user) => user._id === id)[0];
  return userById || { message: 'Нет пользователя с таким id' };
}

function fetchUserById(url, id) {
  return readFile(url).then((data) => filterUserById(data, id));
}

function fetchUsers(url) {
  return readFile(url);
}

function fetchCards(url) {
  return readFile(url);
}

module.exports = {
  fetchUserById,
  fetchUsers,
  fetchCards,
};
