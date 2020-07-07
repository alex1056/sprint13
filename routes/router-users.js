const routerUsers = require('express').Router();
const { getUsers, getUserById, createUser } = require('../controllers/users');

// routerUsers.use(function timeLog(req, res, next) {
//   console.log('Вызвали рутер router-users');
//   console.log('req.method=', req.method);
//   console.log('req.body=', req.body);
//   next();
// });

routerUsers.get('/users/:id', getUserById);
routerUsers.get('/users', getUsers);
routerUsers.post('/users', createUser);
module.exports = routerUsers;