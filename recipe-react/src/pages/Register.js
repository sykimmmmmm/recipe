import React, { useState, useRef, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";

export default function Register(){
    const navigation = useNavigate()
    const [loginData,setLoginData] = useState({})
    const [registerData,setRegisterData] = useState()
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
        if(register.code===200){
            return navigation("/")
        }else if(register.code === 400){
            return navigation("/user/login")
        }
        return setRegisterData(register)
    }

    const register = async ()=>{
        await fetchRegister(loginData)
    }

    const loginInfo = (e)=>{
        const {name,value} = e.target
        setLoginData({...loginData,[name]:value})
    }
    useEffect(()=>{
        console.log(registerData)
        if(registerData && registerData.code=== 200){
            return ()=>{redirect('/',200)}
        }else if(registerData && registerData.code === 400){
            console.log('aa')
            redirect('/user/login',400)
            return ()=>{redirect('/user/login',400)}
        }
    },[registerData])
    // console.log(registerData)
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
        </>
    )
}