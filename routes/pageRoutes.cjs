const express = require("express");
const router = express.Router();
var path = require('path');
var __dirname = path.resolve();

// Home
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './views/index.html'));
});

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