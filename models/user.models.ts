import { Schema, Document, Model, model } from 'mongoose' ;
 
interface user extends Document{
    name: string ,
    email : string ,
    password : string ,   
    mobile : string ,
}

const schema = new Schema({
    name : {type : String , unique : true , required : true},
    email : {type : String , unique : true , required : true},
    password : {type : String , required : true},
    mobile : {type : String , required : true} 
})

export let User : Model<user>  = model<user>('user' , schema ) ; 