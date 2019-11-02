const consolidate = require("consolidate");
const express = require("express");
const path = require("path");
const app = express();
const PORT = 1648;
const models = require("../models");
const Category = require("./controller/category");
const homeRouter = require("./router/homeRouter.js");
const itemRouter = require("./router/itemRouter.js");
const itemDetailsRouter = require("./router/itemDetailsRouter.js");

app.use("/static", express.static(path.join(__dirname, "static")));

//re-set up default views folder to public
app.set("views", path.join(__dirname, "views"));
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

// Adds `categories` to all pages and available in ejs
app.use(Category.middleware());

app.use("/", homeRouter);
app.use("/getItems", itemRouter);
app.use("/item", itemDetailsRouter);
