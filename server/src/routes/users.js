const express = require('express')
const User = require('../models/User')
const expressAsyncHandler = require('express-async-handler')
const { generateToken, isAuth, isAdmin } = require('../../auth')
const Counter = require('../models/Counter')
const router = express.Router()


/* 회원가입 */
router.post('/register',expressAsyncHandler(async(req,res,next)=>{
    const user = await User.findOne({$or:[{email:req.body.email},{userId:req.body.userId}]})
    if(user){
        res.status(409).json({code:409,msg:'이미 있는 사용자입니다'})
    }else{
        await Counter.findOne({name:'counter'}).exec()
        .then(counter=> {
            let count = counter.userId
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                userId: req.body.userId,
                password: req.body.password,
                order:count    
            }).save()
            .catch(e=>res.status(400).json({code:400, msg:'정보가 없습니다'}))
            .then((user)=>{
                Counter.updateOne({name:'counter'},{$inc:{userId:1}})
                .then(()=>{
                    res.json({code:200,msg:'회원님의 가입을 환영합니다',user})
                })
                // .catch((e)=>{
                //     res.status(400).json({code:400,msg:'정보가 없습니다'})
                // })
            })
        })
    }
}))

/* 로그인 */
router.post('/login',expressAsyncHandler( async(req,res,next)=>{
    const loginUser = await User.findOne({
        userId: req.body.userId,
        password: req.body.password
    })
    if(!loginUser){
        res.status(401).json({
            code:401, message:'Invalid Email or Password'
        })
    }else{
        const { name, userId, isAdmin, createdAt } = loginUser
        res.json({
            code:200,
            token: generateToken(loginUser),
            name,userId,isAdmin,createdAt
        })
    }
}))

module.exports = router