import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL='http://localhost:4000'
axios.defaults.withCredentials=true

export default function Login(){
    const navigate = useNavigate()
    const [loginData,setLoginData] = useState()
    const inputLogin = (e)=>{
        const { name, value } = e.target 
        setLoginData({...loginData,[name]:value})
    }
    const login = async() =>{
        const {userId, password} = loginData
        axios.post('/users/login',{userId,password})
        .then(res=> {
            const {code,token} =res.data
            console.log(res.data)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            if(code === 200){
                alert('로그인되었습니다')
                sessionStorage.setItem('iL',true)
                navigate('/')
            }
        })
        .catch(e=>{
            const {data:{message}} = e.response
            alert(message)
        })
        // const loginUser = await fetch('http://localhost:4000/users/login',{
        //     headers:{
        //         'Content-Type':'application/json',
        //     },
        //     method:'POST',
        //     body: JSON.stringify({userId,password})
        // }).then(res=> res.json())
        // if(loginUser.code === 401){
        //     alert(loginUser.message)
        // }else{
        //     sessionStorage.setItem('UID',btoa(JSON.stringify(loginUser.token)))
        //     navigate('/')
        // }
        // console.log(loginUser)
    }

    return(
        <div>
            <form>
                <label>
                    아이디:
                    <input type={'text'} placeholder='아이디를 입력하세요' name='userId' onChange={inputLogin}></input>
                </label>
                <label>
                    비밀번호:
                    <input type={'password'} placeholder='비밀번호를 입력하세요' name='password' onChange={inputLogin}></input>
                </label>
            </form>
                <button type="submit" onClick={login} >로그인</button>
        </div>
    )
}