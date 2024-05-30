const express = require("express")

const bcrypt = require('bcrypt')

const UserModal = require("../models/UserData")

const router = express.Router()
const jwt = require("jsonwebtoken")

router.post("/signup", async(req, res) =>{
    const {userName, email, password, confirmPassword} = req.body;
    const user = await UserModal.findOne({email})
    if(user){
        return res.send("The User is already Exists")
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const hashConfirmPassword = await bcrypt.hash(confirmPassword, 10)

    const newUser = new UserModal({
        userName, email, password: hashPassword, confirmPassword: hashConfirmPassword
    })
    await newUser.save();
    return res.json({
        status: 200,
        message: "Record Registered"
    })

});

router.post("/signin", async (req, res)=>{
    const {email, password} = req.body
    const user = await UserModal.findOne({email})
    if(!user){
        return res.json({message: "user not registered"})
    }
    if(!user.password){
        return res.json({message: "Password not found"})
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword){
        return res.json({message: "password is incorrect"})
    }
    const token = jwt.sign({userName: user.userName}, process.env.KEY, {
        expiresIn: '1h'
    })
    res.cookie("token", token, {httpOnly: true, maxAge: 360000})
    res.json({status: true, message: "Login Successful"})
})

module.exports = router