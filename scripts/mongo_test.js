import { 
    getAllData, 
    userExists, 
    createNewUser, 
    login,
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

// sample data for testing
await createNewList("ejaa", "Fruits", "names of fruits");
await addWordsToList("ejaa", "Fruits", [
    {term: "apple", ipa: "/'æpl/", pos: "noun", definition: "a round fruit with shiny red or green skin that is fairly hard and white inside"}, 
    {term: "banana", ipa: "/bə'na:nə/", pos: "noun", definition: "a long curved fruit with a thick yellow skin and that is soft inside"},
    {term: "coconut", ipa: "/'kəʊkənʌt/", pos: "noun", definition: "the large nut of a tropical tree called a coconut palm"}
]);

await createNewList("ejaa", "Vegetables", "names of veggies");
await addWordsToList("ejaa", "Vegetables", [
    {term: "spinach", ipa: "/'spInItʃ/", pos: "noun", definition: "a vegetable with large, dark-green leaves that are cooked or eaten in salads"}, 
    {term: "broccoli", ipa: "/'bra:kəli/", pos: "noun", definition: "a vegetable with a thick green stem and several dark green or purple flower heads"},
    {term: "carrot", ipa: "/'kærət/", pos: "noun", definition: "a long pointed orange root vegetable"},
    {term: "celery", ipa: "/'seləri/", pos: "noun", definition: "a vegetable with long light-green stems that are often eaten raw"}
]);

await addWordsToFavorites("ejaa", "Vegetables", [{term: "carrot", ipa: "/'kærət/", pos: "noun", definition: "a long pointed orange root vegetable"}]);
await createNewFolder("ejaa", "Produce");
await addListsToFolder("ejaa", "Produce", ["Fruits", "Vegetables"]);

// unit testing
console.log(await getAllData());

await createNewUser("user0", "password");

// test -1: successful authentication
if (await login("user0", "password")) {
    console.log("[PASS] user0 successfully authenticated");
} else {
    console.log("[FAIL] test -1");
}

// test 0: unsuccessful authentication
if (!(await login("user0", "passwOrd"))) {
    console.log("[PASS] user0 password is incorrect");
} else {
    console.log("[FAIL] test 0");
}

// test 1: user exists
if (await userExists("ejaa")) {
    console.log("[PASS] ejaa exists");
} else {
    console.log("[FAIL] test 1");
}

// test 2: user does not exist
if (!(await userExists("user4"))) {
    console.log("[PASS] user4 does not exist");
} else {
    console.log("[FAIL] test 2");
}

// test3: create new user
await createNewUser("user3", "password");
if (await userExists("user3")) {
    console.log("[PASS] user3 exists");
} else {
    console.log("[FAIL] test 3");
}

// test 4: list exists
if (await listExists("ejaa", "Fruits")) {
    console.log("[PASS] ejaa list with name Fruits exists");
} else {
    console.log("[FAIL] test 4");
}

// test 5: list does not exist
if (!(await listExists("ejaa", "Objects"))) {
    console.log("[PASS] ejaa list with name Objects does not exist");
} else {
    console.log("[FAIL] test 5");
}

// test 6: create new list
await createNewList("ejaa", "Weather", "words for describing weather");
if (await listExists("ejaa", "Weather")) {
    console.log("[PASS] list with name Weather successfully exists for ejaa");
} else {
    console.log("[FAIL] test 6");
}

// test 7: get words from list
let resultString = "";
let words = await getWordsFromList("ejaa", "Fruits");
for (let i = 0; i < words.length; i++) {
    resultString += words[i].term + ", ";
}
if (resultString.includes("apple, banana, coconut,")) {
    console.log("[PASS] " + resultString);
} else {
    console.log("[FAIL] test 7");
}

// test 8: add words to list
await addWordsToList("ejaa", "Weather", [
    {term: "sunny", ipa: "/'sʌni/", pos: "adjective", definition: "with a lot of bright light from the sun"},
    {term: "cloudy", ipa: "/'klaʊdi/", pos: "adjective", definition: "(of the sky or the weather) covered with clouds; with a lot of clouds"},
    {term: "windy", ipa: "/'wIndi/", pos: "adjective", definition: "(of weather, etc.) with a lot of wind"},
    {term: "rainy", ipa: "/'reIni/", pos: "adjective", definition: "having or bringing a lot of rain"}
]);
resultString = "";
words = await getWordsFromList("ejaa", "Weather");
for (let i = 0; i < words.length; i++) {
    resultString += words[i].term + ", ";
}
if (resultString.includes("sunny, cloudy, windy, rainy,")) {
    console.log("[PASS] " + resultString);
} else {
    console.log("[FAIL] test 8");
}

// test 9: add words to favorites
await addWordsToFavorites("ejaa", "Weather", [
    {term: "sunny", ipa: "/'sʌni/", pos: "adjective", definition: "with a lot of bright light from the sun"},
    {term: "windy", ipa: "/'wIndi/", pos: "adjective", definition: "(of weather, etc.) with a lot of wind"}
]);
resultString = "";
words = await getWordsFromFavorites("ejaa", "Weather");
for (let i = 0; i < words.length; i++) {
    resultString += words[i].term + ", ";
}
if (resultString.includes("sunny, windy,")) {
    console.log("[PASS] " + resultString);
} else {
    console.log("[FAIL] test 9 " + resultString);
}

// test 9.5: create new folder
await createNewFolder("ejaa", "Folder1");
await createNewFolder("ejaa", "Folder2");
resultString = "";
let folders = await getFolderNames("ejaa");
for (let i = 0; i < folders.length; i++) {
    resultString += folders[i] + ", ";
}
if (resultString.includes("Folder1, Folder2,")) {
    console.log("[PASS] " + resultString);
} else {
    console.log("[FAIL] test 9.5" + resultString);
}

// test 10: add lists to folder
await addListsToFolder("ejaa", "Folder1", ["Weather", "Vegetables"]);
resultString = "";
let lists = await getListsFromFolder("ejaa", "Folder1");
for (let i = 0; i < lists.length; i++) {
    resultString += lists[i] + ", ";
}
if (resultString.includes("Weather, Vegetables,")) {
    console.log("[PASS] " + resultString);
} else {
    console.log("[FAIL] test 10" + resultString);
}

// test 11: remove words from list
await removeWordsFromList("ejaa", "Weather", [{term: "rainy", ipa: "/'reIni/", pos: "adjective", definition: "having or bringing a lot of rain"}]);
resultString = "";
words = await getWordsFromList("ejaa", "Weather");
for (let i = 0; i < words.length; i++) {
    resultString += words[i].term + ", ";
}
if (!resultString.includes("rainy")) {
    console.log("[PASS] " + resultString);
} else {
    console.log("[FAIL] test 11");
}

// test 12: remove words from favorites
await removeWordsFromFavorites("ejaa", "Weather", [{term: "windy", ipa: "/'wIndi/", pos: "adjective", definition: "(of weather, etc.) with a lot of wind"}]);
resultString = "";
words = await getWordsFromFavorites("ejaa", "Weather");
for (let i = 0; i < words.length; i++) {
    resultString += words[i].term + ", ";
}
if (!resultString.includes("windy")) {
    console.log("[PASS] " + resultString);
} else {
    console.log("[FAIL] test 12");
}

// test 13: remove lists from folder
await removeListsFromFolder("ejaa", "Folder1", ["Vegetables"]);
resultString = "";
lists = await getListsFromFolder("ejaa", "Folder1");
for (let i = 0; i < lists.length; i++) {
    resultString += lists[i] + ", ";
}
if (!resultString.includes("Vegetables,")) {
    console.log("[PASS] " + resultString);
} else {
    console.log("[FAIL] test 13");
}

// test 14: remove folder
await removeFolder("ejaa", "Folder2");
resultString = "";
folders = await getFolderNames("ejaa");
for (let i = 0; i < folders.length; i++) {
    resultString += folders[i] + ", ";
}
if (!resultString.includes("Folder2")) {
    console.log("[PASS] " + resultString);
} else {
    console.log("[FAIL] test 14" + resultString);
}

// test 15: create new list
await createNewList("ejaa", "Greetings", "test list to be removed");
if (await listExists("ejaa", "Greetings")) {
    await removeList("ejaa", "Greetings");
    if (!(await listExists("ejaa", "Greetings"))) {
        console.log("[PASS] ejaa list with name Greetings successfully removed");
    } else {
        console.log("[FAIL] test 15 internal")
    }
} else {
    console.log("[FAIL] test 15");
}

await closeConnection();
