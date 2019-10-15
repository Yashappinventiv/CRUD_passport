# CHAT APP

<h1>How to use</h1>
<p><marker>Start the server using npm start</marker></p>

<div>
<p>
import express from 'express'
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
</p>
</div>

<div>
<h3>SOCKET EVENTS</h3>

<p> .On is listening for all events from frontend </p>
<p> .emit is sending events to frontend </p>
<p> for joining the specific room use command socket.join() </p>

</div>
