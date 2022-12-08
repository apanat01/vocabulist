const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

function defineWord() {
    const query = document.getElementById("termQuery").value;

    fetch(url + query, {
        method: "GET",
        headers: {
            "Content-Type": "application/json", 
            mode: 'no-cors'
    }
    })
    .then(res => res.text())
    .then(data => populate(query, JSON.parse(data)))
    .catch(err => console.log(err));
}

function populate(query, data) {
    const resultsDiv = document.getElementById("searchResults");
    resultsDiv.innerHTML = "";
    const resultsInfo = document.getElementById("resultsInfo");
    resultsInfo.innerHTML = data.length + " results for '" + query + "'"; 
    data.forEach((res) => {
        const meaning = res.meanings[0];
        const phonetic = res.phonetic;
        addWordResult(query, meaning, phonetic);
    })
}

function addWordResult(word, meaning, phonetic) {
    const definition = meaning.definitions[0].definition;
    const partOfSpeech = meaning.partOfSpeech;
    const pronounciation = (phonetic == null) ? "" : phonetic;
    var wordCard = '<div>';
    wordCard += '<p>' + word + '</p>';
    wordCard += '<p>' + partOfSpeech + '</p>';
    wordCard += '<p>' + pronounciation + '</p>';
    wordCard += '<p>' + definition + '</p>';
    wordCard += '</div>';

    const resultsDiv = document.getElementById("searchResults");
    resultsDiv.innerHTML = resultsDiv.innerHTML + wordCard;
}