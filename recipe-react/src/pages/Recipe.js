import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useLocation } from "react-router-dom";
import { MdAutoGraph } from "react-icons/md";
import { IoPeople, IoTime } from "react-icons/io5";
import './styles/Recipe.css'
import Review from "../Component/Review";
export default function Recipe(){
    const [recipeData,setRecipeData] = useState()
    const [modalOn,setModalOn] = useState(false)
    const location = useLocation()
    const axiosData = async()=>{
        const id = location.pathname.slice(8,location.pathname.length)
        const viewership = await axios.get(`http://localhost:4000/recipes/${id}`)
        .then(res => res.data.recipe)
        .catch(e=>console.log(e.response))
        setRecipeData(viewership)
    }
    const reviewPopup =()=>{
        setModalOn(!modalOn)
    }
    useEffect(()=>{
        axiosData()
    },[])
    if(recipeData){
        const {author:{name:nickname},finishedImgs,description,info,recipeTitle,ingredients}=recipeData
        const steps = recipeData.steps
        const cookingImgs = recipeData.cookingImgs
        return(
            <>
                <div class="body">
                    <div className="recipe-wrapper">
                        <section className='recipe-header'>
                            {sessionStorage.getItem('I')&&<div className="recipe-review" onClick={reviewPopup}>리뷰 쓰기</div>}
                            <div className="recipe-thumbnailBox">
                                <img src={`http://localhost:4000/${finishedImgs[0].path}`} alt=''/>
                            </div>
                            <div className="recipe-desc">
                                <div className="recipe-user">{nickname}</div>
                                <h2>{recipeTitle}</h2>
                                <p>{description}</p>
                                <div className='recipe-info'>
                                    <div className="recipe-people">
                                        <IoPeople/>
                                        {info[0]}
                                    </div>
                                    <div className="recipe-time">
                                        <IoTime/>
                                        {info[1]}
                                    </div>
                                    <div className="recipe-difficult">
                                        <MdAutoGraph/>
                                        {info[2]}
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="recipe-ingredient">
                            <h3>재료</h3>
                            <ul>
                                {ingredients.map((ingredient,idx)=>{
                                    return(
                                        <li key={idx}>{ingredient}</li>
                                    )
                                })}
                            </ul>
                        </section>
                        <section className="recipe-steps">
                            {steps.map((step,i)=>{
                                return(
                                <div className={`recipe-step${i+1}`} key={i}>
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
                        </section>
                        <section className="recipe-finish">
                            <h3>완성된사진</h3>
                            <div>
                                {finishedImgs.map((image,id)=>{
                                    return (
                                        <div key={id}>
                                            <img src={`http://localhost:4000/${image.path}`} alt=''/>
                                        </div>
                                    )
                                })}
                            </div>
                        </section>
                        <section className="recipe-review">
                        </section>
                    </div>
                </div>
                <div className="modal">
                    <Review/>
                </div>
            </>
        )
    }
}