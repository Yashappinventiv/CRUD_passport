import {joinGroupRoom , messageGroup} from '../services/redis'


export async function joinRoom(socket : any , data : {room : string , id  : number , name : string} ){
    if(data.room){
        socket.join(data.room);
        let joinedUserActiveData = await joinGroupRoom(data.room , {id : data.id , name : data.name}) ;
       return socket.broadcast.to(data.room).emit('welcome' , `${data.name} has joined the chat ${joinedUserActiveData}` ) ;
    }
}

export async function groupMessage(socket : any , data : {room : string , id  : number , message : string}){
    console.log(data.room , data.id , data.message)    
    if(data.room && data.id && data.message){
            console.log("1");
             await messageGroup(data.room , {id : data.id , message : data.message})
            console.log("2");
            return  socket.broadcast.in(data.room).emit('message' , `${data.message} sent by ${data.id}`)
            
            
        }
}