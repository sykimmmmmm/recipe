import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useLocation } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
import { MdOutlineRecommend } from "react-icons/md";
import './styles/Recipe.css'
export default function Recipe(){
    const [recipeData,setRecipeData] = useState()
    const location = useLocation()
    const axiosData = async()=>{
        const id = location.pathname.slice(8,location.pathname.length)
        const viewership = await axios.get(`http://localhost:4000/recipes/${id}`)
        .then(res => res.data.recipe)
        .catch(e=>console.log(e.response))
        setRecipeData(viewership)
    }
    useEffect(()=>{
        axiosData()
    },[])
    if(recipeData){
        const {author:{name:nickname},category,finishedImgs,description,info,recipeTitle,ingredients,name,viewership,wishlisted,recommended}=recipeData
        const steps = recipeData.steps
        const cookingImgs = recipeData.cookingImgs
        return(
            <div className="recipe-wrapper">
                <div className='recipe-header'>
                    <div className="recipe-thumbnailBox">
                        <img src={`http://localhost:4000/${finishedImgs[0].path}`} alt=''/>
                        <div>
                            <div><GrFormView/>{viewership}</div>
                            <div><MdOutlineRecommend/>{recommended}</div>
                        </div>
                    </div>
                    <div className="recipe-info">
                        <h1>타이틀:{recipeTitle}</h1>
                        <p>저자:{nickname}</p>
                        <p>카테고리:{category}</p>
                        <p>설명:{description}</p>
                        <p>정보:{info}</p>
                        <p>찜수:{wishlisted}</p>
                    </div>
                </div>
                <div className="recipe-ingredient">
                    <h3>재료</h3>
                    <ul>
                        {ingredients.map((ingredient,idx)=>{
                            return(
                                <li key={idx}>{ingredient}</li>
                            )
                        })}
                    </ul>
                </div>
                <div className="recipe-step">
                    {steps.map((step,i)=>{
                        return(
                        <div className="recipe-steps" key={i}>
                            <div className={`step${i+1}`}>
                                <h3>Step{i+1}</h3>
                                <p>{step}</p>
                            </div>
                            <div className={`imgBox${i+1}`}>
                                {cookingImgs.map((image,idx2)=>{
                                    if(image.order === i){
                                        return <img key={idx2} src={`http://localhost:4000/${image.path}`} alt=''></img>
                                    }else{
                                        return false
                                    }
                                })}
                            </div>
                        </div>
                        )
                    })}
                </div>
                <div>
                    <p>완성된사진</p>
                    <div>
                        {finishedImgs.map((image,id)=>{
                            return <img key={id} src={`http://localhost:4000/${image.path}`} alt=''/>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}