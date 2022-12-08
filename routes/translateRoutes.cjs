const express = require("express");
const router = express.Router();
var path = require('path');

const baseURL = "https://od-api.oxforddictionaries.com/api/v2"
const appId = '6428d6a9';
const appKey = 'e76667ef9a16a48f2021a29896009dfa';
const headers = {app_id: appId, app_key: appKey};
const source_lang = "en";
const target_lang = "es";
const word = "hello"

// Gets translation of a given word
router.get("/translate/word", async (req, res) => {
    const word = req.query.word;
    const url = `${baseURL}/translations/${source_lang}/${target_lang}/${word}`;
    
    fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "app_id": appId,
            "app_key": appKey
        },
        // redirect: "follow"
    })
    .then(res => res.text())
    .then(data => { 
        const pdata = JSON.parse(data);
        const translations = pdata.results[0].lexicalEntries[0].entries[0].senses[0].subsenses[0].translations;
        const result = translations[0].text;
        console.log(result);
    })
    .catch(err => console.log(err));
})

module.exports = router;