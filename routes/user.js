//Routing in Express , The Express Router!
const { Router } = require("express");

const { userModel, purchaseModel, courseModel } = require("../db");  //Data import here!

const jwt = require("jsonwebtoken"); 
const  { JWT_USER_PASSWORD } = require("../config");  //here we import the JWT_PASSWORD file
const { userMiddleware } = require("../middleware/user");


const userRouter = Router();   //creating an instance of router class


userRouter.post("/signup", async function(req, res) {    //routes 
    const { email, password, firstName, lastName } = req.body; // TODO: adding zod validation
    // TODO: hash the password so plaintext pw is not stored in the DB

    // TODO: Put inside a try catch block
    await userModel.create({  //inserting data into Database!
        email: email,
        password: password,
        firstName: firstName, 
        lastName: lastName
    })
    
    res.json({
        message: "Signup succeeded"
    })
})

userRouter.post("/signin",async function(req, res) {
    const { email, password } = req.body;

    // TODO: ideally password should be hashed, and hence you cant compare the user provided password and the database password
    const user = await userModel.find({
        email: email,
        password: password
    }); //[]

    if (user) {
        const token = jwt.sign({
            id: user._id,
        }, JWT_USER_PASSWORD);

        // Do cookie logic

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})


//here user sends a get req...getting the purchases courses!
userRouter.get("/purchases", userMiddleware, async function(req, res) {   //purchases course req..shows the purchases courses to the user!!
    const userId = req.userId;

    const purchases = await purchaseModel.findOne({   //here if we write find then returns you an array!
        userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
})

module.exports = {    //Here we exports the instance of router class!
    userRouter: userRouter
}