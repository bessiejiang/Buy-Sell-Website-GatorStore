const express = require("express");
const path = require("path");
const app = express();
const PORT = 1648;
const consolidate=require('consolidate');
const jinghanRouter=require('../src/public/routes/jinghanRouter');
const beibeiRouter=require('../src/public/routes/beibeiRouter');
const jesseRouter=require('../src/public/routes/jesseRouter');
const angeloRouter=require('../src/public/routes/angeloRouter');
const jinyingRouter=require('../src/public/routes/jinyingRouter');
const melissaRouter=require('../src/public/routes/melissaRouter');
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log(`=> Listening on http://localhost:${PORT}`);
});

app.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/about.html'));
});

app.use('/jinghan',jinghanRouter);
app.use('/beibei',beibeiRouter);
app.use('/jesse',jesseRouter);
app.use('/angelo',angeloRouter);
app.use('/jinying',jinyingRouter);
app.use('/melissa',melissaRouter);

//re-set up default views folder to public
app.set('views', path.join(__dirname, '/public'));
app.set('view engine', 'html');
app.engine("html",consolidate.ejs);


