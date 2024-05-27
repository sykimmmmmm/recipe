import React, { useEffect, useState } from "react";
import axios from 'axios'
export default function RecipeList(){
    const [recipeList,setRecipeList] = useState()

    const axiosData = async()=>{
        const list = await axios.get('http://localhost:4000/recipes/recipe-list')
        .then(res => res.data.recipe)
        setRecipeList(list)
    }

    useEffect(()=>{
        axiosData()
    },[])
    console.log(recipeList)
    return(
        <>
            {recipeList && recipeList.map((data,id)=>{
                const {author:{name:nickname},category,createdAt,finishedImgs,description,info,recipeTitle,ingredients,lastModifiedAt,name,open,steps,viewership,wishlisted,recommended}=data
                const cookingImgs = data.cookingImgs
                const imagePath = []
                cookingImgs.forEach(v=>imagePath.push(v))
                return(
                    <div key={id}>
                    <h1>타이틀:{recipeTitle}</h1>
                    <p>저자:{nickname}</p>
                    <p>요리명:{name}</p>
                    <p>카테고리:{category}</p>
                    <div>
                        <img src={`http://localhost:4000/${imagePath[0].path}`}/>
                    </div>
                    <p>만든시간:{createdAt}</p>
                    <p>수정시간:{lastModifiedAt}</p>
                    <p>설명:{description}</p>
                    <p>정보:{info}</p>
                    <p>재료:{ingredients}</p>
                    <p>순서:{steps}</p>
                    <p>조회수:{viewership}</p>
                    <p>추천수:{recommended}</p>
                    <p>찜:{wishlisted}</p>
                    <p>완성요리사진:{finishedImgs}</p>
                    </div>
                )
            })}
        </>
    )
}