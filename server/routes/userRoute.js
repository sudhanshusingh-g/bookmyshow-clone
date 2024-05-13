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
      
      res.send({
        success: true,
        message: "User is logged in!",
      });
    } catch (error) {
        console.log("Error : ",error);
    }
})

module.exports=router