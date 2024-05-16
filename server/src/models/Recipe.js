const mongoose = require('mongoose')
const { Schema } = mongoose
const { Types: { ObjectId, Mixed}} = Schema

const recipeSchema = new Schema({
    category: {
        type: Mixed,
        required: true
    },
    name:{
        type: String,
        required: true,
        trim:true
    },
    description:{
        type: String,
        required: true
    },
    videoLink:{
        type: String,
        default: false,
        trim:true
    },
    author:{
        type: ObjectId,
        ref: "User"
    },
    info:{
        type: Mixed,
        required: true
    },
    ingredients:{
        type: Mixed,
        required: true
    },
    steps:{
        type: Mixed,
    },
    tip: {
        type:String,
        trim:true
    },
    tag:{
        type: String,
        trim:true
    },
    cookingImgs:[],
    finishedImgs:[],
    open:{
        type: Boolean,
        default : false,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    lastModifiedAt:{
        type: Date,
        default: Date.now
    },
    rating:{
        type:ObjectId,
        ref:'Review'
    }
})

const Recipe = mongoose.model('Recipe',recipeSchema)
module.exports = Recipe 