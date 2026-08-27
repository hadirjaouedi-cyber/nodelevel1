const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const articleSchema=new Schema({
    usernameee:String 
});
const Mydata=mongoose.model("Mydataa",articleSchema);
module.exports=Mydata