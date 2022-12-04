const http = require('http')
const fs = require('fs');

const server=http.createServer((req,res) =>{
  const url=req.url;
  const method=req.method;

  if(url==='/'){

   /* fs.readFile(filePath, {encoding: "utf-8"}, (err,data) => {
      if(err){
        console.log(err);
      }
    })*/

    fs.readFile("message3.txt", {encoding: "utf-8"}, (err,data) => {
      if(err){
        console.log(err);
      }
      console.log(`data from file`+data);
      res.write('<html>')
      res.write('<head><title>Enter Message3</title></head>')
      res.write(`<body>${data}</body>`)
      res.write(`<body><form action="/message3" method="POST"><input type="text" name="message3"><button type="submit">Send</button></form></body>`)
      res.write('</html>')
      return res.end()
    })

    
  }

  else if(url==="/message3" && method==="POST"){

    const body =[];
    req.on('data', (chunk) =>{
      console.log(chunk);
      body.push(chunk);
    });

    return req.on('end',() =>{
      const parsedBody = Buffer.concat(body).toString();
      console.log("parsedBody>>>>",parsedBody);
      const message3 = parsedBody.split("=")[1];
      fs.writeFile('message3.txt',message3, err =>{
        if(err){
          console.log(err);
        }
        console.log(`inside fs.writeFile`);
        res.statusCode=302;
        res.setHeader("Location","/");
        return res.end();
      });
    });

    
    
  }
  else{
    res.setHeader('Content-Type','text/html');
    res.write('<html>')
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server</h1></body>')
    res.write('</html>')
    res.end();
  }
  
});

//module.exports = requestHandler;
server.listen(4000);