const express =require('express')
const app= express()
const mongoose = require('mongoose');
const port=3001
const Mydata=require("./models/mydataschema");




app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=> {
    res.sendFile("./views/homepage.html",{root: __dirname})  ;
})
app.get("/homepage.html",(req,res)=> {
    res.send("<h1> data sended successfuly </h1>") ;
})
mongoose
.connect("mongodb://hadirjaouedi_db_user:MYWCwmroG13aNPCT@ac-omrjkwr-shard-00-00.vkky72a.mongodb.netall-data:27017,ac-omrjkwr-shard-00-01.vkky72a.mongodb.net:27017,ac-omrjkwr-shard-00-02.vkky72a.mongodb.net:27017/?ssl=true&replicaSet=atlas-rgxh02-shard-0&authSource=admin&appName=Cluster0")
.then(()=> {
    app.listen(port,()=>{
    console.log(`http://localhost:${port}/`)
})
})
.catch((err)=> {console.log(err)});
app.post("/",(req,res)=> {
    console.log(req.body)
    const mydata=new Mydata(req.body)
    mydata.save()
    .then(()=> {
         res.redirect("/homepage.html")
    }).catch((err) =>{
        console.log(err)
        
    });
   
});