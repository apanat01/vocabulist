const baseURL = "https://od-api.oxforddictionaries.com/api/v2"
const appId = '6428d6a9';
const appKey = 'e76667ef9a16a48f2021a29896009dfa';
const headers = {app_id: appId, app_key: appKey}

const source_lang = "en";
const target_lang = "es";
const word = "hello"

function translateWord() {
    const url = `${baseURL}/translate/${source_lang}/${target_lang}/${word}`;

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
    .then(data => console.log(JSON.parse(data)))
    .catch(err => console.log(err));
}

const translateBtn = document.getElementById("translateBtn");
translateBtn.addEventListener("click", translateWord(), false);