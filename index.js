const express = require('express');
const app = express();
const DB = require('./database.js');
const bcrypt = require('bcrypt');

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
    console.log(data);
    DB.addPost();
});

apiRouter.get("/post", (req, res)=>{
    data = DB.getPosts();
    console.log("data = "+data);
    if(data) {
        res.send(data);
    } else {
        inf = generateFalse();
        post = inf[0];
        img = inf[1];
        res.send([[post, img]]);
    }
});

//login
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.email)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await DB.createUser(req.body.email, req.body.password);

        setAuthCookie(res, user.token);

        res.send({
            id: user._id,
        });
    }
  });

  function setAuthCookie(res, authToken) {
    res.cookie('token', authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }

  app.post('/auth/login', async (req, res) => {
    const user = await getUser(req.body.email);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user.token);
        res.send({ id: user._id });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
  });

  app.get('/user/me', async (req, res) => {
    authToken = req.cookies['token'];
    const user = await collection.findOne({ token: authToken });
    if (user) {
      res.send({ email: user.email });
      return;
    }
    res.status(401).send({ msg: 'Unauthorized' });
  });

//final
app.use(`/api`, apiRouter);

app.listen(4000)