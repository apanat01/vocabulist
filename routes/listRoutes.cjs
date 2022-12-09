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
        res.redirect('/loginFail');
    }
});

// Log in auth failed
router.post("/loginFail", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const {login} = await import ("../scripts/mongo.js");
    if (await login(username, password)) {
        console.log("username: " + username);
        req.session.user = username;
        res.redirect('/');
    } else {
        res.render('/loginFail');
    }
})

// Create new list
router.post("/list/create", async (req, res) => {
    const username = req.session.user;
    const list_name = req.body.list_name;
    const list_desc = req.body.list_desc;
    const {createNewList} = await import ("../scripts/mongo.js");
    createNewList(username, list_name, list_desc);
})

// Get all lists of a user
router.post("/list/getAll", async (req, res) => {
    const username = req.session.user;
    const {getListsFromUser} = await import ("../scripts/mongo.js");
    res.json(await getListsFromUser(username));
})

// Get words of one list
router.post("/list/getOne", async (req, res) => {
    const username = req.session.user;
    const list_name = "Things";
    const {getWordsFromList} = await import ("../scripts/mongo.js");
    res.json(await getWordsFromList(username, list_name));
})

// Add words to list
router.post("/list/addWords", async (req, res) => {
    const username = req.session.user;
    const list_name = req.body.list_name;
    const words = req.body.words;
    console.log("add words request", username, list_name, words);
    const {addWordsToList} = await import ("../scripts/mongo.js");
    res.json(await addWordsToList(username, list_name, words));
})

// Get words from list
router.post("/list/getWords", async (req, res) => {
    const username = "ejaa";
    const list_name = "Fruits";
    // console.log(req.body)
    const {getWordsFromList} = await import ("../scripts/mongo.js");
    // console.log(await getListsFromUser(user_id));
    // console.log(list_name);
    res.json(await getWordsFromList(username, list_name));
})

module.exports = router;