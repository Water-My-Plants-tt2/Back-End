const db = require('../../data/dbConfig');

module.exports = {
  getAll,
  getById,
  getBy,
  addUser,
  editPassword,
  // editPhoneNumber,
};

function getAll() {
  return db('users')
    .select('user_id', 'username', 'phone_number')
    .orderBy('user_id');
}

function getById(id) {
  return db('users')
    .where({ user_id: id })
    .select('user_id', 'username', 'phone_number')
    .first();
}

function getBy(filter) {
  return db('users')
    .select('user_id', 'username', 'phone_number')
    .where({ username: filter })
    .first();
}

function addUser(user) {
  db('users')
    .insert(user)
    .then((user) => {
      return getById(user.user_id);
    })
    .catch((e) => {
      return e;
    });
}

function editPassword(change, id) {
  return db('users').where({ user_id: id }).update(change);
}
