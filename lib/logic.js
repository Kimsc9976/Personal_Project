const db = require('./database.js');
const slp = require('./sleep.js');
const crypto_module = require('./crypto_module.js');
const fs = require('fs');
const j = require('./jwt.js');

const dataBuff = fs.readFileSync(process.cwd() + '/src/inform/user_data.json');
const dataJSON = dataBuff.toString();
let data = JSON.parse(dataJSON);


const logic = {
  Check_PW : async function(Password, Confirm, response){


    if(Password.length < 8)
    {
      return false;
    }

    if(Password === Confirm)
    {
      return true;
    }
    else{
      return false;
    }
  },
  Check_essential_item : async function(Post){
    let Id = Post.ID;
    let Password = Post.PW;
    let Email = Post.Email;
    let Ph_H = Post.Phone_Head, Ph_M = Post.Phone_Mid, Ph_T = Post.Phone_Tail;
    let pass = Id&&Password&&Email&&Ph_H&&Ph_M&&Ph_T ? true : false;

    return pass;
  },

  ID_confirm : async function(ID){
    let pass;
    let msg = "";
    if (ID === ``)
    {
      pass = false;
      return pass;
    }
    const id_confirmed = await slp.wrap_db(`SELECT ID FROM inform WHERE ID=?;`,[ID]);
    if(id_confirmed.length === 0) // DB에 존재하지 않을 떄
    {
      console.log("Can use this ID");
      msg += "사용할 수 있는 아이디 입니다.";
      pass = true;
    }
    else // DB에 존재할 떄
    {
      console.log("Cant use this ID");
      msg += "사용할 수 없는 아이디 입니다.";
      pass = false;
    }
    return [pass, msg];     
  },

  Sign_in : async function(ID, PW){
    
    let item = '아이디 혹은 비밀번호를 확인해 주세요.';
    let trigger = false;
    try {
      let result = await slp.wrap_db(`SELECT uuid, ID, Password,salt FROM inform WHERE ID=?;`,[ID]);
      let salt = result[0].salt;
      const confirm_pw = await crypto_module.module.getUserHashedPassword(salt, PW);
      
      if(!result.length) 
      {
        trigger = 0;
      }
      else
      {
        if(result[0].Password !== confirm_pw)
        {
          trigger = 0;
        }
        else if(result[0].Password === confirm_pw)
        {
          trigger = 1;
        }
      }
  
      if(trigger === 1)
      {
        data.UserID = result[0].ID;
        data.HashedPassword = result[0].Password;
        data.salt = result[0].salt;
        // authentication 할 token 제출해야함
        const token = await j.sign(result);
        item = token;
        console.log(item);
        data.accessToken = item.token;
        data.refreshToken = item.refreshToken;

        data = JSON.stringify(data);
        fs.writeFileSync(process.cwd() + '/src/inform/user_data.json' ,data);

        if(result[0].ID === "ksc9595") // 관리자 인증 방식은 secretkey.json 의 issuer와 대조하는 방식으로 변경할 예정
        {
          trigger = 2;
        }
      } 
      return [trigger, item]; //trigger false인 경우 topic에서 처리할 예정    
    }
    catch(error){
      return [trigger, item];
    }
  },

  alert_msg : function(msg)
  {
    if (!msg)
    {
      msg = "ID를 입력해주세요."
    }
    let alert_msg = `<script>alert('${msg}');history.back();</script>`;
    return alert_msg;
  }

}



module.exports = logic;