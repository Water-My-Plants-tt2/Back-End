const router = require('express').Router();
const bcrypt = require('bcryptjs');

const jrrTokenMaker = require('../../utils/jrrTokenMaker');
const Users = require('../users/model');

const {
  registerChecker,
  loginChecker,
} = require('../middleware/payloadCheckers');
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

router.post('/login', loginChecker, async (req, res) => {
  const { username, password } = req.body;
  const tryUser = await Users.getByUsername(username);

  if (tryUser && bcrypt.compareSync(password, tryUser.password)) {
    const token = jrrTokenMaker(tryUser);
    res.status(200).json({ message: 'Login Successful', token });
  } else {
    res.status(401).json({ message: 'Invalid Credentials' });
  }
});

module.exports = router;
