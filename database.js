const { MongoClient } = require('mongodb');

const config = require('./dbConfig.json');
const url = 'mongodb+srv://' + config.userName + ':' + config.password + '@' + config.hostname;
const client = new MongoClient(url);

//test
const db = client.db('rental');
const collection = db.collection('house');

(async function testConnection() {
await client.connect();
await db.command({ ping: 1 });
})().catch((ex) => {
console.log(`Unable to connect to database with ${url} because ${ex.message}`);
process.exit(1);
});

async function getPosts() {
    const query = {  };
    const options = {
        sort: { score: -1 },
        limit: 10,
    };

    const cursor = collection.find(query, options);
    const posts = await cursor.toArray();
    return posts;
}

module.exports = { getPosts };