# CHAT APP

<h1>How to use</h1>
<p><marker>Start the server using npm start</marker></p>

<div>
<p>
  <br>
import express from 'express' <br>
const app = express()<br>
const server = require('http').createServer(app)<br>
const io = require('socket.io')(server) <br>
</p>
</div>

<div>
<h3>SOCKET EVENTS</h3>

<p> .On is listening for all events from frontend </p>
<p> .emit is sending events to frontend </p>
<p> for joining the specific room use command socket.join() </p>

</div>


<div>
  <h3> REDIS IMPLEMENTATION </h3>
  <p>
    Using redis hset command for storing room information both for singlechat and groupChat . <br> 
    import * as redis from 'redis' <br>
let client = redis.createClient(); <br>
import {promisify} from 'util' <br>
  
  <h5> Storing in Hset </h5>
  <p>
   let data = {message : [] , activeUser  : [userInfor] , users : []}<br>
        client.hset(roomName , 'users' , JSON.stringify(data) ) <br>
  </p>
  </p>
  </div>
  
  <div>
  <h1>SCHEMAS</h1>
  <p> ChatThread  - Storing all the room information in chatThread</p>
  <p>USERS -  storing user infomation</p>
  <p>Messages</p>
  </div>
  
  <div>
  <h2>TESTING DONE</h2>
  <h3>SOCKET.IO TESTER</h3>
  </div>
