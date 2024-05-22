import React, { useState,useRef, useEffect } from "react";

export default function TestAdd(){

    const [mapping,setMapping] = useState([])
    const [inputValue, setInputValue] = useState({})
    const inputRef = useRef({})
    const addingredient = () =>{
        const newId = mapping.length ? mapping[mapping.length-1].id + 1 : 1
        setMapping([...mapping,{id:newId}])
        // inputRef.current=
        // setInputValue(values => ({
        //     ...values,
        //     [newId]: { ingredient: '', quantity: '', unit: '' },
        // }))
        Object.values(inputRef.current).length>0 ?
        setInputValue(values => ({
            ...inputRef.current,
            [newId]: { ingredient: '', quantity: '', unit: '' },
        })):
        setInputValue(values => ({
            ...values,
            [newId]: { ingredient: '', quantity: '', unit: '' },
        }))
    }

    useEffect(()=>{
        inputRef.current = {
            ...inputValue, ...inputRef.current
        }
    })
    // console.table(mapping)
    // console.table(inputValue)
    const pleaseDeleteMe = (id) =>{
        setMapping(mapping.filter(mapping=>{
            return mapping.id !== id
        }))
        setInputValue(values => {
            // const newValues = { ...values }
            const newValues = { ...inputRef.current }
            delete newValues[id]
            return newValues
          })
    }

    const handleInputChange = (id, field, value) => {
        // console.log(inputValue[id])
        inputRef.current=({...inputRef.current,[id]: (inputRef.current[id]?{...inputRef.current[id],[field]: value}:{[field]:value})})
        // setInputValue(values => ({
        //   ...values,[id]: {...values[id],[field]: value}
        // }))
    }
    
      
    const Addingredient = ({id}) =>{
        return (
        <div>
            <label >
                재료:
                <input type={'text'} placeholder='재료이름' name={`ingredient${id}`} defaultValue={inputValue[id]?inputValue[id].ingredient:''}  
                onChange={(e) => handleInputChange(id, 'ingredient', e.target.value)}/>
                <input type={'text'} placeholder='재료 수량' name={`quantity${id}`} defaultValue={inputValue[id]?inputValue[id].quantity:''}
                onChange={(e) => handleInputChange(id, 'quantity', e.target.value)}/> 
                <input type={'text'} placeholder='단위(g/그램)' name={`unit${id}`} defaultValue={inputValue[id]?inputValue[id].unit:''}
                onChange={(e) => handleInputChange(id, 'unit', e.target.value)}/>
            </label>
            <button onClick={()=>pleaseDeleteMe(id)}>삭제</button>
        </div>
        )
    }
    
    return(
        <div className='ingredients'>
                    <div>
                        <label>
                            재료:
                            <input type={'text'} placeholder='재료이름' name={`ingredient0`}/>
                            <input type={'text'} placeholder='재료 수량' name={`quantity0`}/>
                            <input type={'text'} placeholder='단위(g/그램)' name={`unit0`}/>
                        </label>
                    </div>
                    {mapping.length>0 && mapping.map((value)=>{
                        return <Addingredient id={value.id} key={value.id}/>
                    })}

                    
                    <div className='btn' onClick={addingredient}>재료 추가</div>
                </div>
    )


}