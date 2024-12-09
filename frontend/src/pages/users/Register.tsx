import react,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';


type tProducts = {
    "username" : string,
    "email" : string,
    "password" : string,
    "password_confirmation" : string
}

const Register = () => {
    const [values, setValues] = useState<tProducts>({
        "username": "",
        "email" : "",
        "password" : "",
        "password_confirmation":""
    });

    const navigate = useNavigate();


    //axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });

    const handleSubmit: react.FormEventHandler<HTMLFormElement> = (event:react.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.defaults.withCredentials = true;
        axios.post('http://127.0.0.1:8000/api/user/create',values) 
        .then((res)=>{
                // console.log(res.data.token)
                alert('Successfully login to the system')
                navigate('/products', {state: {message:(res.data.token) }})
        })
        .catch((error) => console.log(error.response.data))


        

    }

  return (
    <div className='bg-light text-dark w-100 vh-100'>
        <div className='container'>
                 <div className='text-center pt-5 pb-3'>
                 <h1>Welcome Please Login </h1>
                 </div>
                 <form method='post' onSubmit={handleSubmit}>
                            <div className="d-flex align-items-center justify-content-center mt-4">
                                    <div className='col-6 bg-white border'>
                                    <div className='row p-2'>
                                                <div className='col-3 d-flex align-items-center justify-content-center'>
                                                    <label htmlFor='username'>Username:</label>
                                                </div>
                                                <div className='col-9'>
                                                    <input type='text' className='form-control' name="username" value={values.username} onChange={(event:react.ChangeEvent<HTMLInputElement>) => { setValues({...values, username:event.target.value})}} />
                                                </div>
                                    </div>
                                    <div className='row p-2'>
                                                <div className='col-3 d-flex align-items-center justify-content-center'>
                                                    <label htmlFor='email'>Email:</label>
                                                </div>
                                                <div className='col-9'>
                                                    <input type='text' className='form-control' name="email" value={values.email} onChange={(event:react.ChangeEvent<HTMLInputElement>) => { setValues({...values, email:event.target.value})}} />
                                                </div>
                                    </div>
                                    <div className='row p-2'>
                                                <div className='col-3 d-flex align-items-center justify-content-center'>
                                                    <label htmlFor='password'>Password:</label>
                                                </div>
                                                <div className='col-9'>
                                                    <input type='text' className='form-control' name="password" value={values.password} onChange={(event:react.ChangeEvent<HTMLInputElement>) => { setValues({...values, password:event.target.value})}} />
                                                </div>
                                    </div>
                                    <div className='row p-2'>
                                                <div className='col-3 d-flex align-items-center justify-content-center'>
                                                    <label htmlFor='password_confirmation'>Password_confirmation:</label>
                                                </div>
                                                <div className='col-9'>
                                                    <input type='text' className='form-control' name="password_confirmation" value={values.password_confirmation} onChange={(event:react.ChangeEvent<HTMLInputElement>) => { setValues({...values, password_confirmation:event.target.value})}} />
                                                </div>
                                    </div>
                                    <div className='row p-2'>
                                                <div className='col-3 d-flex align-items-center justify-content-center'>
                                                </div>
                                                <div className='col-9 d-flex align-items-center justify-content-center'>
                                                    <input type='submit' className='btn px-4 btn-sm btn-success me-3'  value='Register'  />
                                                    <Link className='btn px-4 btn-sm btn-danger' to='/user/login'>Back</Link>
                                                </div>
                                    </div>
                                    </div>
                            </div>
                  </form>
        </div>

    </div>
  )
}

export default Register
