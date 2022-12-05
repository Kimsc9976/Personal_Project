const db = require('./database.js');
const template = require('./template.js');
const URL = require('url');
const qs = require('querystring');

exports.Log_in = function(request, response){
  let url = request.url;

  let main_header = 'Log_in';

  let body = `  <h1>Sign in</h1>
  <p> ID : <input type = "text" name = "ID" >  </p>
  <p> PW : <input type = "text" name = "PW" >  </p>
  
  <button type = "button" name = "Log in" >Log in</button>
  <button type = "button" name = "Sign up" onclick="location.href='Signup.html'">Sign up</button>`;
  let html = template.HTML(main_header, body);
  response.writeHead(200);
  response.end(html);
}

exports.Sign_up = function(request, response){
  let url = request.url;

  let main_header = 'Sign up';

  let body = `  <h1>Sign in</h1>
  <p> ID : <input type = "text" name = "ID" > <button type = "button" name = "Check_ID" >중복 확인</button> </p>
  <p> PW : <input type = "text" name = "PW" > </p>
  <p> Check PW : <input type = "text" name = "Ch_PW" > </p>
  <br>
  <p> Phone No. : <input type = "text" name = "Phone_Head" > - <input type = "text" name = "Phone_Mid" > - <input type = "text" name = "Phone_Tail" > </p>
  <p> Email : <input type = "text" name = "Ch_PW" > </p>
  <br>
  <button type = "button" name = "Sign_Finish" >가입완료</button>
  `;
  let html = template.HTML(main_header, body);
  response.writeHead(200);
  response.end(html);
}
