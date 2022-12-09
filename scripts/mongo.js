const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const uri = process.env.MONGODB_URI || "mongodb+srv://dbuser:u8QXNaLsgPie4749@cluster0.z9zkrwk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const database = client.db('vocabulist');
const user_lists = database.collection('user_lists');

/**
 * gets all data from all documents
 * @returns array of all data
 */
async function getAllData() {
    try {
        return await user_lists.find().toArray();
    } catch (e) {
        console.error(e);
    } 
}

/** 
 * checks if user exists
 * @returns true if exists, false if not
 */
async function userExists(username) {
    try {
        let result = await user_lists.find({ "username": username }).toArray();

        if (result.length) {
            console.log("returning true");
            return true;
        }
        console.log("returning false");
        return false;
    } catch (e) {
        console.error(e);
    }
}

/**
 * creates new user if provided username is not already in use
 * @param {String} username 
 */
async function createNewUser(username, password) {
    try {
        console.log("creating new user " + username);
        if (!(await userExists(username))) {
            await bcrypt.hash(password, 10, async function(err, hash) {
                let newData = { "username": username, "password": hash, "lists": [] };
                await user_lists.insertOne(newData);
                console.log("new user " + username + " inserted");
            });
            
        } else {
            console.log("user " + username + " already exists, aborting insert");
        }        
    } catch (e) {
        console.error(e);
    }
}

/**
 * checks if any users in db match provided credentials
 * @returns true if so, false if not
 */
async function login(username, password) {
    try {
        if (await userExists(username)) {
            const document = await user_lists.find({ "username": username }).toArray();
            const hash = document[0].password;
            const result = await bcrypt.compare(password, hash);
            return result;
        }
        return false;
    } catch (e) {
        console.error(e);
    }
}

/**
 * checks if list exists based on name for specified user
 * @param {String} username 
 * @param {String} listName 
 * @returns true if list exists for user, false otherwise
 */
async function listExists(username, listName) {
    try {
        let result = await user_lists.find({ "username": username, "lists.list_name": listName }).toArray();

        if (result.length) {
            return true;
        }
        return false;
    } catch (e) {
        console.error(e);
    }
}

/**
 * creates a new list for specified user
 * ASSUMES: user exists
 * adds metadata and an empty array for words
 * @param {String} username 
 * @param {String} listName 
 * @param {String} listDescription 
 */
async function createNewList(username, listName, listDescription) {
    try {
        if (!(await listExists(username, listName))) {
            await user_lists.updateOne({ "username": username },  
                { $addToSet: 
                    { "lists": { 
                        "list_name": listName,
                        "list_description": listDescription,
                        "date_created": new Date(),
                        "words": [] } } });
            console.log("new list " + listName + " inserted for user " + username);
        } else {
            console.log("list with name " + listName + " already exists for user " + username + ", aborting insert");
        }
    } catch (e) {
        console.error(e);
    }
}

/**
 * adds words to existing list for specified user
 * ASSUMES: user exists, list exists
 * does not add duplicates
 * @param {String} username
 * @param {String} listName
 * @param {Array} words an array of objects with format [{term: "apple", ipa: "/ˈæpl/", pos: "noun", definition: "the round fruit of a tree of the rose family"}, ...]
 */
async function addWordsToList(username, listName, words) {
    try {
        console.log("in mongo adding words to list");
        await user_lists.updateOne({ "username": username, "lists.list_name": listName },  { $addToSet: { "lists.$.words": { $each: words } } });
    } catch (e) {
        console.error(e);
    }
}

/**
 * gets array of words from specified list for specified user
 * ASSUMES: user exists, list exists
 * @param {String} username 
 * @param {String} listName 
 * @returns array of word objects with format [{term: "apple", ipa: "/ˈæpl/", pos: "noun", definition: "the round fruit of a tree of the rose family"}, ...]
 */
async function getWordsFromList(username, listName) {
    try {
        console.log("getting words from list " + listName);
        let result = await user_lists.find({ "username": username, "lists.list_name": listName }).toArray();
        let words = await result[0].lists.find(list => list.list_name == listName).words;
        return words;
    } catch (e) {
        console.error(e);
    }
}

/**
 * gets array of lists from specified user
 * ASSUMES: user exists
 * @param {String} username
 * @returns array of lists
 */
async function getListsFromUser(username) {
    try {
        console.log("getting lists from user " + username);
        let lists = await user_lists.distinct("lists",{"username": username});
        return lists;
    } catch (e) {
        console.error(e);
    }
}

/**
 * removes words from specified list for specified user
 * ASSUMES: user exists, list exists, all words to be removed exist
 * @param {String} username 
 * @param {Array} words - array of words objects to remove with format [{term: "apple", ipa: "/ˈæpl/", pos: "noun", definition: "the round fruit of a tree of the rose family"}, ...]
 */
async function removeWordsFromList(username, listName, words) {
    try {
        await user_lists.updateOne({ "username": username, "lists.list_name": listName },  { $pull: { "lists.$.words": { $in: words } } });
    } catch (e) {
        console.error(e);
    }
}

/**
 * removes list for specified user
 * ASSUMES, user exists, list existss
 * @param {String} username 
 * @param {String} listName 
 */
async function removeList(username, listName) {
    try {
        await user_lists.updateOne({ "username": username }, { $pull: { "lists": { "list_name": listName } }});
    } catch (e) {
        console.error(e);
    }
}

/**
 * closes mongo client connection
 */
async function closeConnection() {
    await client.close();
}

module.exports = {
    getAllData, 
    userExists, 
    createNewUser, 
    login,
    listExists, 
    createNewList, 
    addWordsToList, 
    getWordsFromList,
    getListsFromUser,
    removeWordsFromList,
    removeList,
    closeConnection
}