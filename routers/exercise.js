const express = require("express");
const router = express.Router()
const Exercise = require("../models/exercise.model")
require("dotenv").config();

router.get("/", (req, res)=>{
    Exercise.find()
    .then(exercise=>res.json(exercise))
    .catch(err=>res.status(400).json("Error: " + err))
})

router.post("/add", (req, res)=>{
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date)
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    })
    newExercise.save()
    .then(_=>res.json("Exercise successfully save!"))
    .catch(err=>res.status(400).json("Error: "+err))
})

router.delete("/:id", (req, res)=>{
    Exercise.findByIdAndDelete(req.params.id)
    .then(()=>res.json("Exercise deleted!"))
    .catch(err=>res.status(400).json("Error: "+err))
})
router.get("/:id", (req, res)=>{
    Exercise.findById(req.params.id)
    .then((exercise)=>res.json(exercise))
    .catch(err=>res.status(400).json("Error: "+err))
})

router.put("/update/:id", (req, res)=>{
    try{
            Exercise.findOneAndUpdate({_id:req.params.id}, req.body, (err, results)=>{
               res.json("Successfully Updated!")
            })



    }catch(err){
        console.log("Error "+err)
    }
}

)




module.exports = router