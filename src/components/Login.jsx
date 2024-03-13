import React, {useState, useEffect} from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { login } from '../api/features/users';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

  const { loading, registered, isAuthenticated } = useSelector(state => state.user)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value });
  }
  
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors({});
      const response = await dispatch(login({ email, password }));  
      if (response.payload && response.payload.detail) {
        setErrors(response.payload);
        console.log('Login failed:', response.payload);
      } else {
        console.log(response.payload);
        console.log('Login successful. Navigating to home.');
        navigate('/');
      }
    } catch (error) {
      console.log('Error caught:', error);
    }
  };  
  
//   useEffect(()=> {
//     if (registered) dispatch(resetRegistered());
//   }, [registered, dispatch]);

//   useEffect(()=> {
//     if (isAuthenticated) {
//       navigate('/home'); 
//     } else {
//       navigate('/'); 
//     }
//   },[isAuthenticated, navigate]);
  return (
    <div className="wrapper">
        <div className="container wrapper-box">
        <Link className='register-link' to="/"> &lt; Home</Link>
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
        <div className="form-container">
            <label>Email</label>
            <input
                type="text"
                placeholder="Enter your email"
                autoComplete="off"
                name="email"
                onChange={onChange}
                value={email}
            />
            <label>Password</label>
            <input
                type="password"
                placeholder="Enter your password"
                autoComplete="off"
                name="password"
                onChange={onChange}
                value={password}
            />
        </div>
        <button type='submit' className='login-button'>Login</button>
        </form>
        <p>Don't have an account? <Link className='register-link' to="/sign-up">Sign Up</Link></p>
        
        </div>
    </div>
  )
}

export default Login
