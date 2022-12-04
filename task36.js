const http = require('http')
const fs = require('fs');

const server=http.createServer((req,res) =>{
  const url=req.url;
  const method=req.method;

  if(url==='/'){
    res.write('<html>')
    res.write('<head><title>Enter Message2</title></head>')
    res.write('<body><form action="/message2" method="POST"><input type="text" name="message2"><button type="submit">Send</button></form></body>')
    res.write('</html>')
    return res.end()
  }

  if(url==='/message2' && method==='POST'){

    const body =[];
    req.on('data', (chunk) =>{
      console.log(chunk);
      body.push(chunk);
    });

    return req.on('end',() =>{
      const parseBody = Buffer.concat(body).toString();
      //console.log(parseBody);
      const message2 = parseBody.split('=')[1];
      fs.writeFile('message2.txt',message2, err =>{
        res.statusCode=302;
        res.setHeader('Location','/');
        return res.end();
      });
    });

    
    
  }

  res.setHeader('Content-Type','text/html');
  res.write('<html>')
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Node.js Server</h1></body>')
  res.write('</html>')
  res.end();
});

server.listen(3000);