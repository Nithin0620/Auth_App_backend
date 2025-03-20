const express = require('express');
const router = express.Router(); 

const {signup} = require("../controllers/authController");


router.post("/signup",signup);
router.post("/signup", signup);

router.get("/",(req,res)=>{
   res.send(`<h1>Homepage</h1>`)
});

module.exports = router;