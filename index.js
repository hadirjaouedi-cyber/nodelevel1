const express =require('express')
const app= express()
const mongoose = require('mongoose');
const port=3001
const Mydata=require("./models/mydataschema");


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




























app.get("/",(req,res)=> {
    Mydata.find()
    .then((result)=> { res.render("homepage",{mytitle:"home page ",arr:result})  ;})
    .catch((err)=> {console.log(err)})
   
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



