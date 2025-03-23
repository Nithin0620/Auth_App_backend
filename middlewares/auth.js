const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next)=>{
   try{

      console.log("body :" ,req.body.token);
      console.log("cookies :" ,req.cookies?.token);
      console.log("header :" ,req.header("Authorization")?.replace("Bearer " , ""));

      const token = req.body.token || req.cookies?.token || req.header("Authorization")?.replace("Bearer" , "");

      if(!token || token === undefined){
         return res.status(401).json({
            success:false,
            message:"token missing"
         })
      }

      try{
         const payload = jwt.verify(token,process.env.SECRET);
         req.user = payload;
      }
      catch(e){
         return res.status(401).json({
            success:false,
            message:"token is invalid",
         })
      }
      next();

   }
   catch(e){
      res.status(401).json({
         success:false,
         message:"something went wrong , while verifying the token",
      })
   }
}

exports.isStudent = (req,res,next)=>{
   try{
      if(req.user.role != "student"){
         res.status(401).json({
            success:false,
            message:'This is a protected route for students',
         })
      }
      next();
   }
   catch(error) {
      return res.status(500).json({
          success:false,
          message:'User Role is not matching',
      })
  }
  
}

exports.isAdmin = (req,res,next)=>{
   try{
      if(req.user.role != "admin"){
         res.status(401).json({
            success:false,
            message:'This is a protected route for admin',
         })
      }
      next();
   }
   catch(error) {
      return res.status(500).json({
         success:false,
         message:'User Role is not matching',
      })
  }
  
}