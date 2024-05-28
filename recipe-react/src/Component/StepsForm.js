import React, { useState, useEffect, forwardRef, useRef } from "react";

const StepsForm = forwardRef(({changeHandler,url},ref)=>{

    const [stepForm,setStepForm] = useState([])
    const [inputValue, setInputValue] = useState({})
    const [urlLink,setUrlLink] = useState()
    const fileRef = useRef([])
    const addingredient = () =>{
        const newId = stepForm.length ? stepForm[stepForm.length-1].id + 1 : 1
        setStepForm([...stepForm,{id:newId}])
        Object.values(ref.current).length>0 ?
        setInputValue(values => ({
            ...ref.current,
            [newId]: { steps: '', file:''},
        })):
        setInputValue(values => ({
            ...values,
            [newId]: { steps: '',file:'' },
        }))
    }
    useEffect(()=>{
        ref.current = {
            ...inputValue, ...ref.current
        }
        setUrlLink(url)
    },[inputValue,url])

    const pleaseDeleteMe = (id) =>{
        setStepForm(stepForm.filter(form=>{
            return form.id !== id
        }))
        setInputValue(values => {
            // const newValues = { ...values }
            const newValues = { ...ref.current }
            delete newValues[id]
            return newValues
        })
        const deleteRef = (data,id)=>{
            const newvalues = {...data}
            delete newvalues[id]
            return newvalues
        }
        ref.current = deleteRef(ref.current,id)
    }
    const Steps = ({id}) =>{
        return (
        <div>
            <label >
            스텝:
                <textarea cols={50} rows={5} type={'text'} placeholder='조리법을 입력하세요' name={`steps${id}`} defaultValue={ref.current[id]?ref.current[id].steps:''}
                onChange={(e)=> changeHandler(id,'steps',e.target.value)}/>
            </label>
            <input hidden type={'file'} name={`recipeImage${id}`} accept={'image/*'} onChange={(e)=> changeHandler(id,'file',e.target.files[0])} ref={el=>fileRef.current[id]=el}/>
            <div id={id} onClick={(e)=>fileOpen(e,id)}>{urlLink&&urlLink[id] !== undefined ?<img src={urlLink[id].src} alt='이미지 없음'/>:'이미지 첨부'}</div>
        </div>
        )
    }
    const fileOpen = (e,id)=>{
        fileRef.current[id].click()
    }
    return(
        <div className='steps'>
            <div>
                <label>
                    스텝:
                    <textarea cols={50} rows={5} type={'text'} placeholder='조리법을 입력하세요' name={`steps0`} defaultValue={ref.current[0]?ref.current[0].steps:''}
                    onChange={(e)=> changeHandler(0,'steps',e.target.value)} />
                </label>
                <input hidden type={'file'} accept={'image/*'} name='recipeImage0' onChange={(e)=> changeHandler(0,'file',e.target.files[0])} ref={el=>fileRef.current[0]=el}/>
                <div onClick={(e)=>fileOpen(e,'0')}>{urlLink && urlLink[0] !==undefined ?<img src={urlLink[0].src} alt='이미지 없음'/>:'이미지 첨부'}</div>
            </div>
            {stepForm.length>0 && stepForm.map((value)=>{
                return <Steps id={value.id} key={value.id}/>
            })}
            <div className='btn' onClick={addingredient}>재료 추가</div>
        </div>
    )

})

export default StepsForm