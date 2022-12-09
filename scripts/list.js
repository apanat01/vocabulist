window.onload = () => getAllListWords();

function getAllListWords() {
    const query_string = window.location.search;
    const url_params = new URLSearchParams(query_string);
    const list_name = url_params.get("list_name");
    const listHeader = document.getElementById("listHeader");

    listHeader.innerHTML = list_name;

    const params = {
        "list_name": list_name
    }
    fetch("/list/getWords", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
            mode: 'no-cors'
    },
    body: JSON.stringify(params)
    })
    .then(res => res.text())
    .then(data => populateWords(JSON.parse(data)))
    .catch(err => console.log(err));
}

function populateWords(data) {
    console.log(data);
    data.forEach((list) => {
        const term = list.term;
        const ipa = list.ipa;
        const pos = list.pos;
        const definition = list.definition;

       getWords(term, ipa, pos, definition);
    })
}

const grid_words = document.getElementById("grid_words");

function getWords(term, ipa, pos, definition) {
    var wordItem = '<div class="gridItem">';
    wordItem += '<div class="wordHeader">';
    wordItem += '<h4 class="word">' + term + '</h4>';
    wordItem += '<p class="wordInfo">' + ipa + '</p>';
    wordItem += '<p class="wordInfo">' + pos + '</p>';
    wordItem += '<p>' + definition + '</p></div>';
    wordItem += '<a class="iconBtn" onclick="translateWord(this); return false;">'
    wordItem += '<img src="../../media/icons/translate.svg"/>Translate</a>';
    wordItem += '</div>'

    grid_words.innerHTML = grid_words.innerHTML + wordItem;
}