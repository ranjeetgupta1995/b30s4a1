const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRouter = express();

userRouter.post("/register", (req, res) => {
    const {username, email, pass, age} = req.body;
    try{
        bcrypt.hash(pass, 5, async(err, hash) => {
            if(err){
                res.status(200).send({"error": "password can not be hashed"})
            } else {
                const newUser = new UserModel({
                    username,
                    email,
                    pass: hash,
                    age
                })
                await newUser.save()
                res.status(200).send({"msg": "A new user has been registered", "new user": newUser})
            }
        });
    } catch(err) {
        res.status(400).send({"error": err})
    }
})

userRouter.post("/login", async(req, res) => {
    const {email, pass} = req.body
    try{
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass, user.pass, (err, result) => {
                if(result){
                    const token = jwt.sign({username: user.username, userID: user._id}, "masai")
                    res.status(200).send({"msg": "Login Successful!", "Token": token})
                }else{
                    res.status(200).send({"msg": "wrong credentials"})
                }
            });
        } else {
            res.status(200).send({"msg": "User does not exists with this email!"})
        }
    } catch(err) {
        res.status(400).send({"error": err})
    }
})

module.exports = {
    userRouter
}