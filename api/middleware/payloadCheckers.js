const Users = require('../users/model');

module.exports = {
  registerChecker,
  loginChecker,
  editChecker,
};

function registerChecker(req, res, next) {
  const { username, password, phone_number } = req.body;

  if (!username || !password || !phone_number) {
    res.status(400).json({
      message: 'username, password, and phone number required',
    });
  } else {
    next();
  }
}

function loginChecker(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      message: 'Username and password required',
    });
  } else {
    next();
  }
}

function editChecker(req, res, next) {
  if (!req.body.password || !req.body.phone_number) {
    res.status(400).json({ message: 'Password and phone number required' });
  } else {
    next();
  }
}
