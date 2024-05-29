import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'
export default function RecipeList(){
    const [recipeList,setRecipeList] = useState()

    const axiosData = async()=>{
        const list = await axios.get('http://localhost:4000/recipes/recipe-list')
        .then(res => res.data.recipe)
        console.log(list)
        setRecipeList(list)
    }

    useEffect(()=>{
        axiosData()
    },[])
    return(
        <>
            {recipeList && recipeList.map((data,id)=>{
                const {author:{name:nickname},category,createdAt,finishedImgs,description,info,recipeTitle,ingredients,lastModifiedAt,name,open,viewership,wishlisted,recommended}=data
                const steps = data.steps
                const cookingImgs = data.cookingImgs
                if(open){
                    return(
                        <Link to={`/recipe/${data._id}`} key={id}>
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
                                                    return <img key={idx2} src={`http://localhost:4000/${image.path}`} style={{width:'300px',height:'300px'}}></img>
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
                                    return <img key={id} src={`http://localhost:4000/${image.path}`} style={{width:'300px',height:'300px'}}></img>
                                })}</p>
                        </Link>
                    )
                }
            })}
        </>
    )
}