import { Route, Routes } from 'react-router-dom';
import {Home, NotFound, Register} from './pages/index'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
