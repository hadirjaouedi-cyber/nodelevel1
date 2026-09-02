const express = require('express')
const app = express()
const mongoose = require('mongoose');
require('dotenv').config(); // ← AJOUTEZ CETTE LIGNE
const port = process.env.PORT || 3001 // ← MODIFIEZ CETTE LIGNE
const User = require("./models/customerschema");
const moment = require('moment');
var methodOverride = require('method-override')
app.use(methodOverride('_method'))



app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));

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
app.get("/", (req, res) => {
    User.find().then((result) => {
        res.render("index", { arr: result, moment: moment })
    }).catch((err) => {
        console.log(err)
    })
})
app.get("/user/add.html", (req, res) => {
    res.render("user/add");
})

app.get("/edit/:id", (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            res.render("user/edit", { obj: result, moment: moment })
        })
        .catch((err) => {
            console.log(err)
        })

})

app.get("/view/:id", (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            res.render("user/view", { obj: result, moment: moment })
        })
        .catch((err) => {
            console.log(err)
        })

});








//post request 

app.post("/user/add.html", (req, res) => {

    User.create(req.body)
        .then(() => {
            res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
        });
});
app.post("/search", (req, res) => {
     console.log("******************************")
    User.find({ $or: [{firstName: "hasan"}, {lastName: "hasan"}] })
        .then((result) => {
           console.log(result)
        })
        .catch((err) => {
            console.log(err);
        });
});










//delete request
app.delete("/edit/:id", (req, res) => {
    User
        .deleteOne({ _id: req.params.id })
        .then(() => {
            res.redirect("/")
        })
        .catch((err) => {
            console.log(err)
        })

})
//put request
app.put("/edit/:id", (req, res) => {
    User.updateOne({ _id: req.params.id }, req.body).then((result) => {
        console.log(result)
        res.redirect("/")
    })
        .catch((err) => {
            console.log(err)
        })

})












mongoose
    .connect(process.env.MONGODB_URI) // ← UTILISE .env
    .then(() => {
        app.listen(port, () => {
            console.log(`http://localhost:${port}/`)
        })
    })
    .catch((err) => { console.log(err) })