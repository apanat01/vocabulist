const pages = require("./routes/pageRoutes.cjs");
const lists = require("./routes/listRoutes.cjs");
const express = require("express");
const bodyParser = require("body-parser");
var path = require('path');
var __dirname = path.resolve();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", pages);
app.use("/", lists);

app.get("/scripts/navBar.js", (req, res) => {
    res.sendFile(path.join(__dirname, './scripts/navBar.js'));
});

app.get("/scripts/theme.js", (req, res) => {
    res.sendFile(path.join(__dirname, './scripts/theme.js'));
});

app.get("/scripts/settings.js", (req, res) => {
    res.sendFile(path.join(__dirname, './scripts/settings.js'));
});

app.get("/scripts/definition.js", (req, res) => {
    res.sendFile(path.join(__dirname, './scripts/definition.js'));
});

app.get("/scripts/myLists.js", (req, res) => {
    res.sendFile(path.join(__dirname, './scripts/myLists.js'));
});

app.get("/scripts/translate.js", (req, res) => {
    res.sendFile(path.join(__dirname, './scripts/translate.js'));
});



//TEST
app.get("/test", (req, res) => {
    res.sendFile(path.join(__dirname, './views/test.html'));
});


app.listen(port, () => {
    console.log("Server is running on port", port);
});