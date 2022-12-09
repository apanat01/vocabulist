function translateWord(elem) {
    const parentDiv = (elem.parentNode).parentNode;
    const term = parentDiv.querySelector(".word");
    const word = term.innerHTML;

    var url = "/translate/word/";

    fetch(url + word, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            mode: 'no-cors'
        },
    })
    .then(res => res.text())
    .then(data => term.innerHTML = data)
    .catch(err => console.log(err));
}
