const express=require("express");
const cors=require("cors")
const app=express();
const port=8000;
const dotenv = require("dotenv");
dotenv.config();
app.use(cors());
const dbConfig=require("./config/dbConfig")
const userRoute=require("./routes/userRoute");

app.use(express.json())
app.use("/api/users",userRoute);


app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})