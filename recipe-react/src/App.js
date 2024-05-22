import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './Component/Header';
import {Home, NotFound, Register, Mypage, AddRecipe, Recipe, Login} from './pages/index'
import TestAdd from './pages/TestAdd';

function App() {
  const location = useLocation()
  console.log(location)
  return (
    <>
      {location.pathname !== '/user/register' ? <Header/>: ''}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/user/register' element={<Register/>}/>
        <Route path='/user/login' element={<Login/>}/>
        <Route path='/user/mypage' element={<Mypage/>}/>
        <Route path='/recipe' element={<Recipe/>}>
          <Route path=':id' element={<Recipe/>}/>
        </Route>
        <Route path='/add-recipe' element={<AddRecipe/>}/>
        <Route path='/test' element={<TestAdd/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
