const express = require("express");
const app= express();

require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.use(express.json());

const dbconnect = require("./config/database");
dbconnect();

const user= require("./routes/auth");
app.use("/api/v1",user);

app.listen(PORT,()=>{
   console.log(`App started at ${PORT} successfully ` );
})


