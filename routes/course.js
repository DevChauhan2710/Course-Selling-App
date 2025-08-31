//Here for purchase course...payment is introduced ..but in this project we only do the some endpoint direct buying courses

const { Router } = require("express");
const { userMiddleware } = require("../middleware/user");

const { purchaseModel, courseModel } = require("../db")  //Course data is imported here!!
 
const courseRouter = Router();

//Here for purchase course...payment is introduced ..but in this project we only do the some endpoint direct buying courses
//In real word the payment system is introduced but it's too complexe to learn that's why we creating simple project for now!!
courseRouter.post("/purchase", userMiddleware, async function(req, res) {   //here user want to purchase the course! by post req.!
    const userId = req.userId;
    const courseId = req.body.courseId;

    // should check that the user has actually paid the price
    await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message: "You have successfully bought the course"
    })
})
//Here at req of client ...we don't need to write ("/course/preview")..it's already writen in index.js file (at one time for all requestes)
courseRouter.get("/preview", async function(req, res) {      //here we get the all the courses (not only purchased but all courses are previwed!)
    
    const courses = await courseModel.find({});   

    res.json({
        courses
    })
})

module.exports = {
    courseRouter: courseRouter
}