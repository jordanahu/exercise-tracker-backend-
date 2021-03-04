const express = require("express");
const router = express.Router()
const Users = require("../models/user.model")

router.get("/", (req, res)=>{
    Users.find()
    .then(users=>res.json(users))
    .catch(err=>res.status(400).json("Error: " + err))
    
})

router.post("/add", (req, res)=>{
    var username = req.body.username
    const newUser = new Users({username})
    newUser.save()
    .then(()=>res.json("Successfully added username!"))
    .catch(err=>res.status(400).json("Error: "+ err))

})

module.exports = router