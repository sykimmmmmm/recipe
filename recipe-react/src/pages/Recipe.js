import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useLocation } from "react-router-dom";

export default function Recipe(){
    const [recipeData,setRecipeData] = useState()
    const location = useLocation()
    const axiosData = async()=>{
        const id = location.pathname.slice(8,location.pathname.length)
        await axios.get(`http://localhost:4000/recipes/${id}`)
        .then(res=>{
            setRecipeData(res.data.recipe)
        })        
    }
    useEffect(()=>{
        axiosData()
    },[])
    console.log(recipeData)
    const {author:{name:nickname},category,createdAt,finishedImgs,description,info,recipeTitle,ingredients,lastModifiedAt,name,viewership,wishlisted,recommended}=recipeData
    const steps = recipeData.steps
    const cookingImgs = recipeData.cookingImgs
    return(
        <>
            <h1>타이틀:{recipeTitle}</h1>
            <p>저자:{nickname}</p>
            <p>요리명:{name}</p>
            <p>카테고리:{category}</p>
            <p>만든시간:{createdAt}</p>
            <p>수정시간:{lastModifiedAt}</p>
            <p>설명:{description}</p>
            <p>정보:{info}</p>
            <div>
                {ingredients.map((ingredient,idx)=>{
                    return(
                        <p key={idx}>재료{idx+1}:{ingredient}</p>
                    )
                })}
            </div>
            <div>
                {steps.map((step,i)=>{
                    return(
                    <div key={i}>
                        <p>조리순서{i+1}:{step}</p>
                        {cookingImgs.map((image,idx2)=>{
                            if(image.order === i){
                                return <img key={idx2} src={`http://localhost:4000/${image.path}`} style={{width:'300px',height:'300px'}} alt=''></img>
                            }
                        })}
                    </div>
                    )
                })}
            </div>
            <p>조회수:{viewership}</p>
            <p>추천수:{recommended}</p>
            <p>찜:{wishlisted}</p>
            <p>완성요리사진:{finishedImgs.map((image,id)=>{
                return <img key={id} src={`http://localhost:4000/${image.path}`} style={{width:'300px',height:'300px'}} alt=''></img>
            })}</p>
        </>
    )
}