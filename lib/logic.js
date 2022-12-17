const URL = require('url');
const db = require('./database.js');
const slp = require('./sleep.js');


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
      console.log("제발 시발...",topic[0], "vs", ID);

      if(topic[0] === undefined)
      {
        pass = 1;
        console.log("야",pass);
      }
      else if(topic[0].ID === ID){ 
        pass = 0;
        console.log("야=호",pass);
      }  
    })
    await slp.sleep(5);
    console.log("DB밖임", pass);
    return pass;     
  }
}


module.exports = logic;