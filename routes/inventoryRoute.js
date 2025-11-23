const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/");
const validate = require("../utilities/validation");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build vehicle detail view
router.get("/detail/:inv_id", invController.buildVehicleDetail);

// Route to build management view
router.get("/", invController.buildManagement);

// Route to build add classification view
router.get("/add-classification", invController.buildAddClassification);

// Route to process add classification
router.post(
  "/add-classification",
  validate.classificationRules(),
  validate.checkClassificationData,
  invController.addClassification
);

// Route to build add inventory view
router.get("/add-inventory", invController.buildAddInventory);

// Route to process add inventory
router.post(
  "/add-inventory",
  validate.inventoryRules(),
  validate.checkInventoryData,
  invController.addInventory
);

module.exports = router;
