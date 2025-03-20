const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const user = require("../models/Auth");

exports.signup = async(req,res)=>{
   try{
      const {name,email,password,role} = req.body;

      const existingUser = await user.findOne({email});
      if(existingUser){
         return res.status(400).json({
            success:false,
            message:"user already exists"
         });
      }

      let hassedPassword ;
      try{
         hassedPassword = await bcrypt.hash(password,10);
      }
      catch(e){
         return res.status(500).json({
            success:false,
            message:"password hasing failed"
         })
      }

      const newUser = user.create({
         name,email,password:hassedPassword,role
      })

      return res.status(200).json({
         success:true,
         message:"user created successfully"
      })

   }
   catch(e){
      console.log(e);
      res.status(500).json({
         success:true,
         message:"user creation failed"
      })
   }
}

exports.login = async(req,res)=>{
   try{
      const {email,password} = req.body;
      if(!email || !password) {
         return res.status(400).json({
            success:false,
            message:"Please fill all the details first"
         })
      }

      const foundUser = await user.findOne({email});

      if(!foundUser){
         return res.status(500).json({
            success:false,
            message:"user not registered"
         })
      }

      const payload= {
         email:foundUser.email,
         id:foundUser._id,
         role:foundUser.role
      }

      if(await bcrypt.compare(password,foundUser.password)){

         let token = jwt.sign(payload,process.env.SECRET,{
                        expiresIn:"2h",
                     });

         const userObject = foundUser.toObject();
         userObject.token = token;
         userObject.password = undefined;

         const options = {
            expires : new Date(Date.now()+3*24*60*1000),
            httpOnly:true,
         }

         res.cookie("nithincokkie",token,options).status(200).json({
            success:true,
            token,
            user: userObject,
            message:"User logged in Successfully"
         })
      }
      else{
         console.log("Password incorrect");
         return res.status(500).json({
            success:false,
            message:"password Incorrect"
         })
      }
   }
   catch(e){
      console.log("Error during login:", e);
      res.status(500).json({
         success:false,
         message:"login failure"
      })
   }
}