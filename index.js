const express = require('express');
const app = express();

// // The service port. In production the front-end code is statically hosted by the service on the same port.
// const port = process.argv.length > 2 ? process.argv[2] : 4000; 

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();

apiRouter.get("/posts", (req, res)=>{
    // [
    //     ["ooga", "img"],
    //     ["bppgq", "/taco.png"]
    // ]
    post = Math.random()
    img = "fake" + Math.floor(Math.random()*2+1) + ".jpg"
    res.send([post, img]);
});

app.use(`/api`, apiRouter);

app.listen(4000)