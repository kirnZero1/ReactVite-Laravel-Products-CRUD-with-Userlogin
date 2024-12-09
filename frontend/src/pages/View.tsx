import react,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams, useLocation} from 'react-router-dom';

type tProducts = {
    "id" : string,
    "name" : string,
    "qty": number,
    "price": number,
    "description" : string
}

const View = () => {
    const [values, setValues] = useState<tProducts>({
        "id" : "",
        "name" : "",
        "qty": 0,
        "price": 0.00,
        "description" : ""
    });

    const {id} = useParams();
    // const location = useLocation();
    // const token = location.state?.message;

    const token = localStorage.getItem('auth_token');
   
    useEffect(() => {

        axios.defaults.withCredentials = true;
        axios.get('http://127.0.0.1:8000/api/products/'+id, {headers:{Authorization: `Bearer ${token}`}})
            .then((res)=>{
                    setValues(res.data.product)
            })
            .catch((error) => console.log(error))
    },[]);
  return (
    <div className='bg-light text-dark w-100 vh-100'>
        <div className='container'>
                 <div className='text-center pt-5 pb-3'>
                 <h1>Products Inventory</h1>
                 </div>
                 <div className="d-flex align-items-center justify-content-center mt-4">
                        <div className='col-8'>
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
                                        <tr>
                                            <td>{values.id}</td>
                                            <td>{values.name}</td>
                                            <td>{values.qty}</td>
                                            <td>{values.price}</td>
                                            <td>{values.description}</td>
                                            <td className='text-center'>
                                            <Link className='btn btn-primary btn-sm me-1' to={`/products/update/${values.id}`} >Update</Link>  {/*state={{message: token}} */}
                                            <Link className='btn btn-danger btn-sm' to={`/products`}>Back</Link>  {/*state={{message: token}} */}
                                            </td>
                                        </tr>
                                 

                                </tbody>
                            </table>
                        </div>
                  </div>
        </div>

    </div>
  )
}

export default View
