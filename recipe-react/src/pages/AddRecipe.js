import React,{useState} from 'react';

const people = ['1인분','2인분','3인분','4인분','5인분','6인분 이상']
const time = ['5분 이내','10분 이내','15분 이내','20분 이내','30분 이내','60분 이내','90분 이내','2시간 이내','2시간 이상']
const difficult = ['누구나 가능','쉬움','보통','어려움','매우 어려움']
const type = ['밑반찬','메인반찬','국/탕','찌개','디저트','면/만두','밥/죽/떡','퓨전','김치/젓갈/장류','양념/소스/잼','양식','샐러드','스프','빵','과자','차/음료/술','기타']
const situation = ['일상','초스피드','손님접대','술안주','다이어트','도시락','영양식','간식','야식','푸드스타일링','해장','명절','이유식','기타']
const process = ['볶음','끓이기','부침','조림','무침','비빔','찜','절임','튀김','삶기','굽기','데치기','회','기타']
const material = ['소고기','돼지고기','닭고기','육류','채소류','해물류','달걀/유제품','가공식품류','쌀','밀가루','건어물류','버섯류','과일류','콩/견과류','곡류','기타']

export default function AddRecipe(){
    const [recipeData,setRecipeData] = useState({})
    const [ingredient,setIngredient] = useState([1])
    const inputRecipe = (e)=>{
        let {name, value} = e.target
        if(name==='ingredients-1'||name==='ingredients-2'||name==='ingredients-3'){
            console.log(recipeData['ingredients'])
            name = 'ingredients'
            // if(recipeData['ingredients'])
            // value = recipeData['ingredients']+value
        }
        setRecipeData({
            ...recipeData,[name]:value
        })
    }

    const addingredient=()=>{
        setIngredient([...ingredient,1])
    }

    const createRecipe = async(e)=>{
        const token = JSON.parse(sessionStorage.getItem('UID'))
        const {recipeTitle,name,description,people,time,difficult,ingredients,steps,type,situation,process,material} = recipeData
        const newRecipe = await fetch('http://localhost:4000/recipes/add-recipe',{
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            method:'POST',
            body:JSON.stringify({
                recipeTitle,name,description,info:[people,time,difficult],ingredients,steps,category:[type,situation,process,material]
            })
        }).then(res=>res.json())
        if(newRecipe.code === 400){
            alert(newRecipe.message)
        }else{
            alert(newRecipe.message)
            console.log(newRecipe)
        }
    }
    console.log(recipeData)

    return(
        <>
            <form>
                <label>
                    레시피제목:
                    <input type={'text'} placeholder='레시피제목을 입력하세요' name='recipeTitle' onChange={inputRecipe}/>
                </label>
                <label>
                    요리명:
                    <input type={'text'} placeholder='요리이름을 입력하세요' name='name' onChange={inputRecipe}/>
                </label>
                <label>
                    요리설명:
                    <input type={'text'} placeholder='간단한 요리설명을 입력하세요' name='description' onChange={inputRecipe}/>
                </label>
                <div>
                    요리정보:
                    <label>
                        인원
                        <select value={recipeData.people} name='people' onChange={inputRecipe}>
                            <option value=''>인원</option>
                            {people.map((p,id)=>{
                                return <option key={p} value={id}>{p}</option>
                            })}
                        </select>
                    </label>
                    <label>
                        시간
                        <select value={recipeData.time} name='time' onChange={inputRecipe}>
                            <option value=''>시간</option>
                            {time.map((t,id)=>{
                                return <option key={t} value={id}>{t}</option>
                            })}
                        </select>
                    </label>
                    <label>
                         난이도
                        <select value={recipeData.difficult} name='difficult' onChange={inputRecipe}>
                            <option value={''}>난이도</option>
                            {difficult.map((diff,id)=>{
                                return <option key={diff} value={id}>{diff}</option>
                            })}
                        </select>
                    </label>
                </div>
                <div>
                    {ingredient.map((_,id)=>{
                        return(
                            <label key={id}>
                                재료:
                                <input type={'text'} placeholder='재료이름' name={`ingredients${id}`} onChange={inputRecipe}/>
                                <input type={'text'} placeholder='재료 수량' name={`ingredients${id}`} onChange={inputRecipe}/>
                                <input type={'text'} placeholder='단위(g/그램)' name={`ingredients${id}`} onChange={inputRecipe}/>
                            </label>
                        )
                    })}
                    <div onClick={addingredient}>재료 추가</div>
                </div>
                <div>
                    <label>
                        스텝:
                        <input type={'text'} placeholder='조리법을 입력하세요' name='steps' onChange={inputRecipe}/>
                    </label>
                </div>
                <div>
                    <label>
                        종류별:
                        <select value={recipeData.type} name='type' onChange={inputRecipe}>
                            <option value={''}>종류별</option>
                            {type.map((ty,id)=>{
                                return <option value={ty} key={id}>{ty}</option>
                            })}
                        </select>    
                    </label>    
                    <label>
                        상황별:
                        <select value={recipeData.situation} name='situation' onChange={inputRecipe}>
                            <option value={''}>상황별</option>   
                            {situation.map((sit,id)=>{
                                return <option value={sit} key={id}>{sit}</option>
                            })}
                        </select>    
                    </label>    
                    <label>
                        방법별:
                        <select value={recipeData.process} name='process' onChange={inputRecipe}>
                            <option value={''}>방법별</option>   
                            {process.map((pro,id)=>{
                                return <option value={pro} key={id}>{pro}</option>
                            })}
                        </select>    
                    </label>    
                    <label>
                        재료별:
                        <select value={recipeData.process} name='material' onChange={inputRecipe}>
                            <option value={''}>재료별</option>   
                            {material.map((mat,id)=>{
                                return <option value={mat} key={id}>{mat}</option>
                            })}
                        </select>    
                    </label>    
                </div>  
            </form>
            <button onClick={createRecipe}>레시피 등록</button>
        </>
    )
}