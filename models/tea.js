import mongoose from 'mongoose';

const {Schema, model} = mongoose;

const teaSchema = new Schema({
    dateCreated:{type:Date, default:Date.now}, //assigning object with options (type = datatype (string) , default = default value when adding a new document).
    name:String,
    description:String,
    category:String, 
    price:Number
});

//creating the model which we can use to interact with the database
const Tea = model('Tea', teaSchema);

export default Tea;