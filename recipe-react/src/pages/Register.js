import React, { useEffect,useState } from "react";

export default function Register(){

    const [loginData,setLoginData] = useState()

    const fetchRegister = async(email,name,userId,password,confirmPassword)=>{
        const register = await fetch('http://localhost:4000/users/register',{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body:JSON.stringify({email,name,userId,password,confirmPassword})
        }).then(res => res.json())
        // console.log(register)
    }

    useEffect(()=>{
        // fetchRegister()
    },[])
    const register = ()=>{
        console.log(loginData)
    }


    return(
        <div>
            <form>
                <input type="text" name="name" placeholder="닉네임 입력하세요"></input>
                <input type="text" name="email" placeholder="email 입력하세요"></input>
                <input type="text" name="userId" placeholder="아이디 입력하세요"></input>
                <input type="password" name="password" placeholder="패스워드 입력하세요"></input>
                <input type="password" name="confirmPassword" placeholder="패스워드 입력하세요"></input>
                <button type='submit' formMethod="POST" onClick={register}>회원가입</button>
            </form>
        </div>
    )
}