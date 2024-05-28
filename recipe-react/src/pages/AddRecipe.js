import React,{useEffect, useRef, useState} from 'react';
import IngredientForm from '../Component/IngredientForm';
import axios from 'axios'
import './styles/AddRecipe.css'
import StepsForm from '../Component/StepsForm';
const people = ['1인분','2인분','3인분','4인분','5인분','6인분 이상']
const time = ['5분 이내','10분 이내','15분 이내','20분 이내','30분 이내','60분 이내','90분 이내','2시간 이내','2시간 이상']
const difficult = ['누구나 가능','쉬움','보통','어려움','매우 어려움']
const type = ['밑반찬','메인반찬','국/탕','찌개','디저트','면/만두','밥/죽/떡','퓨전','김치/젓갈/장류','양념/소스/잼','양식','샐러드','스프','빵','과자','차/음료/술','기타']
const situation = ['일상','초스피드','손님접대','술안주','다이어트','도시락','영양식','간식','야식','푸드스타일링','해장','명절','이유식','기타']
const process = ['볶음','끓이기','부침','조림','무침','비빔','찜','절임','튀김','삶기','굽기','데치기','회','기타']
const material = ['소고기','돼지고기','닭고기','육류','채소류','해물류','달걀/유제품','가공식품류','쌀','밀가루','건어물류','버섯류','과일류','콩/견과류','곡류','기타']

export default function AddRecipe(){
    const [recipeData,setRecipeData] = useState({'recipeTitle':'','name':'','description':'','people':'','time':'','difficult':'','ingredients0':'','steps':'','type':'','situation':'','process':'','material':''})
    const recipeRef = useRef({'recipeTitle':'','name':'','description':'','people':'','time':'','difficult':'','type':'','situation':'','process':'','material':''})
    // 레시피 정보 입력
    const inputRecipe = (e)=>{
        let {name, value} = e.target
        recipeRef.current = {...recipeRef.current,[name]:value}
    }
    //ingredientForm 정보 저장
    const inputRef = useRef({0:{ingredient:'',quantity:'',unit:''}})
    const handleInputChange = (id, field, value) => {
        inputRef.current=({...inputRef.current,[id]: (inputRef.current[id]?{...inputRef.current[id],[field]: value}:{[field]:value})})
    }
    // stepsForm 정보 저장
    const stepsRef = useRef({0:{steps:'',file:'',id:''}})
    // stepsForm 이미지 첨부시 프리뷰
    const [urlLink,setUrlLink] = useState()
    const [prevFile,setPrevFile] = useState({})
    const stepsInputChange = (id, field, value) => {
        stepsRef.current=({...stepsRef.current,[id]: (stepsRef.current[id]?{...stepsRef.current[id],['id']:id,[field]: value}:{[field]:value})})
        const keys = Object.keys(stepsRef.current)
        keys.map((key)=>{
            if(stepsRef.current[key].file === ''){
                return stepsRef.current[key].id = undefined
            }else return stepsRef.current[key].id = id
        })
        if(prevFile[id] !== stepsRef.current[id].file.name){
            setPrevFile({...prevFile,[id]:stepsRef.current[id].file.name})
            setUrlLink({...urlLink,[id]:{src:URL.createObjectURL(stepsRef.current[id].file)}})
        }
    }

    //레시피 만들기 레시피데이터 저장
    const createRecipe = async(e)=>{
        e.stopPropagation()
        // 재료정보 결합
        const keys = Object.keys(inputRef.current)
        const ingredients = []
        keys.forEach((key)=>{
            let target = inputRef.current[key]
            let value = ''
            if(target.ingredient === ''||target.quantity === ''||target.unit === ''){
                value = 'undefined'
            }else{
                value = target.ingredient+''+target.quantity+''+target.unit
            }
            ingredients.push(value)
        })
        const stepsKey = Object.keys(stepsRef.current)
        const steps=[]
        stepsKey.forEach((key,id)=>{
            let target = stepsRef.current[key]
            let value = ''
            if(target.steps === ''){value = 'undefined'}
            else{value= target.steps}
            steps.push(value)
        })
        if(validateValue(recipeRef.current)&&validateValue(ingredients)&&validateValue(steps)){
            const {recipeTitle,name,description,people,time,difficult,type,situation,process,material} = recipeRef.current
            if(e.target.name === 'save'){
                setRecipeData({recipeTitle,name,description,people,time,difficult,steps,type,situation,process,material,open:false,ingredients:ingredients})
            }else if(e.target.name === 'upload'){
                setRecipeData({recipeTitle,name,description,people,time,difficult,steps,type,situation,process,material,open:true,ingredients:ingredients})
            }
        }else{
            return alert('빠진 항목이있습니다')
        }
    } 

    // 레시피데이터가 저장되면 레시피 db로 저장
    useEffect(()=>{
        const recipeSave = async()=>{
            const token = JSON.parse(atob(sessionStorage.getItem('I')))
            let imgs = []            
            const fd = new FormData()
            for(let i in stepsRef.current){
                fd.append('recipeImage',stepsRef.current[i].file)
                fd.append('id',stepsRef.current[i].id)
            }
            await axios.post('recipes/upload',fd,{headers:{'Content-Type':'multipart/form-data','Authorization':`Bearer ${token}`}})
            .then(res => {
                // console.log(res.data)
                res.data.images.forEach(data=>{
                    imgs.push(data.value)
                })
            })
            // console.log(imgs)
            const {recipeTitle,name,description,people,time,difficult,steps,type,situation,process,material,open,ingredients} = recipeData
            await axios.post('/recipes/add-recipe',{
                recipeTitle,name,description,info:[people,time,difficult],ingredients,steps,category:[type,situation,process,material],open, cookingImgs:imgs
            },{headers:{Authorization:`Bearer ${token}`}})
            .then(res => {
                const {message} = res.data
                // console.log(res.data)
                alert(message)
            })
            .catch(e=>{
                console.log(e)
            })
        }
        if(validateValue(recipeData)){
            recipeSave()
        }
    },[recipeData])

    return(
        <div className='wrapper'>
            <div className='addForm' onChange={inputRecipe}>
                <div className="basicInfo">
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
                        <textarea maxLength={100} cols={50} rows={3} type={'text'} placeholder='간단한 요리설명을 입력하세요' name='description' defaultValue={''}/>
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
                </div>
                <IngredientForm changeHandler={handleInputChange}ref={inputRef}></IngredientForm>
                <StepsForm changeHandler={stepsInputChange} ref={stepsRef} url={urlLink}/>
            </div>
            <button name='save' onClick={createRecipe}>레시피 저장</button>
            <button name='upload' onClick={createRecipe}>레시피 공유</button>
        </div>
    )
}

const validateValue = (obj)=>{
    return !Object.values(obj).includes('undefined')&&!Object.values(obj).includes('')
}

