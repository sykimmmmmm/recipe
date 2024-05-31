import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'
import './styles/RecipeList.css'
export default function RecipeList(){
    const [recipeList,setRecipeList] = useState([])
    const [error,setError] = useState()
    const axiosData = async()=>{
        await axios.get('http://localhost:4000/recipes/recipe-list')
        .then(res =>setRecipeList(res.data.recipe))
        .catch(err=>setError(err.response.data.message))
    }

    useEffect(()=>{
        axiosData()
    },[])
    console.log(recipeList)
    console.log(error)
    return(
        <div className="recipe-wrap">
            {recipeList.length>0 && recipeList.map((data,id)=>{
                const {author:{name:nickname},finishedImgs,recipeTitle,open,viewership,recommended}=data
                    return(
                        <Link to={`/recipe/${data.recipeId}`} key={id}>
                            <div className="recipe-box">
                                <div className="imgBox">
                                   {finishedImgs.length>0 ? 
                                   <img src={`http://localhost:4000/${finishedImgs[0].path}`} alt=''/>:
                                   <img src={'/images/noImgs/no_image.gif'} alt=''/>} 
                                </div>
                                <div className="recipe-info">
                                    <p>{recipeTitle}</p>
                                    <p>{nickname}</p>
                                </div>
                                <div className="recipe-view">
                                    <span>조회수:{viewership}</span>
                                    <span>추천수:{recommended}</span>
                                </div>
                            </div>
                        </Link>
                    )}
                )
            }
            {error && <div>{error}</div>}
        </div>
    )
}