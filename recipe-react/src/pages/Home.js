import React from 'react';
import { Link } from 'react-router-dom';
import RecipeList from '../Component/RecipeList';
import './styles/Home.css'
export default function Home(){
    return (
        <>
            <Link to={'/recipe'}>레시피</Link>
            <Link to={'/add-recipe'}>레시피등록</Link>
            <RecipeList/>
        </>
    )
}