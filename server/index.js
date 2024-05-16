const express = require('express')
const app = express()
const userRouter = require('./src/routes/users')
const mongoose = require('mongoose')
const config = require('./config')
 


mongoose.connect(config.MONGODB_URL)
.then(()=>console.log('연동성공'))
.catch(e => console.log(`연동 실패 ${e}`))

app.use('/users',userRouter)




app.listen(config.PORT,()=>{
    console.log(`this Port is ${config.PORT}`)
})
