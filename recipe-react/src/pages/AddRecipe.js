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
    const [ingredient,setIngredient] = useState([0])
    const recipeRef = useRef({})
    let [cnt,setCnt] = useState(1)
    const inputRecipe = (e)=>{
        let {name, value} = e.target
        recipeRef.current = {...recipeRef.current,[name]:value}
    }
    
    const addingredient=(e)=>{
        e.stopPropagation()
        setCnt(cnt+1)
        setIngredient([...ingredient,cnt])
    }
    const deleteIng = (e)=>{
        e.stopPropagation()
        let id = +e.target.id
        let a = ingredient.copyWithin(id,id+1)
        a.pop()
        // let a = ingredient.filter((el,idx)=>{
        //     return idx !== +e.target.id
        // })
        setIngredient(a)
    }
    console.log(ingredient)
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
            obj[`ingredients${id}`] = value.join('')
        })
        console.log(obj)
        const {recipeTitle,name,description,people,time,difficult,steps,type,situation,process,material} = recipeRef.current
        if(e.target.name === 'save'){
            setRecipeData({recipeTitle,name,description,people,time,difficult,steps,type,situation,process,material,open:false,...obj})
        }else if(e.target.name === 'upload'){
            setRecipeData({recipeTitle,name,description,people,time,difficult,steps,type,situation,process,material,open:true,...obj})
        }
    }
    console.log(recipeData)

    useEffect(()=>{
        const recipeSave = async()=>{
            let values = Object.values(recipeData)
            if(values.includes('')){
                return alert('빠진 항목이있습니다')
            }
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
        recipeSave()
    },[recipeData])
    // console.log(recipeData)
    // console.log(recipeRef)
    // console.log(btnRef.current[0].name)
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
                    {ingredient.map((_,id)=>{
                        return(
                            <div key={id}>
                                <label>
                                    재료:
                                    <input type={'text'} placeholder='재료이름' name={`ingredient${id}`} defaultValue={''} />
                                    <input type={'text'} placeholder='재료 수량' name={`quantity${id}`} defaultValue={''}/>
                                    <input type={'text'} placeholder='단위(g/그램)' name={`unit${id}`} defaultValue={''}/>
                                </label>
                                <div onClick={deleteIng} id={id}>삭제</div>
                            </div>
                            
                        )
                    })}
                    <div onClick={addingredient}>재료 추가</div>
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