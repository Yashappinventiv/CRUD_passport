import express from 'express';
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
import mongoose from 'mongoose'
import { joinRoom, groupMessage  } from './controller/group.chat';
import { joinSingle , singleMessage} from './controller/single.chat';

async function start() {
    try {
        await mongoose.set('debug', true);
        await mongoose.connect('mongodb://localhost:27017');

        io.on('connection', (socket: any) => {
            console.log(socket.id)

            socket.on('joinGroup', async function (data: { room: string, id: number, name: string }) {
                await joinRoom(socket, data);
            });
                          
            socket.on('messageGroup', async (data: { message: string, room: string, id: number }) => {
                await groupMessage(socket, data)
            })


            socket.on('joinSingle', async function (data: { room: string, id: number, name: string }) {
                console.log(data)
                await joinSingle(io , socket, data);
            });

            socket.on('messageSingle', async (data: { message: string, room: string, id: number }) => {
                await singleMessage(socket, data);
            })

        });


        server.listen(3000, () => {
            console.log("Server Connected");
        })
    } catch (e) {
        console.log("server error from start")
    }

}

start();


