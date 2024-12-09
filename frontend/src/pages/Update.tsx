import react,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate, useLocation, useParams} from 'react-router-dom';
import Cookies from 'js-cookie';


type tProducts = {
    "id": string,
    "name" : string,
    "qty": number | string,
    "price": number | string,
    "description" : string
}

const Update = () => {
    const [values, setValues] = useState<tProducts>({
        "id": "",
        "name" : "",
        "qty": 0,
        "price": 0.00,
        "description" : ""
    });

    const navigate = useNavigate();
    // const location = useLocation();
    // const token = location.state?.message;
    const token = localStorage.getItem('auth_token');
    const {id} = useParams();
    // const token = Cookies.get('auth_token',);
    // //axios.get(webApiUrl, { headers: {Authorization : `Bearer ${tokenStr}`} });
    // console.log(token);

    useEffect(() => {
        axios.defaults.withCredentials = true;
        // axios.get('http://127.0.0.1:8000/api/products',{ headers: {Authorization : `Bearer ${token}`} })
        axios.get('http://127.0.0.1:8000/api/products/'+id,{headers:{Authorization: `Bearer ${token}`}})
            .then((res)=>{
                    setValues(res.data.product)
            })
            .catch((error) => console.log(error))
    },[]);
    
    const handleSubmit: react.FormEventHandler<HTMLFormElement> = (event:react.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
   
        axios.defaults.withCredentials = true;

        const confirms = window.confirm('Are you sure you want to create Product?')
        if(confirms){
        axios.put(`http://127.0.0.1:8000/api/products/${id}/update`,values,{ headers: {Authorization : `Bearer ${token}`} } ) //values
        .then((res)=>{
                console.log(res.data)
                alert('Successfully updated a Product.')
                navigate('/products') // {/*state={{message: token}} */}
        })
        .catch((error) => console.log(error.response.data))
        }else{

        }

    }

  return (
    <div className='bg-light text-dark w-100 vh-100'>
        <div className='container'>
                 <div className='text-center pt-5 pb-3'>
                 <h1>Update Product </h1>
                 </div>
                 <form onSubmit={handleSubmit}>
                            <div className="d-flex align-items-center justify-content-center mt-4">
                                    <div className='col-6 bg-white border'>
                                    <div className='row p-2'>
                                                <div className='col-3 d-flex align-items-center justify-content-center'>
                                                    <label htmlFor='name'>Name:</label>
                                                </div>
                                                <div className='col-9'>
                                                    <input type='text' className='form-control' name="name" value={values.name} onChange={(event:react.ChangeEvent<HTMLInputElement>) => { setValues({...values, name:event.target.value})}} />
                                                </div>
                                    </div>
                                    <div className='row p-2'>
                                                <div className='col-3 d-flex align-items-center justify-content-center'>
                                                    <label htmlFor='qty'>Quantity:</label>
                                                </div>
                                                <div className='col-9'>
                                                    <input type='number' className='form-control' name="qty" value={values.qty} onChange={(event:react.ChangeEvent<HTMLInputElement>) => { setValues({...values, qty:event.target.value})}} />
                                                </div>
                                    </div>
                                    <div className='row p-2'>
                                                <div className='col-3 d-flex align-items-center justify-content-center'>
                                                    <label htmlFor='price'>Price:</label>
                                                </div>
                                                <div className='col-9'>
                                                    <input type='number' className='form-control' name="price" value={values.price} onChange={(event:react.ChangeEvent<HTMLInputElement>) => { setValues({...values, price:event.target.value})}} />
                                                </div>
                                    </div>
                                    <div className='row p-2'>
                                                <div className='col-3 d-flex align-items-center justify-content-center'>
                                                    <label htmlFor='description'>Description:</label>
                                                </div>
                                                <div className='col-9'>
                                                    <input type='text' className='form-control' name="name" value={values.description} onChange={(event:react.ChangeEvent<HTMLInputElement>) => { setValues({...values, description:event.target.value})}} />
                                                </div>
                                    </div>
                                    <div className='row p-2'>
                                                <div className='col-3 d-flex align-items-center justify-content-center'>
                                                </div>
                                                <div className='col-9 d-flex align-items-center justify-content-center'>
                                                    <input type='submit' className='btn px-4 btn-sm btn-success me-3'  value='Update'  />
                                                    <Link className='btn px-4 btn-sm btn-danger' to='/products'>Back</Link> {/*state={{message: token}} */}
                                                </div>
                                    </div>
                                    </div>
                            </div>
                  </form>
        </div>

    </div>
  )
}

export default Update
