// 회원가입 페이지는 html로 형성 후 function을 이용해 잡아 넣자,
const db = require('./database.js');
const template = require('./template.js');
const URL = require('url');
const qs = require('querystring');
const logic = require('./logic.js');
const slp = require('./sleep.js');
const uuid = require('uuid');
const crypto_module = require('./crypto_module.js');


exports.Signup_process = async function(request, response){
  let post = request.body;
  
  let msg = ``;

  let id_confirm = await logic.ID_confirm(post.ID);
  let config = id_confirm[0], id_confirm_msg = id_confirm[1];
  if(!config) // config === false
  {
    msg += id_confirm_msg;  
  }

  let check_pw = post.PW === post.Confirm_PW;
  if(!check_pw)
  {
    msg += ' 비밀번호를 다시 확인해주세요. ';
  }

  let chk_item = await logic.Check_essential_item(post);
  if(!chk_item)
  {
    console.log(3);
    console.log("blank exist", post);
    msg += ' 필수적으로 작성해야할 부분이 남았습니다. ';
  }

  if(config&&check_pw&&chk_item)
  {
    console.log(post.PW);
    const {hashedPassword, salt} = await crypto_module.module.encodePassword(post.PW); 
    //  hashed랑 salt랑 db에 같이 보관하면 무조건 뚤릴텐데 db에 넣을꺼면 어디다 넣을 건지 고려해야함
    console.log("포스트", [uuid.v4(), post.ID, post.PW, post.Email, post.Phone_Head, post.Phone_Mid, post.Phone_Tail]);
    await slp.wrap_db(`INSERT INTO inform (uuid, ID, Password, salt , Email, Phone_Head, Phone_Mid, Phone_Tail, created) VALUES(?,?,?,?,?,?,?,?,NOW())`,
                [uuid.v4(), post.ID, hashedPassword, salt, post.Email, post.Phone_Head, post.Phone_Mid, post.Phone_Tail]);
    console.log("회원가입 완료");
    response.redirect(`/`);
  }
  else
  {
    console.log("Send_error");
    response.send(logic.alert_msg(msg));
  }
}

exports.IDduplicate = async function(request, response){

  let url = request.url;
  let query = URL.parse(url,true).query;
  let result  = await logic.ID_confirm(query.ID);

  let config = result[0], msg = result[1];
  if(config)
  {
    response.send(logic.alert_msg(msg));
  }
  if(!config)
  {
    response.send(logic.alert_msg(msg));
  }
}

exports.Signin_process = async function(request, response){
  let post = request.body;
  let ID = post.ID;
  let PW = post.PW;

  logic.Sign_in(ID,PW).then((result) =>{
    let trig = result[0];
    let item = result[1];
    if (trig === 0)
    {
      response.send(logic.alert_msg(item));
    }
    else if(trig === 1)
    {
      response.redirect(`/`);
      console.log("log_in finish!");
    }
    else if(trig === 2)
    {
      response.redirect(`/admin`);
    }
  });
}