var addedWordList = [];

const termsDiv = document.getElementById("addedTerms");
const termsHeader = document.getElementById("addedTermsHeader");

// Adds word to "Terms" list
function addWord(elem) {
    const parentDiv = (elem.parentNode).parentNode;
    const term = parentDiv.querySelector(".word").innerHTML;
    const definition = parentDiv.querySelector(".definition").innerHTML;
    const ipa = parentDiv.querySelector(".ipa").innerHTML;
    const pos = parentDiv.querySelector(".partOfSpeech").innerHTML;

    const wordObj = {
        "term": term,
        "ipa": ipa,
        "pos": pos,
        "definition": definition
    }

    addedWordList.push(wordObj);
    termsHeader.innerHTML = "<h4>Terms</h4>";
    termsDiv.innerHTML = termsDiv.innerHTML + createAddedWord(term, definition);
}
   
// Creates html for word item
function createAddedWord(word, definition) {
    var addedWord = '<div class="card">';
    addedWord += '<div>';
    addedWord += '<h4 class="word added">' + word + '</h4>';
    addedWord += '<p class="definition">' + definition + '</p>';
    addedWord += '</div>';
    addedWord += '<div class="termActionDiv">';
    addedWord += '<img class="iconBtn" src="media/icons/translate.svg"/>';
    addedWord += '</div></div>';

    return addedWord;
}


// Clears results
const resultsDiv = document.getElementById("searchResults");
const resultsInfo = document.getElementById("resultsInfo");
const clearBtn = document.getElementById("clearBtn");
const termQuery = document.getElementById("termQuery");

clearBtn.addEventListener("click", () => {
    clearResults();
})

function clearResults() {
    resultsDiv.innerHTML = "";
    resultsInfo.innerHTML = "";
    clearBtn.innerHTML = "";
    termQuery.value = "";
}

function createNewList() {
    const list_name = document.getElementById("list_name").value;
    const list_desc = document.getElementById("list_desc").value;

    const params = {
        "list_name": list_name,
        "list_desc": list_desc
    }

    fetch("/list/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            mode: 'no-cors'
        },
        body: JSON.stringify(params)
    })
    .then(res => res.text())
    .then(data => console.log(JSON.parse(data)))
    .catch(err => console.log(err));
}

function addWordsToList() {
    const list_name = document.getElementById("list_name").value;

    const params = {
        "words": addedWordList,
        "list_name": list_name
    };

    fetch("/list/addWords", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
            mode: 'no-cors'
        },
        body: JSON.stringify(params)
    })
    .then(res => res.text())
    .then(data => console.log(JSON.parse(data)))
    .catch(err => console.log(err));
}

const createListBtn = document.getElementById("createListBtn");
createListBtn.addEventListener("click", () => {
    createNewList();
    addWordsToList();
})