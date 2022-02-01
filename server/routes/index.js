// Our Express app module
const express = require('express');
const app = express();

// Importing the pageRoutes
const userRoutes = require("./users");
const characterRoutes = require("./characters");

// Registering our routes
app.use("/users", userRoutes);
app.use("/characters", characterRoutes);

// Exporting the changes
module.exports = app;
