const http = require('http');
const fs = require('fs');
const URL = require('url');
const topic = require('./lib/topic');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logic = require('./lib/logic');
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

app.get('/IDdupli', async (req, res) =>
{
  let url = req.url;
  let query = URL.parse(url,true).query;
  let result  = await logic.ID_confirm(query.ID);

  let config = result[0], msg = result[1];
  if(config)
  {
    res.send(logic.alert_msg(msg));
  }
  if(!config)
  {
    res.send(logic.alert_msg(msg));
  }
})

app.post('/sign_up', (req, res) =>
{
  topic.Signup_process(req, res);
})


app.listen(3000, () => console.log("example app "));