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
    
    // const {hashedPassword, salt} = await crypto_module.encodePassword(PW);  --> 비밀번호 만들때 필요함
    // let sct_key = await crypto_module.createSalt()
    // // const dataBuff = fs.readFileSync(process.cwd() + '/src/inform/user_data.json');
    // // const dataJSON = dataBuff.toString();
    // // let data = JSON.parse(dataJSON);

    // // data.UserID = "im studing";
    // // data.HashedPassword = "tlqkftozl";
    // // data.salt = "tlqkftozl";

    // data = JSON.stringify(data);
    // fs.writeFileSync('./syntax/helloThere.json',data);

// salt의 위치는 어디에 놔둬야하냐.... 다른 DB로 두야하는건 알겠는뎅...
    try {
      let result = await slp.wrap_db(`SELECT uuid, ID, Password,salt FROM inform WHERE ID=?;`,[ID]);
      let salt = result[0].salt;
      const confirm_pw = await crypto_module.module.getUserHashedPassword(salt, PW);
      
      if(!result.length) // Secert key로 설정 할 수 있게 작업해야함
      {
        trigger = false;
      }
      else
      {
        if(result[0].Password !== confirm_pw)
        {
          trigger = false;
        }
        else if(result[0].Password === confirm_pw)
        {
          trigger = true;
        }
      }
  
      if(trigger)
      {
        // authentication 할 token 제출해야함
        const token = await j.sign(result);
        item = token;
        console.log(item);
        data.accessToken = item.token;
        data.refreshToken = item.refreshToken

        data = JSON.stringify(data);
        fs.writeFileSync(process.cwd() + '/src/inform/user_data.json' ,data);
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