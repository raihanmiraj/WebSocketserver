const express = require('express');
const app= express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server,{ cors: { origin: '*' } });
const users={};
 
const fs = require('fs');
 
  io.on("connection", (socket)=>{
    socket.to("hoichoidev").emit("some event");
    console.log("connect")
       socket.on("new-user",(name)=>{
        users[socket.id] = name ; 
        socket.broadcast.emit('users-noti', JSON.stringify(users))
   
          })

          
        
      
        socket.on("disconnect", ()=>{
    if(typeof users[socket.id]!="undefined" ){
       
       delete users[socket.id];
       socket.broadcast.emit('users-noti', JSON.stringify(users))
     
     
    }
})
   
    } 
     ) 

 


app.get("/", (req, res)=>{
    res.sendFile(__dirname+ '/online.html');
    // res.sendFile(__dirname+ '/public/chat.html');
    // res.send('Hello World!')
});

app.get("/online", (req, res)=>{
    res.send(JSON.stringify({
        user : users,
        totaluser:Object.keys(users).length
    }))
  
});

server.listen(8080, ()=>{
    console.log("listening Port 3000");
})
// server.listen(PORT, () => console.log(`Listening on ${PORT}`));