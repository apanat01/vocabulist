const express = require("express");
const router = express.Router();
var path = require('path');

const baseURL = "https://od-api.oxforddictionaries.com/api/v2"
const appId = '6428d6a9';
const appKey = 'e76667ef9a16a48f2021a29896009dfa';
const source_lang = "en";
const target_lang = "es";
const word = "hello"

// Gets translation of a given word
router.get("/translate/word/:word", async (req, res) => {
    const word = req.params.word;
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
        if ((JSON.parse(data).error) != undefined) {
            res.send(word);
        } else {
            const pdata = JSON.parse(data);
            const lexicalEntries = pdata.results[0].lexicalEntries[0];
            const senses = lexicalEntries.entries[0].senses[0];

            var translation = "";
            if (senses.subsenses != null) {
                translation = senses.subsenses[0].translations[0].text;
            } else {
                translation = senses.translations[0].text;
            }
            res.send(translation);
        }
    })
})

module.exports = router;