const utilities = require("./index");

/* **************************************
 * 404 Error Handler - Not Found
 * Catches requests to undefined routes
 * ************************************** */
function notFound(req, res, next) {
  const err = new Error(`Sorry, we appear to have lost that page.`);
  err.status = 404;
  next(err);
}

/* **************************************
 * Error Handler Middleware
 * Catches all errors and delivers error view
 * ************************************** */
async function errorHandler(err, req, res, next) {
  const statusCode = err.status || 500;
  const message = err.message || 'Oh no! There was a crash. Maybe try a different route?';
  
  let nav = await utilities.getNav();
  
  res.status(statusCode);
  res.render('errors/error', {
    title: statusCode == 404 ? 'Sorry, page not found' : 'Server Error',
    message,
    nav,
    errors: null,
  });
}

module.exports = { notFound, errorHandler };
