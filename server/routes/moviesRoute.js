const router=require("express").Router();
const Movie=require("../models/movieModel");

// Add a movie
router.post("/add-movie",async(req,res)=>{
    try {
        const newMovie=new Movie(req.body)
        await newMovie.save();
        res.send({
            success:true,
            message:"Movie added successfully"
        })
    } catch (error) {
        res.send({
          success: false,
          message: error.message,
        });
    }
})


module.exports=router;