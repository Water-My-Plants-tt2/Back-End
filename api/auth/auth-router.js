const router = require('express').Router();
const bcrypt = require('bcryptjs');

const jrrTokenMaker = require('../../utils/jrrTokenMaker');
const Users = require('../users/model');

const { registerChecker } = require('../middleware/payloadCheckers');
const usernameDupeChecker = require('../middleware/usernameDupeChecker');

router.post('/register', registerChecker, usernameDupeChecker, (req, res) => {
  let newUser = req.body;
  const hashedPass = bcrypt.hashSync(newUser.password, 8);
  newUser.password = hashedPass;

  Users.addUser(newUser)
    .then((addedUser) => {
      return res.status(201).json(addedUser);
    })
    .catch((e) => {
      return res.status(500).json(e.message);
    });
});

module.exports = router;
