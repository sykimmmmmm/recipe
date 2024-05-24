const mongoose = require('mongoose')
const {Schema} = mongoose

const imageSchema = new Schema({
    path: {
        type:String,
        required:true
    }
})

const Image = mongoose.model('Image',imageSchema)
module.exports = Image
