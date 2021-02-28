const express = require('express');
const router = express.Router();
const Plants = require('./model');

// Middleware
const gatekeeper = require('../middleware/gatekeeper');
const {
  validatePlantId,
  validateUserId,
} = require('../middleware/idValidaters');
const { plantChecker } = require('../middleware/payloadCheckers');

router.get('/:id', validateUserId, (req, res) => {
  const { id } = req.params;

  Plants.getById(id)
    .then((userPlants) => {
      res.status(200).json(userPlants);
    })
    .catch((e) => {
      res.status(500).json(e);
    });
});

router.post('/:id', validateUserId, plantChecker, gatekeeper, (req, res) => {
  Plants.addPlant(req.body)
    .then(() => {
      return res.status(201).json({ message: 'Plant added successfully' });
    })
    .catch((e) => {
      return res.status(500).json(e.message);
    });
});

router.put('/:id', validatePlantId, plantChecker, gatekeeper, (req, res) => {
  const { id } = req.params;
  Plants.editPlant(req.body, id)
    .then(() => {
      res.status(200).json({ message: 'Plant updated successfully' });
    })
    .catch((e) => {
      return res.status(500).json(e.message);
    });
});

router.delete('/:id', validatePlantId, gatekeeper, (req, res) => {
  const { id } = req.params;

  Plants.deletePlant(id)
    .then(() => {
      res.status(200).json({ message: 'Plant deleted successfully.' });
    })
    .catch((e) => {
      res.status(500).json(e.messagee);
    });
});

module.exports = router;
