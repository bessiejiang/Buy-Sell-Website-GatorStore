const consolidate = require("consolidate");
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 1648;
const models = require("../models");

app.use(express.static(path.join(__dirname, "public")));
app.use('/static', express.static(path.join(__dirname, "static")));

let PATH = path.resolve();

//re-set up default views folder to public
app.set("views", path.join(__dirname, "/public"));
app.set("view engine", "html");
app.engine("html", consolidate.ejs);

models.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
    return models.sequelize.sync();
  })
  .then(() => {
    console.log("Database synchronized");

    app.listen(PORT, () => {
      console.log(`=> Listening on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.log("Error with database:", err);
  });
