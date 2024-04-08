const express = require('express');
const app = express();
const DB = require('./database.js');
const bcrypt = require('bcrypt');

const { peerProxy } = require('./peerProxy.js');

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));
app.set("trust proxy", true);

// Router for service endpoints
const apiRouter = express.Router();

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

// app.use((_req, res) => {
//   res.sendFile('index.html', { root: 'public' });
// });

apiRouter.post("/post", async (req, res)=>{
    data = req.body;
    await DB.addPost(data);
});

apiRouter.get("/post", async (req, res)=>{
    data = await DB.getPosts();
    if(data) {
        res.send(data);
    }
});

//login
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.username)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await DB.createUser(req.body.username, req.body.password);

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
    const user = await DB.getUser(req.body.username);
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
    const user = await DB.getToken(authToken);
    if (user) {
      res.send({ username: user.username });
      return;
    }
    res.status(401).send({ msg: 'Unauthorized' });
  });

  app.get("/user/expire", async (req, res) => {
    res.clearCookie('token', { path: '/' }); 
    res.send('Cookie deleted successfully');
  })

//final
app.use(`/api`, apiRouter);

const httpService = app.listen(4000);
peerProxy(httpService);