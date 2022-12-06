import { 
    getAllData, 
    userExists, 
    createNewUser, 
    listExists, 
    createNewList, 
    addWordsToList, 
    getWordsFromList,
    addWordsToFavorites, 
    getWordsFromFavorites, 
    createNewFolder, 
    getFolderNames,
    addListsToFolder,
    getListsFromFolder,
    removeWordsFromList,
    removeWordsFromFavorites,
    removeListsFromFolder,
    removeFolder,
    removeList,
    closeConnection
} from './mongo.js'

console.log(await getAllData());

// test 1
if (await userExists("user1")) {
    console.log("[PASS] user1 found!!!!");
} else {
    console.log("[FAIL] test 1");
}

// test 2
if (!(await userExists("user4"))) {
    console.log("[PASS] user4 does not exist");
} else {
    console.log("[FAIL] test 2");
}

// test3
await createNewUser("user3");
if (await userExists("user3")) {
    console.log("[PASS] user3 successfully exists!");
} else {
    console.log("[FAIL] test 3");
}

// test 4
if (await listExists("user2", "Things")) {
    console.log("[PASS] user2 list with name Things EXISTS");
} else {
    console.log("[FAIL] test 4");
}

// test 5
if (!(await listExists("user2", "Objects"))) {
    console.log("[PASS] user2 list with name Objects DOES NOT EXIST");
} else {
    console.log("[FAIL] test 5");
}

// test 6
await createNewList("user2", "Weather", "words for describing weather");
if (await listExists("user2", "Weather")) {
    console.log("[PASS] list with name Weather successfully exists for user2");
} else {
    console.log("[FAIL] test 6");
}

// test 7
let resultString = "";
let words = await getWordsFromList("user2", "Things");
for (let i = 0; i < words.length; i++) {
    resultString += words[i] + ", ";
}
if (resultString.includes("bongo,")) {
    console.log("[PASS] " + resultString);
} else {
    console.log("[FAIL] test 7");
}

// test 8
await addWordsToList("user2", "Weather", ["sunny", "cloudy", "windy", "rainy"]);
resultString = "";
words = await getWordsFromList("user2", "Weather");
for (let i = 0; i < words.length; i++) {
    resultString += words[i] + ", ";
}
if (resultString.includes("sunny, cloudy, windy, rainy,")) {
    console.log("[PASS] " + resultString);
} else {
    console.log("[FAIL] test 8");
}

// test 9
await addWordsToFavorites("user2", "Weather", ["sunny", "windy"]);
resultString = "";
words = await getWordsFromFavorites("user2", "Weather");
for (let i = 0; i < words.length; i++) {
    resultString += words[i] + ", ";
}
if (resultString.includes("sunny, windy,")) {
    console.log("[PASS] " + resultString);
} else {
    console.log("[FAIL] test 9");
}

// test 9.5
await createNewFolder("user2", "Folder2");
resultString = "";
let folders = await getFolderNames("user2");
for (let i = 0; i < folders.length; i++) {
    resultString += folders[i] + ", ";
}
if (resultString.includes("Folder1, Folder2,")) {
    console.log("[PASS] " + resultString);
} else {
    console.log("[FAIL] test 9.5" + resultString);
}

// test 10
await addListsToFolder("user2", "Folder1", ["Weather"]);
resultString = "";
let lists = await getListsFromFolder("user2", "Folder1");
for (let i = 0; i < lists.length; i++) {
    resultString += lists[i] + ", ";
}
if (resultString.includes("Things, Weather")) {
    console.log("[PASS] " + resultString);
} else {
    console.log("[FAIL] test 10" + resultString);
}

// test 11
await removeWordsFromList("user2", "Weather", ["rainy"]);
resultString = "";
words = await getWordsFromList("user2", "Weather");
for (let i = 0; i < words.length; i++) {
    resultString += words[i] + ", ";
}
if (!resultString.includes("rainy")) {
    console.log("[PASS] " + resultString);
} else {
    console.log("[FAIL] test 11");
}

// test 12
await removeWordsFromFavorites("user2", "Weather", ["windy"]);
resultString = "";
words = await getWordsFromFavorites("user2", "Weather");
for (let i = 0; i < words.length; i++) {
    resultString += words[i] + ", ";
}
if (!resultString.includes("windy")) {
    console.log("[PASS] " + resultString);
} else {
    console.log("[FAIL] test 12");
}

// test 13
await removeListsFromFolder("user2", "Folder1", ["Weather"]);
resultString = "";
words = await getListsFromFolder("user2", "Folder1");
for (let i = 0; i < words.length; i++) {
    resultString += words[i] + ", ";
}
if (resultString.includes("Things, Things,")) {
    console.log("[PASS] " + resultString);
} else {
    console.log("[FAIL] test 13");
}

// test 14
await removeFolder("user2", "Folder2");
resultString = "";
folders = await getFolderNames("user2");
for (let i = 0; i < folders.length; i++) {
    resultString += folders[i] + ", ";
}
if (!resultString.includes("Folder2")) {
    console.log("[PASS] " + resultString);
} else {
    console.log("[FAIL] test 14" + resultString);
}

// test 15
await createNewList("user1", "Greetings", "test list to be removed");
await removeList("user1", "Greetings");
if (!(await listExists("user1", "Greetings"))) {
    console.log("[PASS] user1 list with name Greetings successfully removed");
} else {
    console.log("[FAIL] test 15");
}

await closeConnection();

