const db = require('./database.js');
const template = require('./template.js');
const URL = require('url');
const qs = require('querystring');
const logic = require('./logic.js');


// const { type } = require('os');


exports.Log_in = function(request, response){
  let url = request.url;

  let main_header = 'Log_in';

  let body = `  <h1>Sign in</h1>
  <p> ID : <input type = "text" name = "ID" >  </p>
  <p> PW : <input type = "text" name = "PW" >  </p>
  
  <button type = "button" name = "Log in" >Log in</button>
  <button type = "button" name = "Sign up" onclick="location.href='/Signup'">Sign up</button>`;
  let html = template.HTML(main_header, body);
  response.writeHead(200);
  response.end(html);
}

exports.Sign_up = function(request, response){
  let url = request.url;

  let main_header = 'Sign up';

  let body = `  <h1>Sign in</h1>
  <form action = "/Signup_Process" method = "post">
  <br>
  <table>
    <tr>
      <td>ID : </td>
      <td><input type = "text" name = "ID" ></td>
      <td><button type = "button" name = "Check_ID" >중복 확인</button></td>
    </tr>
    <tr>
      <td>PW : </td>
      <td><input type = "text" name = "PW" ></td>
    </tr>
    <tr>
      <td>Check PW : </td>
      <td><input type = "text" name = "Confirm_PW"></td>
    </tr>
    <tr>
      <td>Email : </td>
      <td><input type = "text" name = "Email" ></td>
    </tr>
  </table>
  <p> Phone No. : <input type = "text" name = "Phone_Head" > - 
  <input type = "text" name = "Phone_Mid" > - 
  <input type = "text" name = "Phone_Tail" >
  </p>
  <br>
  <button type = "submit" name = "Sign_Finish" >가입완료</button>
  </form>
  `;
  let html = template.HTML(main_header, body);
  response.writeHead(200);
  response.end(html);
}

exports.Signup_process = function(request, response){

  let body = '';
  request.on('data', function(data){ // 특정 조각들의 데이터를 호출
    body += data;
    if(body.length>1e6)
    {request.destroy();}
  });
  request.on('end', function(){
    let post = qs.parse(body);
    console.log("response 확인",response.path);
    console.log("로그 확인", post);

    let page;
    if(!logic.Check_PW(post.PW, post.Confirm_PW))
    {
      console.log("pass err");
      response.redirect();
    } 
    else if(!logic.Check_essential_item(post))
    {
      console.log("blank exist", post);
    }
    else
    {
      console.log("correct");


      response.writeHead(302, {Location : "/"});
      response.end("success");
    }
    // db.query(`
    // INSERT INTO topic (title, description, created, author_id)
    // VALUES(? , ?, NOW(), ?)`, // 데이터 베이스에 직접 저장
    // [post.title, post.description, post.author],
    // function(error, result){
    //   if (error)
    //   {
    //     throw error;
    //   }
    //   response.writeHead(302, {Location : `/?id=${result.insertId}`});
    //   response.end('success');
    // });
  });
}
