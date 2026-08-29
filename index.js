const express =require('express')
const app= express()
const mongoose = require('mongoose');
const port=3001
const User = require("./models/customerschema");


app.use(express.static('public'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}));

// Auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

//get request
app.get("/",(req,res)=> {
    User.find().then((result)=>{
         res.render("index",{arr:result}) 
    }).catch((err)=>{
        console.log(err)
    })
 })  

app.get("/user/add.html",(req,res)=> {
    res.render("user/add") ;
})
app.get("/user/view.html",(req,res)=> {
    res.render("user/view") ;
})
app.get("/user/edit.html",(req,res)=> {
    res.render("user/edit") ;
})

//post request 

app.post("/user/add.html", (req, res) => {
    const user = new User(req.body);  
    user.save()
        .then(() => {
            res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
        });
});













mongoose
.connect("mongodb://hadirjaouedi_db_user:MYWCwmroG13aNPCT@ac-omrjkwr-shard-00-00.vkky72a.mongodb.netall-data:27017,ac-omrjkwr-shard-00-01.vkky72a.mongodb.net:27017,ac-omrjkwr-shard-00-02.vkky72a.mongodb.net:27017/?ssl=true&replicaSet=atlas-rgxh02-shard-0&authSource=admin&appName=Cluster0")
.then(()=> {
    app.listen(port,()=>{
    console.log(`http://localhost:${port}/`)
})
})
.catch((err)=> {console.log(err)});




