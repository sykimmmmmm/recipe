import React, { useRef } from "react";
import { Link,useSearchParams } from "react-router-dom";

export default function Header(){
    const [searchParams,setSearchParams] = useSearchParams()
    const queryString = useRef()
    const searchQuery = () =>{
        const {name,value} = queryString.current
        setSearchParams({[name]:value})
    }
    const logout=()=>{
        alert('로그아웃했습니다')
        sessionStorage.removeItem('UID')
    }
    return(
        <div>
            <div className="header-logo">
                <Link to={'/'}>
                    <img src="" alt='myrecipe'></img>
                </Link>
            </div>
            <div className='search'>
                <input type='text' name='q' placeholder="검색어를 입력하세요" ref={queryString}/>
                <button onClick={searchQuery}>검색</button>
            </div>
            <div>
                <div>
                    {sessionStorage.getItem('UID') ? 
                    <Link to={'/'} onClick={logout}>로그아웃</Link>:
                    <Link to={'/user/login'}>로그인</Link>
                    }
                </div>
            </div>
        </div>
    )
}