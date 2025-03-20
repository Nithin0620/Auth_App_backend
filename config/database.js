const mongoose= require("mongoose");
require("dotenv").config();

const dbConnect = async()=>{
   try{
      mongoose.connect(process.env.DATABASE_URL,{
         // useNewUrlParser:true,
         // useUnifiedTopology:true
      })
      .then(()=>{console.log("Database connected")})
      .catch((err)=>console.log(err));
   }
   catch(e){
      console.log(e);
      console.error("Database connection failed");
      process.exit(1);
   }
}

module.exports = dbConnect;