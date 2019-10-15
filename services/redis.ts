import * as redis from 'redis'
let client = redis.createClient();
import {promisify} from 'util'

client.on("error", function (err) {
    console.log("Error " + err);
});


const getAsync = promisify(client.hget).bind(client);

export async function joinGroupRoom(roomName : string , userInfor : {id : number , name : string} ){
    console.log("reached 1");
    let joindata  = await getAsync(roomName , 'users' ) ;
    if(joindata){
      let joindataParse =   JSON.parse(joindata) ;
      joindataParse.users.push(userInfor) ; 
      joindataParse.activeUser.push(userInfor);
      client.hset(roomName , 'users' , JSON.stringify(joindataParse) )
      return  joindataParse.activeUser ;
    }else{
        let data = {message : [] , activeUser  : [userInfor] , users : []}
        client.hset(roomName , 'users' , JSON.stringify(data) )
        return  data.activeUser ;    
    
    }
}

export async function messageGroup(roomName : string , userInfor : {id : number , message : string}){
    console.log("reached 2");
    let messagedata  = await getAsync(roomName , 'users' ) ;
    if(messagedata){
        let parseMessagedata = JSON.parse(messagedata) ; 
        parseMessagedata.message.push(userInfor);
        client.hset(roomName , 'users' , JSON.stringify(parseMessagedata) )
         return
    }else{
        return  ;
    }
}

export async function joinSingleRoom(roomName : string){
    let joindata  = await getAsync(roomName , 'users' ) ;
    if(joindata){
        let x = JSON.parse(joindata);
        let currentUser = x.users.length ;
        return currentUser.toString()
    }

    return '0' ;
}
