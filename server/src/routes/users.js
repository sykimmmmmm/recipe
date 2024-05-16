const express = require('express')
const User = require('../models/User')
const expressAsyncHandler = require('express-async-handler')
const router = express.Router()


/* 회원가입 */
router.post('/register',expressAsyncHandler(async(req,res,next)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        userId: req.body.userId,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    })
    try{
        const newUser = await user.save()
        res.json({code:200, msg:'회원님의 가입을 환영합니다', newUser})
    }catch(e){
        console.log(e.name)
        res.status(400).json({code:400, msg:'Invalid User data'})
    }
}))


module.exports = router