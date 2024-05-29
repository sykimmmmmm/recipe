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
    return(
        <>recipe</>
    )
}