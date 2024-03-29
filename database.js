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
    const query = {  };
    const options = {
        limit: 10,
    };

    const cursor = postCollection.find(query, options);
    const posts = await cursor.toArray();
    return posts;
}

async function addPost(text, image) {
    const newPost = {
        text: text,
        image: image,
    };
    postCollection.insertOne(newPost);
}

//login
function getUser(email) {
    return userCollection.findOne({ email: email });
}

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    await userCollection.insertOne(user);

    return user;
  }

module.exports = { getPosts, addPost, getUser, createUser };