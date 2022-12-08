var addedWordList = [];

const termsDiv = document.getElementById("addedTerms");
const termsHeader = document.getElementById("addedTermsHeader");

// Adds word to "Terms" list
function addWord(elem) {
    const btn = elem;
    const parentDiv = (elem.parentNode).parentNode;
    const word = parentDiv.querySelector(".word").innerHTML;
    const definition = parentDiv.querySelector(".definition").innerHTML;
    const ipa = parentDiv.querySelector(".ipa").innerHTML;
    const partOfSpeech = parentDiv.querySelector(".partOfSpeech").innerHTML;

    const wordObj = {
        "word": word,
        "definition": definition,
        "ipa": ipa,
        "partOfSpeech": partOfSpeech
    }

    addedWordList.push(wordObj);
    termsHeader.innerHTML = "<h4>Terms</h4>";
    termsDiv.innerHTML = termsDiv.innerHTML + createAddedWord(word, definition);
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

const createListBtn = document.getElementById("createListBtn");
createListBtn.addEventListener("click", () => {
    console.log(addedWordList);
})