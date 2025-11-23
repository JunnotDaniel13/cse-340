/* ******************************************
 * This server.js file is the primary file of the
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config();
const app = express();
const static = require("./routes/static");
const inventoryRoute = require("./routes/inventoryRoute");
const baseController = require("./controllers/baseController");
const session = require("express-session");
const flash = require("connect-flash");
const messages = require("express-messages");

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // not at views root

/* ***********************
 * Middleware
 * Express Messages Middleware
 *************************/
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-here',
  resave: false,
  saveUninitialized: true,
  name: 'session_id'
}));

// Flash messaging middleware
app.use(flash());

// Express Messages Middleware
app.use(function(req, res, next){
  res.locals.messages = messages(req, res);
  next();
});

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/* ***********************
 * Routes
 *************************/
app.use(static);

app.get("/", baseController.buildHome);

// Inventory routes
app.use("/inv", inventoryRoute);

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});
