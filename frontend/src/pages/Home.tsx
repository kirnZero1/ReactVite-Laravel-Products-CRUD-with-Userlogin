import react,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link , useLocation, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

type tProducts = {
    "id" : string,
    "name" : string,
    "qty": number,
    "price": number,
    "description" : string
}

const Home = () => {
    const [values, setValues] = useState<tProducts[]>([]);
    // const location = useLocation();
    // const token = location.state?.message;

    const token = localStorage.getItem('auth_token');
    

//     const token = Cookies.get('auth_token');
//    console.log(`Token ${token}`);

    const navigate = useNavigate();

    useEffect(() => {
        axios.defaults.withCredentials = true;
        // axios.get('http://127.0.0.1:8000/api/products',{ headers: {Authorization : `Bearer ${token}`} })
        axios.get('http://127.0.0.1:8000/api/products',{headers:{Authorization: `Bearer ${token}`}})
            .then((res)=>{
                    setValues(res.data.products)
            })
            .catch((error) => console.log(error))
    },[]);


    const handleClick = (token: string | null) => {
        axios.defaults.withCredentials = true;
        localStorage.removeItem('auth_token')
        axios.post('http://127.0.0.1:8000/api/user/logout',{},{headers:{Authorization: `Bearer ${token}`}})
        .then((res)=>{    
                alert('Successfully logout')
                navigate('/user/login')
        })
        .catch((error) => console.log(error.response.data))
    }

    const handleDelete = (id: string | null) => {

        axios.defaults.withCredentials = true;
        axios.delete(`http://127.0.0.1:8000/api/products/${id}/delete`,{headers:{Authorization: `Bearer ${token}`}})
        .then((res)=>{
                alert('Successfully delete a Product')
                window.location.reload();
                // navigate('/products',{state:{message:token}})
        })
        .catch((error) => console.log(error.response.data))
    }
    
  return (
    <div className='bg-light text-dark w-100 vh-100'>
        <div className='container'>
                 <div className='text-center pt-5 pb-3'>
                 <h1>Products Inventory</h1>
                 </div>
                 <div className="d-flex align-items-center justify-content-center mt-4">
                        <div className='col-8'>
                            <div className='text-end p-3'>
                            <Link className='btn btn-success px-4 btn-sm me-1' to='/products/create' >Create</Link>    {/*state={{message: token}} */}
                            </div>
                            <div>
                            <button onClick={() =>handleClick(token)} className='btn btn-danger btn-sm' >Logout</button>
                            </div>
                            <table className='table table-striped table-responsive table-bordered table-hover'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {values.map((data, index) => {
                                        return       <tr key={index}>
                                                        <td>{data.id}</td>
                                                        <td>{data.name}</td>
                                                        <td>{data.qty}</td>
                                                        <td>{data.price}</td>
                                                        <td>{data.description}</td>
                                                        <td>
                                                            <Link className='btn btn-primary btn-sm me-1' to={`/products/${data.id}`} >View</Link>  {/*state={{message: token}} */}
                                                            <Link className='btn btn-secondary btn-sm me-1' to={`/products/update/${data.id}`} >Update</Link>  {/*state={{message: token}} */}
                                                             <button className='btn btn-danger btn-sm' onClick={() =>handleDelete(data.id)} >Delete</button>
                                                        </td>
                                                    </tr>
                                    })}

                                </tbody>
                            </table>
                        </div>
                  </div>
        </div>

    </div>
  )
}

export default Home
