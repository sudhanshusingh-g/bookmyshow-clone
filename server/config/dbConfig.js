const mongoose=require("mongoose");

const databseURI=process.env.DB_URI

mongoose.connect(databseURI)
.then(()=>{
    console.log("Connected to database successfully");
})
.catch((err)=>{
    console.error("Error connecting to database: ",err);
});