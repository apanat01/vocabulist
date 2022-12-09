const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
    defineWord();
})

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

    const clearBtn = document.getElementById("clearBtn");
    clearBtn.innerHTML = "Clear results";

    if (data.title == "No Definitions Found") {
        resultsInfo.innerHTML = "No results found"; 
    } else {
        resultsInfo.innerHTML = data.length + " results for '" + query + "'"; 
        data.forEach((res) => {
            const meaning = res.meanings[0];
            const phonetic = res.phonetic;
            addWordResult(query, meaning, phonetic);
        })
    }
}

function addWordResult(word, meaning, phonetic) {
    const definition = meaning.definitions[0].definition;
    const partOfSpeech = meaning.partOfSpeech;
    const pronounciation = (phonetic == null) ? "" : phonetic;
    
    var wordCard = '<div class="card">';
    wordCard += '<div>';
    wordCard += '<h4 class="word">' + word + '</h4>';
    wordCard += '<div class="wordInfo">'
    wordCard += '<p class="ipa">' + pronounciation + '</p>';
    wordCard += '<p class="partOfSpeech">' + partOfSpeech + '</p>';
    wordCard += '<p class="definition">' + definition + '</p>';
    wordCard += '</div>';
    wordCard += '</div>';
    wordCard += '<div class="termActionDiv">';
    wordCard += '<a onclick="addWord(this); return false">Add to list</a>';
    wordCard += '<img class="iconBtn" src="media/icons/star.svg"/>';
    wordCard += '<img class="iconBtn" onclick="translateWord(this); return false;" src="media/icons/translate.svg"/>';
    wordCard += '</div></div>';

    const resultsDiv = document.getElementById("searchResults");
    resultsDiv.innerHTML = resultsDiv.innerHTML + wordCard;
}


