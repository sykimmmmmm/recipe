import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css'
export default function Home(){
    
    return (
        <>
        <h1>home</h1>
        <Link to={'/user/register'}>회원가입</Link>
        <Link to={'/recipe'}>레시피</Link>
        <Link to={'/add-recipe'}>레시피등록</Link>
        <Link to={'/user/mypage'}>마이페이지</Link>
        <Link to={'/'}>홈</Link>
    </>
    )

}