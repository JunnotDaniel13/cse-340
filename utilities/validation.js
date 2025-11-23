const { body, validationResult } = require("express-validator");
const utilities = require(".");

const validate = {};

/* **********************************
 *  Classification Validation Rules
 * ********************************* */
validate.classificationRules = () => {
  return [
    // classification_name is required and must be a string with no spaces or special characters
    body("classification_name")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a classification name.")
      .matches(/^[a-zA-Z0-9]+$/)
      .withMessage("Classification name cannot contain spaces or special characters.")
  ];
};

/* ******************************
 * Check data and return errors to the add-classification view
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
  const { classification_name } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("inventory/add-classification", {
      errors,
      title: "Add Classification",
      nav,
      classification_name,
    });
    return;
  }
  next();
};

/* **********************************
 *  Inventory Validation Rules
 * ********************************* */
validate.inventoryRules = () => {
  return [
    // Make is required and must be a string
    body("inv_make")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please provide a make with at least 3 characters."),

    // Model is required and must be a string
    body("inv_model")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please provide a model with at least 3 characters."),

    // Year is required and must be a 4-digit number
    body("inv_year")
      .trim()
      .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
      .withMessage(`Please provide a valid year between 1900 and ${new Date().getFullYear() + 1}.`),

    // Description is required
    body("inv_description")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a description."),

    // Image path is required
    body("inv_image")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide an image path."),

    // Thumbnail path is required
    body("inv_thumbnail")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a thumbnail path."),

    // Price is required and must be a decimal
    body("inv_price")
      .trim()
      .isDecimal()
      .withMessage("Please provide a valid price."),

    // Miles is required and must be an integer
    body("inv_miles")
      .trim()
      .isInt({ min: 0 })
      .withMessage("Please provide valid miles."),

    // Color is required
    body("inv_color")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a color."),

    // Classification ID is required and must be an integer
    body("classification_id")
      .trim()
      .isInt()
      .withMessage("Please select a classification."),
  ];
};

/* ******************************
 * Check data and return errors to the add-inventory view
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
  const { 
    inv_make, 
    inv_model, 
    inv_year, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_miles, 
    inv_color, 
    classification_id 
  } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    let classificationList = await utilities.buildClassificationList(classification_id);
    res.render("inventory/add-inventory", {
      errors,
      title: "Add Inventory",
      nav,
      classificationList,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
    });
    return;
  }
  next();
};

module.exports = validate;
