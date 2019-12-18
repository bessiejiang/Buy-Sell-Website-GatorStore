/*
 * File name: server.js
 * Description: server
 * Author: Team-12
 * Submission: Fall-2019
 * Instructor: Dragutin Petkovic
 */
const bodyParser = require("body-parser");
const consolidate = require("consolidate");
const express = require("express");
const session = require("express-session");
const flash = require("flash");
const morgan = require("morgan");
const path = require("path");
const app = express();
const PORT = 1648;
const auth = require("./auth");
const models = require("../models");
const Category = require("./controller/category");
const User = require("./controller/user");
const homeRouter = require("./router/homeRouter.js");
const itemRouter = require("./router/itemRouter.js");
const itemDetailsRouter = require("./router/itemDetailsRouter.js");
const resultsRouter = require("./router/resultsRouter.js");
const posting = require("./router/posting.js");
const dashboardRouter = require("./router/dashboard");
const signupRouter = require("./router/signup");
const loginRouter = require("./router/login");
const logoutRouter = require("./router/logout");
const aboutRouter = require("./router/about");
const contactRouter = require("./router/contactRouter");
const reviewRouter = require("./router/reviewRouter");
const adminRouter = require("./router/adminRouter");
const postItemROuter = require("./router/postItem");
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
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

// Sets up authentication handling
app.use(session({ secret: "csc648", resave: false, saveUninitialized: true }));
app.use(flash());
app.use(auth.initialize());
app.use(auth.session());

// When logged in, adds `user` to all pages and available in ejs
app.use(User.middleware());

// Adds all url query parameters to all pages and available in ejs
app.use((req, res, next) => {
  res.locals.query = req.query;
  next();
});

app.use("/", homeRouter);
app.use("/getItems", itemRouter);
app.use("/item", itemDetailsRouter);
app.use("/results", resultsRouter);
app.use("/posting", posting);
app.use("/dashboard", dashboardRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/about", aboutRouter);
app.use("/contact", contactRouter);
app.use("/review", reviewRouter);
app.use("/admin", adminRouter);
app.use("/postItem", postItemROuter);

// 404 page for all routes that make it pase everything else
app.use((req, res, next) => {
  res.render("404.ejs");
});

// 500 page for anyhing that errors
app.use((err, req, res, next) => {
  res.render("500.ejs", Object.assign(res.locals, { error: err }));
});
