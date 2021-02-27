const router = require('express').Router();
const bcrypt = require('bcryptjs');

const jrrToken = require('../../utils/jrrToken');
const Users = require('../users/model');

const { registerChecker } = require('../middleware/payloadCheckers');
const usernameDupeChecker = require('../middleware/usernameDupeChecker');

router.post(
  '/register',
  registerChecker,
  usernameDupeChecker,
  async (req, res) => {
    const newUser = req.body;
    const hashedPass = bcrypt.hashSync(newUser.password, 8);
    newUser.password = hashedPass;

    try {
      const addedUser = await Users.addUser(newUser);
      const userInfo = await Users.getBy(newUser.username);
      res.status(201).json(userInfo);
    } catch (e) {
      res.status(500).json(e);
    }
  },
);

module.exports = router;
