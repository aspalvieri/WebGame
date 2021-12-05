require("dotenv").config();

const sslRedirect = require('heroku-ssl-redirect').default;
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const path = require("path");

const users = require("./routes/users");

const app = express();

//Heroku HTTPS redirect
app.use(sslRedirect());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const env = process.env.NODE_ENV || "development";
if (env === "test") {
  process.env.DB_CONN = `${process.env.DB_TYPE}//${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_TEST_URL}`;
} else {
  process.env.DB_CONN = `${process.env.DB_TYPE}//${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}`;
}

mongoose.connect(process.env.DB_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(err => console.log(`ERROR: ${err}`));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Our routes
const routes = require("./routes/index");
app.use("/api", routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// set port, listen for requests
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

module.exports = { app };
