const express = require("express");
const router = express.Router();
var path = require('path');
const bodyParser = require("body-parser");

// Sign up
router.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    req.session.user = username;
    const {createNewUser} = await import ("../scripts/mongo.js");
    await createNewUser(username, password);
    res.redirect('/');
});

// Log in 
router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const {login} = await import ("../scripts/mongo.js");
    if (await login(username, password)) {
        console.log("username: " + username);
        req.session.user = username;
        res.redirect('/');
    } else {
        res.redirect('/signup');
    }
});

// Create new list
router.post("/create", async (req, res) => {
    const username = req.session.user;
    const list_name = req.body.title;
    const list_desc = req.body.list_desc;
    console.log("creating new list", username, list_name, list_desc);
    const {createNewList} = await import ("../scripts/mongo.js");
    createNewList(username, list_name, list_desc);
})

// Get all lists of a user
router.post("/getAll", async (req, res) => {
    const username = "user2";
    const {getListsFromUser} = await import ("../scripts/mongo.js");
    // console.log(await getListsFromUser(user_id));
    res.json(await getListsFromUser(username));
})

// Get words of one list
router.post("/getOne", async (req, res) => {
    const username = "user2";
    const list_name = "Things";
    const {getWordsFromList} = await import ("../scripts/mongo.js");
    res.json(await getWordsFromList(username, list_name))
})

// Add words to list
router.post("/addWords", async (req, res) => {
    
})

module.exports = router;