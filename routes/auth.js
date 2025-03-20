const express = require('express');
const router = express.Router(); 

const {signup,login} = require("../controllers/authController");
const {auth,isStudent,isAdmin} = require("../middlewares/auth")


router.post("/signup",signup);
router.post("/login", login);



router.get("/test",auth,(req,res)=>{
   res.json({
      success:true,
      message:"welcome to protected route for testing"
   })
})

router.get("/student",auth,isStudent,(req,res)=>{
   res.json({
      success:true,
      message:'Welcome to the Protected route  for Students',
   })
})

router.get("/admin",auth,isAdmin,(req,res)=>{
   res.json({
      success:true,
      message:'Welcome to the Protected route for Admin',
   })
})


router.get("/",(req,res)=>{
   res.send(`<h1>Homepage</h1>`)
});

module.exports = router;