import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import View from './pages/View';
import Create from './pages/Create';
import Login from './pages/users/Login';
import Register from './pages/users/Register';
import Update from './pages/Update';

function App() {
 

  return (
    <Router>
            <Routes>
                 <Route path='/user/login' element={<Login />} />
                 <Route path='/user/register' element={<Register />} />
                    <Route path='/products' element={<Home />} />
                    <Route path='/products/create' element={<Create />} />
                    <Route path='/products/:id' element={<View />} />
                    <Route path='/products/update/:id' element={<Update />} />
                    <Route path='*' element={<div className='d-flex align-items-center justify-content-center w-100 vh-100'>Please back to main page <Link to='/products' className='btn btn-danger btn-sm'>Back</Link></div>}  />
            </Routes>
    </Router>
  )
}

export default App
