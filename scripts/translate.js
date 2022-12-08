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

// function translateWord() {
//     // const url = `${baseURL}/translate/${source_lang}/${target_lang}/${word}`;

//     const url = 'https://api-free.deepl.com/v2/translate/text=Hello%2C%20world!&target_lang=DE';

//     fetch(url, {
//         method: "POST",
//         headers: {
//             "Authorization": "DeepL-Auth-Key ee492802-3821-278e-cdd5-58a527b77c20:fx",
//             "Content-Type": "application/x-www-form-urlencoded",
//             "Host": "api-free.deepl.com",
//             mode: 'no-cors'
//         }

//     })
//     .then(res => res.text())
//     .then(data => console.log(JSON.parse(data)))
//     .catch(err => console.log(err));
// }

const translateBtn = document.getElementById("translateBtn");
translateBtn.addEventListener("click", translateWord(), false);