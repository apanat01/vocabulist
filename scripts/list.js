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
    var WordItem = '<div class="gridItem">';
    WordItem = '<div class="wordHeader">';
    WordItem += '<p style="width: 12%">' + term + '</p>';
    WordItem += '<p style="width: 12%">' + ipa + '</p>';
    WordItem += '<p style="width: 12%">' + pos + '</p>';
    WordItem += '<p style="width: 60%">' + definition + '</p>';
    WordItem += '<img src="media/icons/translate.svg" width="2.5%"/>';
    WordItem += '</div></div>'

    grid_words.innerHTML = grid_words.innerHTML + WordItem;
}

