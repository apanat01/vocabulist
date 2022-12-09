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
    data.forEach((list) => {
        const name = list.list_name;
        const desc = list.list_description;
        const words = list.words;
        addList(name, desc, words);
    })
}

function addList(name, desc, words) {
    var listCard = '<div class="cardListWrapper">';
    listCard += '<div class="cardHeader">';
    listCard += '<h3>' + name + '</h3>';
    listCard += '<a href="list.html">View list</a></div>';
    listCard += '<div class="cardList">';
    listCard += '<p>' + desc + '</p>';
    listCard += '</div></div>'

    listsDiv.innerHTML = listsDiv.innerHTML + listCard;
}