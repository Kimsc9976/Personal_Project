// 회원가입 페이지는 html로 형성 후 function을 이용해 잡아 넣자,
const db = require('./database.js');
const template = require('./template.js');
const URL = require('url');
const qs = require('querystring');
const logic = require('./logic.js');
const slp = require('./sleep.js');
const uuid = require('uuid');

exports.Log_in = async function(request, response){
  console.log("log_in");
  let main_header = 'Log_in';

  let body = `  <h1>Sign in</h1>
  <form action = "/Signin" method = "post">
  <p> ID : <input type = "text" name = "ID" >  </p>
  <p> PW : <input type = "text" name = "PW" >  </p>
  
  <button type = "submit" name = "Log in">Log in</button>
  </form>
  <br>
  <button type = "button" name = "Sign up" onclick="location.href='/Signup'">Sign up</button>`;
  let html = template.HTML(main_header, body);
  
  response.send(html);
}

exports.Sign_up = async function(request, response){
  console.log("Sign_up");

  let main_header = 'Sign up';
  console.log(this);
  let body = `
  <a href = "/">to Sign in</a>
  <h1>Sign up</h1>
  <form action = "/Signup_Process" method = "post">
  <br>
  <table>
    <tr>
        <td>ID : </td>
        <td><input type = "text" name = "ID" ></td>
    </tr>
    <tr>
      <td>PW : </td>
      <td><input type = "text" name = "PW" Id = "PW"></td>
    </tr>
    <tr>
      <td>Check PW : </td>
      <td><input type = "text" name = "Confirm_PW" Id = "Confirm_PW" ></td>
      <td><button type = "button" onclick = "Confirm()">비밀번호 확인</button></td>
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
  <button type = "submit" name = "Sign_Finish" >Modify</button>
  </form>

  <script>
    function Confirm(){
      let pw = document.getElementById("PW").value;
      let con_pw = document.getElementById("Confirm_PW").value;
      if(pw < 4)
        return alert("비밀번호 자리수를 재설정 해주세요.");

      if (pw === con_pw)
        return alert("비밀번호가 일치합니다.");
      
      return alert("비밀번호가 일치하지 않습니다. ");
    }
  </script>
  `;
  let html = template.HTML(main_header, body);
  response.send(html)
}

exports.Signup_process = async function(request, response){

  let post = request.body;
  
  let msg = ``;

  let id_confirm = await logic.ID_confirm(post.ID);
  if(id_confirm === 0 )
  {
    console.log(1);
    console.log("Cant use this ID", id_confirm);
    msg += ' 사용 불가능한 ID입니다. ';   
  }
  else if(id_confirm === -1)
  {
    msg += ' ID를 입력해 주세요. ';  
  }

  let chk_item = await logic.Check_essential_item(post);
  if(!chk_item)
  {
    console.log(3);
    console.log("blank exist", post);
    msg += ' 필수적으로 작성해야할 부분이 남았습니다. ';
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
    msg = '';
    console.log("Send_error");
    response.send(err_msg);
  }
}

exports.Signin_process = async function(request, response){
  let post = request.body;
  let ID = post.ID;
  let PW = post.PW;
  let msg = '';
  console.log("아이디 : ",ID.type, "비번 : ",PW.type);

  if(ID.type === undefined || PW.type === undefined)
  {
    if(ID.type === undefined)
    {
      msg += '아이디를 확인해 주세요. ';
    }
    if(PW.type === undefined)
    {
      msg += '비밀번호를 확인해 주세요. ';
    }

    let err_msg = `<script>alert('${msg}');history.back();</script>`;
    response.send(err_msg);
  }
  else{
    // secret key 던져야함...
    response.send("Hello");
  }
  
  

}