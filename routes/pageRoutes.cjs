const express = require("express");
const router = express.Router();
var path = require('path');
var __dirname = path.resolve();

// Home
router.get("/", (req, res) => {
    console.log("current user: " + req.session.user);
    if (req.session.user == undefined) {    // if there is not an existing session, send login page
        res.redirect("/login");
    }
    res.sendFile(path.join(__dirname, './views/index.html'));
});

// Sign up
router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, './views/signup.html'));
});

// Log in
router.get("/login", (req, res) => {
    if (req.session.user != undefined) {    // if there is an existing session, send home page
        console.log("redirecting from login");
        res.redirect('/');
    }
    res.sendFile(path.join(__dirname, './views/login.html'));
});

// Log in auth failed
router.get("/loginFail", (req, res) => {
    if (req.session.user != undefined) {    // if there is an existing session, send home page
        console.log("redirecting from loginFail");
        res.redirect('/');
    }
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