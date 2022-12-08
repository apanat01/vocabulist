const express = require("express");
const router = express.Router();
var path = require('path');
var __dirname = path.resolve();

// Home
router.get("/", (req, res) => {
    console.log(req.session);       // check if there is an existing session
    if (req.session.user == undefined) {
        res.sendFile(path.join(__dirname, './views/login.html'))
    }
    res.sendFile(path.join(__dirname, './views/index.html'));
});

router.get("/signUp", (req, res) => {
    res.sendFile(path.join(__dirname, './views/signup.html'));
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, './views/login.html'));
});

router.get("/loginFail", (req, res) => {
    res.sendFile(path.join(__dirname, './views/loginFail.html'));
})

// My Lists
router.get("/myLists", (req, res) => {
    res.sendFile(path.join(__dirname, './views/myLists.html'));
});

// Settings
router.get("/settings", (req, res) => {
    res.sendFile(path.join(__dirname, './views/settings.html'));
});

// Create List
router.get("/createList", (req, res) => {
    res.sendFile(path.join(__dirname, './views/createList.html'));
});

module.exports = router;