import React, { useRef } from "react";
import { Link,useSearchParams } from "react-router-dom";

export default function Header(){
    const [searchParams,setSearchParams] = useSearchParams()
    const queryString = useRef()
    const searchQuery = () =>{
        const {name,value} = queryString.current
        setSearchParams({[name]:value})
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
                    <Link to={'user/login'}>로그인</Link>
                </div>
            </div>
        </div>
    )
}