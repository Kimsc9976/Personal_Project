const fs = require('fs');
const topic = require('./lib/topic');
const admin = require('./lib/admin');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const j = require('./lib/jwt');

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static('./src'));

const dataBuff = fs.readFileSync(process.cwd() + '/src/inform/user_data.json');
const dataJSON = dataBuff.toString();
let data = JSON.parse(dataJSON);

app.get('/', async (req, res) =>
{
  // 토큰이 없으면
  let verifyed_token = await j.verify(data.accessToken);

  if(verifyed_token === -2 || verifyed_token === -3)
  {
    console.log("sign in page");
    res.sendFile(process.cwd() + '/src/data/sign_in.html');
  }
  // 토큰이 있으면
  else if(verifyed_token)
  {
    console.log("log in completed");
    res.sendFile(process.cwd() + '/src/data/blog.html');
  }
})

app.post('/sign_in', (req, res) =>
{
  topic.Signin_process(req, res);
})

app.get('/sign_up', (req, res) =>
{
  console.log("sign up page");
  res.sendFile(process.cwd() + '/src/data/sign_up.html');
})

app.get('/IDdupli', (req, res) =>
{
  console.log("ID duplicating")
  topic.IDduplicate(req, res);
})

app.post('/sign_up', (req, res) =>
{
  topic.Signup_process(req, res);
})

app.get('/admin', (req, res) =>
{ 
  admin.page(req, res);
});

app.listen(3000, () => console.log("example app "));