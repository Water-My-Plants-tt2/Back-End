const Users = require('../users/model');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const validUser = await Users.getById(id);

  if (!validUser) {
    res.status(400).json({ message: 'Invalid User Id' });
  } else {
    next();
  }
};
