const express = require('express')
const app = express()
const mongoose = require('mongoose');
require('dotenv').config(); // ← AJOUTEZ CETTE LIGNE
const port = process.env.PORT || 3001 // ← MODIFIEZ CETTE LIGNE

var methodOverride = require('method-override')
app.use(methodOverride('_method'))



app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
const allRoutes = require('./routes/allRoutes');
const addUserRoute = require('./routes/addUser');
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







mongoose
    .connect(process.env.MONGODB_URI) // ← UTILISE .env
    .then(() => {
        app.listen(port, () => {
            console.log(`http://localhost:${port}/`)
        })
    })
    .catch((err) => { console.log(err) })


app.use(allRoutes);
app.use("/user", addUserRoute)