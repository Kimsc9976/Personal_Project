const db = require('./database.js');
const template = require('./template.js');
const URL = require('url');
const qs = require('querystring');
const logic = require('./logic.js');
const uuid = require('uuid');

exports.Log_in = function(request, response){
  console.log("log_in");
  let main_header = 'Log_in';

  let body = `  <h1>Sign in</h1>
  <p> ID : <input type = "text" name = "ID" >  </p>
  <p> PW : <input type = "text" name = "PW" >  </p>
  
  <button type = "button" name = "Log in" >Log in</button>
  <button type = "button" name = "Sign up" onclick="location.href='/Signup'">Sign up</button>`;
  let html = template.HTML(main_header, body);
  
  response.send(html);
}

exports.Sign_up = function(request, response){
  console.log("Sign_up");

  let main_header = 'Sign up';

  let body = `<h1>Sign up</h1>
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
  response.send(html)
}

exports.Signup_process = function(request, response){

  let post = request.body;
  console.log("로그 확인", post);

  let page;
  let msg = ``;
  if(!logic.Check_PW(post.PW, post.Confirm_PW, response))
  {
    console.log("pass err");
    msg += ' 비밀번호를 다시 확인해주세요.';   
  } 
  if(!logic.Check_essential_item(post))
  {
    console.log("blank exist", post);
    msg += ' 필수적으로 작성해야할 부분이 남았습니다.'
  }
  
  if(msg === ``)
  {
    console.log("finished_sign_up");
    console.log("포스트", [uuid.v4(), post.ID, post.PW, post.Email, post.Phone_Head, post.Phone_Mid, post.Phone_Tail]);
    db.query(`
    INSERT INTO inform (uuid, ID, Password, Email, Phone_Head, Phone_Mid, Phone_Tail, created)
    VALUES(?,?,?,?,?,?,?,NOW())`, // 데이터 베이스에 직접 저장
    [uuid.v4(), post.ID, post.PW, post.Email, post.Phone_Head, post.Phone_Mid, post.Phone_Tail],
    function(error, result){
      if (error)
      {
        throw error;
      }
      console.log("회원가입 완료");
      response.redirect(`/`);
    });
  }
  else
  {
    let err_msg = `<script>alert('${msg}');history.back();</script>`;
    console.log("Send_error");
    response.send(err_msg);
  }
}
