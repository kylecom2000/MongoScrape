const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const logger = require("morgan");
var path = require('path');

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// var exphbs = require("express-handlebars");
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// app.get("/", function(req, res) {
//   res.render("index");
// })

// Mongo y Mongoose
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes
const routes = require("./controllers/apiRoutes");
app.use(routes);

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});