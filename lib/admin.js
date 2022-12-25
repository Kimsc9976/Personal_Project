const db = require('./database.js');
const template = require('./template.js');
const URL = require('url');
const qs = require('querystring');
const logic = require('./logic.js');
const slp = require('./sleep.js');
const uuid = require('uuid');
const crypto_module = require('./crypto_module.js');

exports.page = async function(request, response){

  let url = request.url;
  let query = URL.parse(url,true).query;
  let pathname = URL.parse(url,true).pathname;
  const result = await slp.wrap_db("SELECT * FROM inform");
  console.log(result);
  let body = '';
  body += '<h1>USERS</h1>'
  body += template.table(result);

  let html = template.HTML(url, body);
  response.send(html);
}