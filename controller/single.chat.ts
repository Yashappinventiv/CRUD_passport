import {joinGroupRoom , messageGroup , joinSingleRoom} from '../services/redis'

export async function joinSingle(io : any , socket : any , userinfor  : { room: string, id: number, name: string }){

try{
    console.log(userinfor)
   let count =  await joinSingleRoom(userinfor.room)
   if(count == '1' || count == '0'){
    socket.join(userinfor.room);
    let data = await joinGroupRoom(userinfor.room , {id : userinfor.id , name : userinfor.name} )
    return socket.broadcast.to(userinfor.room).emit('singleJoin' , `${userinfor.name} is active` )
   }else{
     io.to(socket.id).emit("error" , "Room already full")
   } 
   
}catch(e){
    console.log("error from single chat.ts" , e)    
}

}

export async function singleMessage(socket : any , data  : { room: string, id: number, message: string }){

}
