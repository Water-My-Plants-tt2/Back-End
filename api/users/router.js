const express = require("express");
const router = express.Router();

const Users = require("./model");

// Middleware
const { validateUserId } = require("../middleware/idValidaters");

router.get("/", (_, res) => {
  Users.getAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(e => {
      res.status(500).json(e);
    });
});

router.get("/:id", validateUserId, (req, res) => {
  const { id } = req.params;

  Users.getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(e => {
      res.status(500).json(e);
    });
});

module.exports = router;
