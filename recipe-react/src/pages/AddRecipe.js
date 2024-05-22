import React,{useEffect, useRef, useState} from 'react';
import './styles/AddRecipe.css'
const people = ['1인분','2인분','3인분','4인분','5인분','6인분 이상']
const time = ['5분 이내','10분 이내','15분 이내','20분 이내','30분 이내','60분 이내','90분 이내','2시간 이내','2시간 이상']
const difficult = ['누구나 가능','쉬움','보통','어려움','매우 어려움']
const type = ['밑반찬','메인반찬','국/탕','찌개','디저트','면/만두','밥/죽/떡','퓨전','김치/젓갈/장류','양념/소스/잼','양식','샐러드','스프','빵','과자','차/음료/술','기타']
const situation = ['일상','초스피드','손님접대','술안주','다이어트','도시락','영양식','간식','야식','푸드스타일링','해장','명절','이유식','기타']
const process = ['볶음','끓이기','부침','조림','무침','비빔','찜','절임','튀김','삶기','굽기','데치기','회','기타']
const material = ['소고기','돼지고기','닭고기','육류','채소류','해물류','달걀/유제품','가공식품류','쌀','밀가루','건어물류','버섯류','과일류','콩/견과류','곡류','기타']

export default function AddRecipe(){
    const [recipeData,setRecipeData] = useState({'recipeTitle':'','name':'','description':'','people':'','time':'','difficult':'','ingredients0':'','steps':'','type':'','situation':'','process':'','material':''})
    const [ingredient,setIngredient] = useState([])
    const recipeRef = useRef({'recipeTitle':'','name':'','description':'','people':'','time':'','difficult':'','steps':'','type':'','situation':'','process':'','material':''})
    const testRef = useRef([])
    const [test,setTest] = useState([])
    const [cnt,setCnt] = useState(1)
    const inputRecipe = (e)=>{
        let {name, value} = e.target
        recipeRef.current = {...recipeRef.current,[name]:value}
    }
    
    const addingredient=(e)=>{
        e.stopPropagation()
        console.log(e.target)
        setCnt(cnt+1)
        setIngredient([...ingredient,cnt])
    }
    console.log(ingredient)
    const deleteIng = (e)=>{
        e.stopPropagation()
        testRef.current = testRef.current.filter((el,idx)=>{
            return idx !== +e.target.id
        })
        console.log(testRef.current.length)
        // setIngredient(testRef.current)
        // console.log(testRef.current)
        
        // let id = +e.target.id
        // let a = ingredient.copyWithin(id,id+1)
        // a.pop()
        setIngredient(ingredient.filter((_,id)=>{
            return id !== +e.target.id
        }))
    }

    const createRecipe = async(e)=>{
        e.stopPropagation()
        // console.log(recipeRef.current)
        const keys = Object.keys(recipeRef.current)
        let ingValue2 = []
        ingredient.forEach((_,id)=>{
            let ingValue = []
            keys.forEach(key =>{
                if(key.includes(id)){
                    ingValue.push(recipeRef.current[key])
                }
            })
            ingValue2.push(ingValue)
        })
        console.log(ingValue2)
        const obj = {}
        let a = ingValue2.map((value,id)=>{
            console.log(value)
            if(value.length === 3 && !value.includes('')){
                obj[`ingredients${id}`] = value.join('')
            }else{
                obj[`ingredients${id}`] = undefined
            }
        })
        console.log(obj)
        console.log(Object.values(obj).includes('undefined'))
        if(validateValue(obj)&&validateValue(recipeRef.current)){
            console.log('dd')
            const {recipeTitle,name,description,people,time,difficult,steps,type,situation,process,material} = recipeRef.current
            if(e.target.name === 'save'){
                setRecipeData({recipeTitle,name,description,people,time,difficult,steps,type,situation,process,material,open:false,...obj})
            }else if(e.target.name === 'upload'){
                setRecipeData({recipeTitle,name,description,people,time,difficult,steps,type,situation,process,material,open:true,...obj})
            }
        }else{
            return alert('빠진 항목이있습니다')
        }
    }

    useEffect(()=>{
        const recipeSave = async()=>{
            const token = JSON.parse(sessionStorage.getItem('UID'))
            const {recipeTitle,name,description,people,time,difficult,steps,type,situation,process,material,open,...rest} = recipeData
            const newRecipe = await fetch('http://localhost:4000/recipes/add-recipe',{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                method:'POST',
                body:JSON.stringify({
                    recipeTitle,name,description,info:[people,time,difficult],ingredients:rest,steps,category:[type,situation,process,material],open
                })
            }).then(res=>res.json())
            if(newRecipe.code === 400){
                alert(newRecipe.message)
            }else{
                alert(newRecipe.message)
                console.log(newRecipe)
            }
        }
        // recipeSave()
    },[recipeData])

    console.log(testRef)

    return(
        <>
            <form onChange={inputRecipe}>
                <label>
                    레시피제목:
                    <input type={'text'} placeholder='레시피제목을 입력하세요' name='recipeTitle' defaultValue={''}/>
                </label>
                <label>
                    요리명:
                    <input type={'text'} placeholder='요리이름을 입력하세요' name='name' defaultValue={''}/>
                </label>
                <label>
                    요리설명:
                    <input type={'text'} placeholder='간단한 요리설명을 입력하세요' name='description' defaultValue={''}/>
                </label>
                <div>
                    요리정보:
                    <label>
                        인원
                        <select defaultValue={''} name='people' >
                            <option value=''>인원</option>
                            {people.map((p,id)=>{
                                return <option key={id} value={p}>{p}</option>
                            })}
                        </select>
                    </label>
                    <label>
                        시간
                        <select defaultValue={''} name='time'>
                            <option value=''>시간</option>
                            {time.map((t,id)=>{
                                return <option key={id} value={t}>{t}</option>
                            })}
                        </select>
                    </label>
                    <label>
                         난이도
                        <select defaultValue={''} name='difficult'>
                            <option value={''}>난이도</option>
                            {difficult.map((diff,id)=>{
                                return <option key={id} value={diff}>{diff}</option>
                            })}
                        </select>
                    </label>
                </div>
                <div className='ingredients'>
                    <div>
                        <label>
                            재료:
                            <input type={'text'} placeholder='재료이름' name={`ingredient0`} defaultValue={''}/>
                            <input type={'text'} placeholder='재료 수량' name={`quantity0`} defaultValue={''}/>
                            <input type={'text'} placeholder='단위(g/그램)' name={`unit0`} defaultValue={''}/>
                        </label>
                    </div>
                    {ingredient.length>0 && ingredient.map((_,id)=>{
                        return(
                            <div key={id+1} id={`zz${id+1}`} ref={el=>testRef.current[id+1]=el}>
                                <label>
                                    재료:
                                    <input type={'text'} placeholder='재료이름' name={`ingredient${id+1}`} defaultValue={''}/>
                                    <input type={'text'} placeholder='재료 수량' name={`quantity${id+1}`} defaultValue={''}/>
                                    <input type={'text'} placeholder='단위(g/그램)' name={`unit${id+1}`} defaultValue={''}/>
                                </label>
                                <div className='btn' onClick={deleteIng} id={id+1}>삭제</div>
                            </div>
                        )
                    })}
                    <div className='btn' onClick={addingredient}>재료 추가</div>
                </div>
                <div>
                    <label>
                        스텝:
                        <input type={'text'} placeholder='조리법을 입력하세요' name='steps' defaultValue={''}/>
                    </label>
                </div>
                <div>
                    <label>
                        종류별:
                        <select defaultValue={''} name='type'>
                            <option value={''}>종류별</option>
                            {type.map((ty,id)=>{
                                return <option value={ty} key={id}>{ty}</option>
                            })}
                        </select>    
                    </label>    
                    <label>
                        상황별:
                        <select defaultValue={''} name='situation'>
                            <option value={''}>상황별</option>   
                            {situation.map((sit,id)=>{
                                return <option value={sit} key={id}>{sit}</option>
                            })}
                        </select>    
                    </label>    
                    <label>
                        방법별:
                        <select defaultValue={''} name='process'>
                            <option value={''}>방법별</option>   
                            {process.map((pro,id)=>{
                                return <option value={pro} key={id}>{pro}</option>
                            })}
                        </select>    
                    </label>    
                    <label>
                        재료별:
                        <select defaultValue={''} name='material'>
                            <option value={''}>재료별</option>   
                            {material.map((mat,id)=>{
                                return <option value={mat} key={id}>{mat}</option>
                            })}
                        </select>    
                    </label>    
                </div>  
            </form>
            <button name='save' onClick={createRecipe}>레시피 저장</button>
            <button name='upload' onClick={createRecipe}>레시피 공유</button>
        </>
    )
}

const validateValue = (obj)=>{
    return Object.values(obj).includes('undefined')||Object.values(obj).includes('')
}