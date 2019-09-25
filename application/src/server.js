const express = require("express");
const path = require("path");
const app = express();
const PORT = 1648;
const consolidate=require('consolidate');
const jinghanRouter=require('../src/public/routes/jinghanRouter');
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log(`=> Listening on http://localhost:${PORT}`);
});

app.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/about.html'));
});
app.use('/jinghan',jinghanRouter);
//re-set up default views folder to public
app.set('views', path.join(__dirname, '/public'));
app.set('view engine', 'html');
app.engine("html",consolidate.ejs);


