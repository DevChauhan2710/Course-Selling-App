require('dotenv').config()  //Here we import the dotenv library (file)
// console.log(process.env.MONGO_URL)
const express = require("express");
const mongoose = require("mongoose");



//Here we import the routers!
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");


const app = express();   //create an instance of http server! 
app.use(express.json());  //middleware for req.body


//Here we use the routers! 
//here v1 is may stands for version!!
app.use("/api/v1/user", userRouter);  //By this syntax we dont't specifies the individual /user at req. time(in userRouter)...it's specifies here only one time here!
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);  //if the changes occurs like ("/api/v2...") then only here we need to change 
//not individauly in every req of client!

async function main() {
    await mongoose.connect(process.env.MONGO_URL)   //It's main function...which is always execute first!
    //so first program will connect to the MongoDb ! 
    //after this correct connection!! app listening on port 3501!!!
    app.listen(3501);
    console.log("Database Is Connected Successfully!");
}

main()
