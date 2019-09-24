const express = require("express");
const path = require("path");
const app = express();
const PORT = 1648;
const consolidate=require('consolidate');
const fs = require('fs');
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log(`=> Listening on http://localhost:${PORT}`);
});

app.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/about.html'));
});

//re-set up default views folder to public
app.set('views', path.join(__dirname, '/public'));
app.set('view engine', 'html');
app.engine("html",consolidate.ejs);
/*If you need to render ejs file, you can set up in this way:
* app.get('/Your_Name', function (req, res) {
    res.render('/Your_Folder/Your_ejs_File', {});
})
*
* */
let PATH=path.resolve(__dirname+"/public");
app.get('/jinghan', function (req, res) {
    const info=JSON.parse(fs.readFileSync(PATH+"/jinghan_cao/info.json",'utf8'));
    res.render('jinghan_cao/jinghan_Cao.ejs', {
        "name":info.name,
        "intro":info.intro,
        "img":info.img,
        "courses":info.courses
    });

})

