module.exports = {
  registerChecker,
  loginChecker,
  userEditChecker,
  plantChecker,
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
      message: 'username and password required',
    });
  } else {
    next();
  }
}

function userEditChecker(req, res, next) {
  if (!req.body.password || !req.body.phone_number) {
    res.status(400).json({ message: 'password and phone_number required' });
  } else {
    next();
  }
}

function plantChecker(req, res, next) {
  const { nickname, species, h2oFrequency } = req.body;
  if (!nickname || !species || !h2oFrequency) {
    res.status(400).json({
      message: 'nickname, species, and h2oFrequency required',
    });
  } else {
    next();
  }
}
