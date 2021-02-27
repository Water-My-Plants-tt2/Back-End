module.exports = {
  registerChecker,
  passwordEditChecker,
  phoneNumberEditChecker,
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

function passwordEditChecker(req, res, next) {
  if (!req.body.password) {
    res.status(400).json({ message: 'Password required' });
  } else {
    next();
  }
}

function phoneNumberEditChecker(req, res, next) {
  if (!req.body.phone_number) {
    res
      .status(400)
      .json({ message: 'Please provide a valid 9 digit phone number' });
  } else {
    next();
  }
}
