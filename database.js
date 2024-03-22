mongoDB();
async function mongoDB() {
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

    //more test
    const house = {
        name: 'Beachfront views',
        summary: 'From your bedroom to the beach, no shoes required',
        property_type: 'Condo',
        beds: 1,
      };
    await collection.insertOne(house);

    const query = { property_type: 'Condo', beds: { $lt: 2 } };
    const options = {
        sort: { score: -1 },
        limit: 10,
    };

    const cursor = collection.find(query, options);
    const rentals = await cursor.toArray();
    rentals.forEach((i) => console.log(i));
}
