const express = require('express')
const Recipe = require('../models/Recipe')
const expressAsyncHandler = require('express-async-handler')
const { generateToken, isAuth, isAdmin } = require('../../auth')

const router = express.Router()

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
        category: req.body.category
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