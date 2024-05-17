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
.get("/all-movies",async(req,res)=>{
    try {
        const movies=await Movie.find();
        res.send({
            success:true,
            message:"All movies fetched successfully.",
            data:movies
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})
.delete("/:movieId",async(req,res)=>{
    try {
        const movie=await Movie.findByIdAndDelete(req.params.movieId);
        if (!movie) {
          return res.status(404).send({
            success: false,
            message: "Movie not found.",
          });
        }
        res.send({
          success: true,
          message: "Movie deleted successfully.",
        });
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})


module.exports=router;