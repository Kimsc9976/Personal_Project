const URL = require('url');
const db = require('./database.js');
const slp = require('./sleep.js');
const crypto_module = require('./crypto_module.js');
const fs = require('fs');

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
    if (ID === ``)
    {
      pass = -1;
      return pass;
    }
    
    db.query(`SELECT ID FROM inform WHERE ID=?;`,[ID], function (error, topic) {
      if (error) {
        throw error;
      }
      if(topic[0] === undefined)
      {
        pass = 1;
      }
      else if(topic[0].ID === ID){ 
        pass = 0;
      }  
    })
    await slp.sleep(5);

    return pass;     
  },

  Sign_in : async function(ID, PW){
    
    let item = '아이디 혹은 비밀번호를 확인해 주세요.';
    let trigger = false;
    
    // const {hashedPassword, salt} = await crypto_module.encodePassword(PW);
    

    const dataBuff = fs.readFileSync(process.cwd() + '/src/inform/user_data.json');
    const dataJSON = dataBuff.toString();
    let data = JSON.parse(dataJSON);

    data.UserID = "im studing";
    data.HashedPassword = "tlqkftozl";
    data.salt = "tlqkftozl";

    // data = JSON.stringify(data);
    // fs.writeFileSync('./syntax/helloThere.json',data);

// salt의 위치는 어디에 놔둬야하냐.... 다른 DB로 두야하는건 알겠는뎅...
    let result = await slp.wrap_db(`SELECT ID, Password,salt FROM inform WHERE ID=?;`,[ID])
    let salt = result[0].salt;

    const confirm_pw = await crypto_module.getUserHashedPassword(salt, PW);
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
      item = '로그인 중';
    }

    return [trigger, item];    
  }
}


module.exports = logic;