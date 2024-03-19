const express = require('express');
const app = express();
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

mongoDB().catch(console.error);

// // The service port. In production the front-end code is statically hosted by the service on the same port.
// const port = process.argv.length > 2 ? process.argv[2] : 4000; 

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();

apiRouter.get("/posts", (req, res)=>{
    post = Math.random()
    img = "fake" + Math.floor(Math.random()*2+1) + ".jpg"
    res.send([post, img]);
});

app.use(`/api`, apiRouter);

app.listen(4000)