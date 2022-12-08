const express = require("express");
const router = express.Router();
var path = require('path');

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

const baseURL = "https://od-api.oxforddictionaries.com/api/v2"
const appId = '6428d6a9';
const appKey = 'e76667ef9a16a48f2021a29896009dfa';
const headers = {app_id: appId, app_key: appKey};
const source_lang = "en";
const target_lang = "es";
const word = "hello"

// test 
router.get("/translate/word", async (req, res) => {

    const word = req.query.word;
    const url = `${baseURL}/translations/${source_lang}/${target_lang}/${word}`;
    console.log(req);

    console.log(word);
    // const url = `https://od-api.oxforddictionaries.com/api/v2/translations/en/es/${word}`;
    fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "app_id": appId,
            "app_key": appKey
        },
        redirect: "follow"
    })
    .then(res => res.text())
    .then(data => { 
        // console.log(data);
        // console.log(data["results"])
        // const lexicalEntries = data.results.lexicalEntries;
        // console.log(lexicalEntries);

        console.log(JSON.parse(data))
    })
    .catch(err => console.log(err));
})

module.exports = router;