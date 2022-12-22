const http = require('http');
const fs = require('fs');
const URL = require('url');
const topic = require('./lib/topic');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static('./src'));


app.get('/', (req, res) =>
{
  // 토큰이 없으면
  res.sendFile(process.cwd() + '/src/data/sign_in.html');

  // 토큰이 있으면
  
})

app.get('/sign_up', (req, res) =>
{
  res.sendFile(process.cwd() + '/src/data/sign_up.html');
})

app.get('/sign_in', (req, res) =>
{
  res.sendFile(process.cwd() + '/src/data/sign_up.html');
})

// 그 뭐시야 중복체크 확인 해야함
app.get('/IDdupli', (req, res) =>
{
  let post = req.body;

  console.log(post);
  res.send("ID_Duplication");
})

app.post('/sign_up', (req, res) =>
{
  topic.Signup_process(req, res);
})

app.post('/sign_in', (req, res) =>
{
  topic.Signin_process(req, res);
})

app.listen(3000, () => console.log("example app "));