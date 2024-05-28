const express = require('express')
const Recipe = require('../models/Recipe')
const Image = require('../models/Image')
const expressAsyncHandler = require('express-async-handler')
const {isAuth, isAdmin } = require('../../auth')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const upload = multer({
    storage: multer.diskStorage({
        destination: function( req, file, cb){
            cb(null,'public/uploads/')
        },
        filename: function(req, file, cb){
            const ext = path.extname(file.originalname)
            const filename = path.basename(btoa(file.originalname),ext)+'_'+ Date.now() + ext
            cb(null, filename)
        },
        fileFilter: function(req,file,cb){
            const typeArray = file.mimetype.split('/')
            const fileType = typeArray[0]

            if(fileType === 'image'){
                req.fileValidationError = null
                cb(null,true)
            }else{
                req.fileValidationError = 'jpg,png,jpeg,gif,webp등 이미지파일만 업로드가능합니다'
                cb(null,false)
            }
        }

    })
})
// 서버에 이미지 저장
router.post('/upload', isAuth,upload.fields([{name:'recipeImage'},{name:'id'}]), expressAsyncHandler( async (req,res,next)=>{
    const recipeImages = req.files.recipeImage
    const orders = req.body.id
    const neworders = orders.filter(a=>a!=='undefined')
    const images = await Promise.allSettled(recipeImages.map((file,id)=>{
        const image = new Image({
            path: file.path.slice(7,file.path.length),
            order: neworders[id]
        })
        const newImage = image.save()
        return newImage
    }))
    res.json({code:200 , images})
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

router.get('/recipe-list',expressAsyncHandler(async (req,res,next)=>{
    const recipe = await Recipe.find().populate('cookingImgs',['-_id','path','order']).populate('author','-_id').populate('finishedImgs','-_id').populate('rating','-_id')
    res.json({code:200, msg:'데이터를 불러왔습니다', recipe})
}))

module.exports = router