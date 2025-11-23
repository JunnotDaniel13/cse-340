const express = require("express");
const router = express.Router();

/* **************************************
 * Intentional Error Route for Testing
 * ************************************** */
router.get("/trigger", (req, res, next) => {
  // Throw an intentional 500 error
  throw new Error("Oh no! Something went wrong! This is an intentional 500 error for testing.");
});

module.exports = router;
