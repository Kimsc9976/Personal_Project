const URL = require('url');



const logic = {
  Check_PW : function(Password, Confirm, response){


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
  Check_essential_item : function(Post){
    let Id = Post.ID;
    let Password = Post.PW;
    let Email = Post.Email;
    let Ph_H = Post.Phone_Head, Ph_M = Post.Phone_Mid, Ph_T = Post.Phone_Tail;
    


    let pass = Id&&Password&&Email&&Ph_H&&Ph_M&&Ph_T ? true : false;

    return pass;
  },

  Pw_onchange : function(){

  }

}


module.exports = logic;