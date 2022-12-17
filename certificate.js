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
  topic.Log_in(req, res);

})

app.get('/Signup', (req, res) =>
{
  topic.Sign_up(req, res);
})

app.post('/Signup_process', (req, res) =>
{
  topic.Signup_process(req, res);
})

app.post('/Signin', (req, res) =>
{
  topic.Signin_process(req, res);
})

app.listen(3000, () => console.log("example app "));