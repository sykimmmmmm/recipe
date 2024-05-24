const express = require('express')
const Recipe = require('../models/Recipe')
const Image = require('../models/Image')
const expressAsyncHandler = require('express-async-handler')
const { generateToken, isAuth, isAdmin } = require('../../auth')
const multer = require('multer')
const path = require('path')
const router = express.Router()
const upload = multer({
    storage: multer.diskStorage({
        destination: function( req, file, cb){
            cb(null,'uploads/')
        },
        filename: function(req, file, cb){
            const ext = path.extname(file.originalname)
            const filename = path.basename(btoa(file.originalname),ext)+'_'+ Date.now() + ext
            cb(null, filename)
        }
    })
})
router.post('/upload', upload.single('recipeImage'), expressAsyncHandler( async (req,res,next)=>{
    console.log(req.file)
    const image = new Image({
        path: req.file.path
    })
    try{
        const newImage = await image.save()
        res.json({code:200,newImage})
    }catch(e){
        console.log(e)
        res.status(400).json({code:400,message:'Bad Request'})
    }
}))
router.post('/add-recipe',isAuth,expressAsyncHandler( async (req,res,next)=>{
    const recipe = new Recipe({
        recipeTitle: req.body.recipeTitle,
        name: req.body.name,
        description: req.body.description,
        author: req.user._id,
        info: req.body.info,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        tip: req.body.tip,
        tag: req.body.tag,
        open: req.body.open,
        category: req.body.category,
        cookingImgs: req.body.cookingImgs
    })
    try{
        const newRecipe = await recipe.save()
        res.json({code:200, message:'레시피가 등록되었습니다', newRecipe})
    }catch(e){
        console.log(e.name)
        res.status(400).json({code:400, message:'Invalid Recipe Data'})
    }
}))


module.exports = router