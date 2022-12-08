const express = require("express");
const router = express.Router();
var path = require('path');

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
    const username = "user1";
    const list_name = req.body.list_name;
    const list_description = req.body.list_description;
    const {createNewList} = await import ("../scripts/mongo.js");
    createNewList(username, list_name, list_description);
    // res.send("it worked");
})

// Get all lists of a user
router.post("/list/getAll", async (req, res) => {
    const username = "user2";
    const {getListsFromUser} = await import ("../scripts/mongo.js");
    // console.log(await getListsFromUser(user_id));
    res.json(await getListsFromUser(username));
})

// Get words of one list
router.post("/list/getOne", async (req, res) => {
    const username = "user2";
    const list_name = "Things";
    const {getWordsFromList} = await import ("../scripts/mongo.js");
    res.json(await getWordsFromList(username, list_name))
})

// Add word to list
router.post("/list/addWord", async (req, res) => {
    
})

module.exports = router;