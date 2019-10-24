const consolidate = require("consolidate");
const express = require("express");
const path = require("path");
const app = express();
const PORT = 1648;
const models = require("../models");
const homeRouter = require("./router/homeRouter.js");
const fetchData = require("./controller/fetchData");
const fetchBook=require("./controller/fetchBook")
const fetchElec=require("./controller/fetchElec")
const fetchEquipment=require("./controller/fetchEquipment")
const fetchTutor=require("./controller/fetchTutor")
const fetchFurniture=require("./controller/fetchFuniture")

app.use(express.static(path.join(__dirname)));
// console.log(__dirname);

//re-set up default views folder to public
app.set("views", path.join(__dirname, "/static"));
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

app.use('/', homeRouter);
app.use('/getAll', fetchData);
app.use('/getBook', fetchBook);
app.use('/getElec', fetchElec);
app.use('/getEquipment', fetchEquipment);
app.use('/getTutor', fetchTutor);
app.use('/getFurniture', fetchFurniture);