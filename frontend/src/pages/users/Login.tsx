import react,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';


type tProducts = {
    "email" : string,
    "password" : string
}

const Login = () => {
    const [values, setValues] = useState<tProducts>({
        "email" : "",
        "password" : ""
    });

    const [error1, setError1] = useState();
    const [errorEmail, setErrorEmail] = useState();
    const [errorPassword, setErrorPassword] = useState();

    const navigate = useNavigate();


    //axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });

    const handleSubmit: react.FormEventHandler<HTMLFormElement> = (event:react.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.defaults.withCredentials = true;
        axios.post('http://127.0.0.1:8000/api/user/login',values) 
        .then((res)=>{
                const token  = (res.data.token)
                if(token){
                    alert('Successfully login to the system')
                    localStorage.setItem('auth_token', token);
                    navigate('/products', {state: {message:(res.data.token) }})
                }else{
                    setError1(res.data.message)
                }

        })
        .catch((error) => {
            setErrorEmail(error.response.data.errors.email),
             setErrorPassword(error.response.data.errors.password)
            }
    )


        

    }

  return (
    <div className='bg-light text-dark w-100 vh-100'>
        <div className='container'>
                 <div className='text-center pt-5 pb-3'>
                 <h1>Welcome Please Login </h1>
                 </div>
                 <div className='text-center'><h5 className='text-danger'>{error1}{errorEmail} {errorPassword}</h5></div>
                 <form method='post' onSubmit={handleSubmit}>
                            <div className="d-flex align-items-center justify-content-center mt-4">
                                    <div className='col-6 bg-white border'>
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
                                                    <input type='text' className='form-control' name="qty" value={values.password} onChange={(event:react.ChangeEvent<HTMLInputElement>) => { setValues({...values, password:event.target.value})}} />
                                                </div>
                                    </div>
                                    <div className='row p-2'>
                                                <div className='col-3 d-flex align-items-center justify-content-center'>
                                                </div>
                                                <div className='col-9 d-flex align-items-center justify-content-center'>
                                                    <input type='submit' className='btn px-4 btn-sm btn-success me-3'  value='Login'  />
                                                    <Link className='btn px-4 btn-sm btn-danger' to='/user/register'>Register</Link>
                                                </div>
                                    </div>
                                    </div>
                            </div>
                  </form>
        </div>

    </div>
  )
}

export default Login
