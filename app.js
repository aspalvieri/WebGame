require("dotenv").config();

const sslRedirect = require('heroku-ssl-redirect').default;
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");

const users = require("./routes/users");

const app = express();

//Heroku HTTPS redirect
app.use(sslRedirect());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(`${process.env.DB_TYPE}//${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(err => console.log("Connected to MongoDB."))
.catch(err => console.log(`ERROR: ${err}`));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Routes
app.use("/api/users", users);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// set port, listen for requests
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
