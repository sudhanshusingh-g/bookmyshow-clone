const router=require("express").Router();
const bcrypt=require("bcryptjs")
const User=require("../models/userModel")


//register the user
router.post("/register", async (req,res)=>{
    try {
        const existingUser=await User.findOne({email:req.body.email})

        if(existingUser){
            res.send({
                success:false,
                message:"User already exists"
            })
        }

        //hash the password

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password=hash;

        const newUser= new User(req.body);

        await newUser.save();

        res.send({
            success:true,
            message:"Registration successful."
        })

    } catch (error) {
        console.log("Error: ",error);
    }
})

module.exports=router