const router=require("express").Router();
const bcrypt=require("bcryptjs")
const User=require("../models/userModel")
const jwt=require("jsonwebtoken");

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


//login the user
router.post("/login",async (req,res)=>{
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.send({
          success: false,
          message: "User does not exist.",
        });
      }

      const validatePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validatePassword) {
        return res.send({
          success: false,
          message: "Invalid Password",
        });
      }
      const token = jwt.sign({ userId: user._id }, process.env.KEY, {
        expiresIn: "1d",
      });
      res.send({
        success: true,
        message: "User is logged in!",
        data:token
      });
    } catch (error) {
        console.log("Error : ",error);
    }
})

module.exports=router