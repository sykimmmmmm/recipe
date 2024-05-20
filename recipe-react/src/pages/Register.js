import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register(){
    const [loginData,setLoginData] = useState({})
    const [registerData,setRegisterData] = useState()
    const homeRef = useRef()
    const fetchRegister = async(data)=>{
        const {email,name,userId,password,confirmPassword} = data
        const register = await fetch('http://localhost:4000/users/register',{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body:JSON.stringify({email,name,userId,password,confirmPassword})
        }).then(res => res.json())
        alert(register.msg)
        return setRegisterData(register)
    }

    const register = async ()=>{
        await fetchRegister(loginData)
        if(registerData &&registerData.code===200){
            toHome()
        }
    }

    const loginInfo = (e)=>{
        const {name,value} = e.target
        setLoginData({...loginData,[name]:value})
    }
    const toHome = ()=>{
        homeRef.click()
    }
    console.log(registerData)
    return(
        <>
        <div>
            <form className="loginForm">
                <label>
                닉네임:
                    <input type="text" name="name" placeholder="닉네임 입력하세요" onChange={loginInfo}></input>
                </label>
                <label>
                이메일:
                    <input type="text" name="email" placeholder="email 입력하세요" onChange={loginInfo}></input>
                </label>
                <label>
                아이디:
                    <input type="text" name="userId" placeholder="아이디 입력하세요" onChange={loginInfo}></input>
                </label>
                <label>
                비밀번호:
                    <input type="password" name="password" placeholder="패스워드 입력하세요" onChange={loginInfo}></input>
                </label>
                <label>
                비밀번호 확인:
                    <input type="password" name="confirmPassword" placeholder="패스워드 입력하세요" onChange={loginInfo}></input>
                </label>
            </form>
            <button onClick={register}>회원가입</button>
        </div>
        { registerData && registerData.code===200 && <Link to={'/'} ref={homeRef} style={{display:"none"}}>home</Link>}
        </>
    )
}