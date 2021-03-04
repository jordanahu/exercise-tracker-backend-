const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const App = express()
const dotenv = require("dotenv")
const usersRouter = require("./routers/users")
const exerciseRouter = require("./routers/exercise")
const bodyParser = require("body-parser");
App.use(bodyParser.urlencoded({ extended: false }))
App.use(bodyParser.json())
dotenv.config()
const path = require("path");
const fs = require("fs")
App.use(cors())
App.use("/users", usersRouter)
App.use("/exercise", exerciseRouter)
App.use(express.json())
const uri = process.env.ATLAS_URI

mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex:true}, err=>{
    if(!err) console.log("Successfully connected to database")
    else console.log("Error connecting to database")
})

App.get("/", (req, res)=>{
    res.send("Exercise Tracker Server successfully running!")
});

if (process.env.NODE_ENV == "production"){
    App.use(express.static("../build"));
    App.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "../build","index.html"))
    })
}

const {PORT:port = 8000} = process.env;

App.listen(port, ()=>console.log("Server started on port", port))