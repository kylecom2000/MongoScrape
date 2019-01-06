const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const logger = require("morgan");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Mongo y Mongoose
const MONGOLAB_URI = process.env.MONGOLAB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGOLAB_URI, { useNewUrlParser: true });

// Routes
const routes = require("./controllers/apiRoutes");
app.use(routes);

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});