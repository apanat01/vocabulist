window.onload = () => getAllLists();

function getAllLists() {
    // get user id
    fetch("/list/getAll", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
            mode: 'no-cors'
        }
    })
    .then(res => res.text())
    .then(data => populateLists(JSON.parse(data)))
    .catch(err => console.log(err));
}

const listsDiv = document.getElementById("listsDiv");

function populateLists(data) {
    populateRecentList(
        data[1].list_name, 
        data[1].list_desc, 
        data[1].words);
    
    data.forEach((list) => {
        const name = list.list_name;
        const desc = list.list_desc;
        const words = list.words;
        addList(name, words);
    })
}

function addList(name, words) {
    const numWords = words.length;

    var listItem = '<div class="cardList">';
    listItem += '<div class="cardListItem">';
    listItem += '<p>' + name + '</p>';
    listItem += '<p>' + numWords + ' words</p>';
    listItem += '</div></div>'

    listsDiv.innerHTML = listsDiv.innerHTML + listItem;
}

const recentListDiv = document.getElementById("recentListDiv");
const recentListName = document.getElementById("recentListName");
const recentListBtn = document.getElementById("recentListBtn");

function populateRecentList(name, desc, words) {
    recentListName.innerHTML = recentListName.innerHTML + " " + name;
    recentListBtn.href = "/list/routelist/?list_name=" + name;

    var listItem = "";
    words.forEach((word) => {
        var wordItem = '<div class="cardList">';
        wordItem += '<div class="cardListItem">';
        wordItem += '<p>' + word.term + '</p>';
        wordItem += '</div></div>';
        listItem += wordItem;
    })

    listItem += '</div></div>'

    recentListDiv.innerHTML = recentListDiv.innerHTML + listItem;
}