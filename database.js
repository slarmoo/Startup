const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const uuid = require('uuid');


const config = require('./dbConfig.json');
const url = 'mongodb+srv://' + config.userName + ':' + config.password + '@' + config.hostname;
const client = new MongoClient(url);

const postCollection = client.db('startup').collection('posts');
const userCollection = client.db('startup').collection('users');

(async function testConnection() {
await client.connect();
await client.db('startup').command({ ping: 1 });
})().catch((ex) => {
console.log(`Unable to connect to database with ${url} because ${ex.message}`);
process.exit(1);
});

//posts
async function getPosts() {
    let d = new Date();
    let day = d.getDate();
    if(day.length < 2) {
        day = "0"+day.toString();
    } 
    let month = d.getMonth();
    let date = month.toString()+day.toString();
    date = Number(date);
    compare = date-101;

    const query = { date: { $gte: compare } };
    const options = {
        limit: 12,
        sort: { date: 1 }
    };

    const cursor = postCollection.find(query, options);
    const posts = await cursor.toArray();
    return posts;
}

async function addPost(data) {
    postCollection.insertOne(data);
}

//login
function getUser(username) {
    return userCollection.findOne({ username: username });
}

function getToken(authToken) {
    return userCollection.findOne({ token: authToken });
}

async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
    };
    await userCollection.insertOne(user);

    return user;
  }

module.exports = { getPosts, addPost, getUser, createUser, getToken };