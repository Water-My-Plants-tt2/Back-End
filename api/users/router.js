const express = require('express');
const router = express.Router();

const Users = require('./model');
const validateUserId = require('../middleware/validateUserId');

// user can update phone # and password
router.get('/', (_, res) => {
  Users.getAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((e) => {
      res.status(500).json(e);
    });
});

router.get('/:id', validateUserId, (req, res) => {
  const { id } = req.params;

  Users.getById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((e) => {
      res.status(500).json(e);
    });
});

// Under construction

// router.put('/:id', validateUserId, (req, res) => {
//   const { id } = req.params;
//   const changes = req.body;

//   Users.editpassword(changes, id)
//     .then(() => {
//       res.status(200).json({ message: 'User updated' });
//     })
//     .catch((e) => {
//       res.status(500).json({ error: e, message: e.message });
//     });
// });

module.exports = router;
