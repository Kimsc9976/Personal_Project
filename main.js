const http = require('http');
const fs = require('fs');
const URL = require('url');
const topic = require('./lib/topic')

let app = http.createServer(function(request,response){
  let url = request.url;
  console.log("이거", url);

  let queryData = URL.parse(url,true).query;
  let pathname = URL.parse(url,true).pathname;

  console.log(URL.parse(url,true));
  if(pathname ==='/')
  {
    topic.Log_in(request, response);
  }
  else if(pathname === '/Signup.html')
  {
    topic.Sign_up(request, response);
  }
  else
  {
    response.writeHead(404);
    response.end("Not Found");
  }
});
app.listen(3000);