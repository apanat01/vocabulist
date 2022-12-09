window.onload = () => getAllListWords();

function getAllListWords() {
    fetch("/list/getWords", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
            mode: 'no-cors'
    }
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
    WordItem += '<p style="width: 10%">' + term + '</p>';
    WordItem += '<p style="width: 10%">' + ipa + '</p>';
    WordItem += '<p style="width: 8%">' + pos + '</p>';
    WordItem += '<p style="width: 60%">' + definition + '</p>';
    WordItem += '<img src="media/icons/star-filled.svg" width="2.5%"/>';
    WordItem += '<img src="media/icons/translate.svg" width="2.5%"/>';
    WordItem += '</div></div>'

    grid_words.innerHTML = grid_words.innerHTML + WordItem;
}

