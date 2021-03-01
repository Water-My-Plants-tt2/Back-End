const express = require("express");
const router = express.Router();
const Plants = require("./model");

// Middleware
const gatekeeper = require("../middleware/gatekeeper");
const {
  validatePlantId,
  validateUserId,
} = require("../middleware/idValidaters");
const { plantChecker } = require("../middleware/payloadCheckers");

router.get("/:id", validateUserId, gatekeeper, (req, res, next) => {
  const { id } = req.params;

  Plants.getById(id)
    .then(userPlants => {
      res.status(200).json(userPlants);
    })
    .catch(e => {
      next(e);
    });
});

router.post(
  "/:id",
  validateUserId,
  plantChecker,
  gatekeeper,
  (req, res, next) => {
    Plants.addPlant(req.body)
      .then(() => {
        return res.status(201).json({ message: "Plant added successfully" });
      })
      .catch(e => {
        next(e);
      });
  }
);

router.put(
  "/:id",
  validatePlantId,
  plantChecker,
  gatekeeper,
  (req, res, next) => {
    const { id } = req.params;
    Plants.editPlant(req.body, id)
      .then(() => {
        res.status(200).json({ message: "Plant updated successfully" });
      })
      .catch(e => {
        next(e);
      });
  }
);

router.delete("/:id", validatePlantId, gatekeeper, (req, res, next) => {
  const { id } = req.params;

  Plants.deletePlant(id)
    .then(() => {
      res.status(200).json({ message: "Plant deleted successfully." });
    })
    .catch(e => {
      next(e);
    });
});

router.use((error, req, res, next) => {
  res.status(500).json({
    info: "Error occurred inside authRouter",
    message: error.message,
    stack: error.stack,
  });
});

module.exports = router;
