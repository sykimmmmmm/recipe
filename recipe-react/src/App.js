import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './Component/Header';
import {Home, NotFound, Register, Mypage, AddRecipe, Recipe, Login} from './pages/index'
import axios from 'axios'


function App() {
  const location = useLocation()
  axios.defaults.withCredentials=true
  return (
    <>
      <Header/>
      {/* {location.pathname !== '/user/register' ? <Header/>: ''} */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/user/register' element={<Register/>}/>
        <Route path='/user/login' element={<Login/>}/>
        <Route path='/user/mypage' element={<Mypage/>}/>
        <Route path='/recipe' element={<Recipe/>}>
          <Route path=':id' element={<Recipe/>}/>
        </Route>
        <Route path='/add-recipe' element={<AddRecipe/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
