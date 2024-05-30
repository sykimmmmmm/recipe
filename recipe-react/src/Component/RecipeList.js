import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'
import './styles/RecipeList.css'
export default function RecipeList(){
    const [recipeList,setRecipeList] = useState()

    const axiosData = async()=>{
        const list = await axios.get('http://localhost:4000/recipes/recipe-list')
        .then(res => res.data.recipe)
        setRecipeList(list)
    }
    const viewershipIncrease= async(id)=>{
        await axios.post(`http://localhost:4000/recipes/recipe-list/${id}`)
        .then(res=> console.log(res.data))
    }

    useEffect(()=>{
        axiosData()
    },[])
    
    return(
        <div className="recipe-wrap">
            {recipeList && recipeList.map((data,id)=>{
                const {author:{name:nickname},finishedImgs,recipeTitle,open,viewership,recommended}=data
                if(open){
                    return(
                        <Link to={`/recipe/${data._id}`} key={id} onClick={()=>viewershipIncrease(data._id)}>
                            <div className="recipe-box">
                                <div className="imgBox">
                                    <img src={`http://localhost:4000/${finishedImgs[0].path}`} alt=''/>
                                </div>
                                <div className="recipe-info">
                                    <h4>{recipeTitle}</h4>
                                    <p>{nickname}</p>
                                </div>
                                <div className="recipe-view">
                                    <span>조회수:{viewership}</span>
                                    <span>추천수:{recommended}</span>
                                </div>
                            </div>
                        </Link>
                    )
                }
            })}
        </div>
    )
}