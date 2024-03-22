const express = require('express');
const app = express();
const DB = require('./database.js');

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();

function generateFalse() {
    post = Math.random()
    img = "fake" + Math.floor(Math.random()*2+1) + ".jpg"
    return [post, img];
}

apiRouter.get("/posts", (req, res)=>{
    inf = generateFalse();
    post = inf[0];
    img = inf[1];
    res.send([post, img]);
});

let data;

apiRouter.post("/post", (req, res)=>{
    data = req.body;
});

apiRouter.get("/post", (req, res)=>{
    console.log("data = "+data);
    if(data) {
        res.send(data);
    } else {
        inf = generateFalse();
        post = inf[0];
        img = inf[1];
        res.send([post, img]);
    }
});

app.use(`/api`, apiRouter);

app.listen(4000)