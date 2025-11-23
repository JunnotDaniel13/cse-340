const invModel = require("../models/inventory-model");
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications();
  let list = "<ul>";
  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    list += "<li>";
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>";
    list += "</li>";
  });
  list += "</ul>";
  return list;
};

/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid;
  if (data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach((vehicle) => {
      grid += "<li>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        'details"><img src="' +
        vehicle.inv_thumbnail +
        '" alt="Image of ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' on CSE Motors" /></a>';
      grid += '<div class="namePrice">';
      grid += "<hr />";
      grid += "<h2>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details">' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        "</a>";
      grid += "</h2>";
      grid +=
        "<span>$" +
        new Intl.NumberFormat("en-US").format(vehicle.inv_price) +
        "</span>";
      grid += "</div>";
      grid += "</li>";
    });
    grid += "</ul>";
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};

/* ****************************************
 * Build the classification list HTML select
 * **************************************** */
Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications();
  let classificationList =
    '<select name="classification_id" id="classificationList" required>';
  classificationList += "<option value=''>Choose a Classification</option>";
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"';
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected ";
    }
    classificationList += ">" + row.classification_name + "</option>";
  });
  classificationList += "</select>";
  return classificationList;
};

/* ****************************************
 * Build the vehicle detail HTML
 * **************************************** */
Util.buildVehicleDetail = function (vehicle) {
  if (!vehicle) {
    return '<p class="notice">Sorry, vehicle not found.</p>';
  }

  // Format price with currency symbol and commas
  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(vehicle.inv_price);

  // Format mileage with commas
  const miles = new Intl.NumberFormat('en-US').format(vehicle.inv_miles);

  let detail = '<div class="vehicle-detail">';
  
  // Image section
  detail += '<div class="vehicle-detail-image">';
  detail += '<img src="' + vehicle.inv_image + '" alt="' + vehicle.inv_make + ' ' + vehicle.inv_model + '">';
  detail += '</div>';
  
  // Info section
  detail += '<div class="vehicle-detail-info">';
  
  // Price (prominent)
  detail += '<p class="vehicle-price">' + price + '</p>';
  
  // Key details
  detail += '<div class="vehicle-specs">';
  detail += '<p><strong>Year:</strong> ' + vehicle.inv_year + '</p>';
  detail += '<p><strong>Make:</strong> ' + vehicle.inv_make + '</p>';
  detail += '<p><strong>Model:</strong> ' + vehicle.inv_model + '</p>';
  detail += '<p><strong>Mileage:</strong> ' + miles + ' miles</p>';
  detail += '<p><strong>Color:</strong> ' + vehicle.inv_color + '</p>';
  detail += '</div>';
  
  // Description
  detail += '<div class="vehicle-description">';
  detail += '<h3>Description</h3>';
  detail += '<p>' + vehicle.inv_description + '</p>';
  detail += '</div>';
  
  detail += '</div>'; // close info
  detail += '</div>'; // close detail
  
  return detail;
};

module.exports = Util;
