import React, { useEffect, useState } from "react";
import {Link, useSearchParams} from 'react-router-dom'
import axios from 'axios'
import './styles/RecipeList.css'
import Categories from "./Categories";
export default function RecipeList(){
    const [recipeList,setRecipeList] = useState([])
    const [filter,setFilter] = useSearchParams()
    const axiosData = async(filter)=>{
        if(filter.size !== 0){
            await axios.get(`http://localhost:4000/recipes/recipe-list?${filter}`)
            .then(res =>{
                setRecipeList(res.data)
            })
            .catch(err=>{
                setRecipeList(err)
            })
        }else{
            await axios.get('http://localhost:4000/recipes/recipe-list')
            .then(res =>{
                setRecipeList(res.data)
            })
            .catch(err=>{
                setRecipeList(err)
            })
        }
    }
    useEffect(()=>{
        axiosData(filter)

    },[filter])
    return(
        <>
            <Categories setFilterData={setFilter}/>
            <div className="recipe-wrap">
                {recipeList && recipeList.length>0 && recipeList.map((data,id)=>{
                    const {author:{name:nickname},finishedImgs,recipeTitle,viewership,recommended}=data
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
                {recipeList.length===0 && <div>공개중인 레시피가 없습니다</div>}
            </div>
        </>
    )
}