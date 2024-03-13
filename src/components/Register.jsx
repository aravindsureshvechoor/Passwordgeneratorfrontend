import React, {useState} from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { register } from '../api/features/users';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});



    const [confirmPassword, setConfirmPassword] = useState("");
    const [formData, setFormData] = useState({
      full_name: "",
      email: "",
      password: "",
    });
  
    const { full_name, email, password } = formData;
  
    const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const onSubmit = (e) => {
      e.preventDefault();
      setErrors({});
  
      if (password !== confirmPassword) {
        setErrors({ confirm_password: "Password and Confirm Password do not match." });
        return;
      }
  
      dispatch(register({ full_name, email, password })).then(
        (response) => {
          if (response.error) {
            setErrors(response.payload);
            toast.error(response.payload);
          }
          else{
            toast.success("Registered Successfully");
            navigate("/")
          }
        }
      );
    };

  return (
    <div className="wrapper">
        <div className="container wrapper-box">
        <Link className='register-link' to="/"> &lt; Home</Link>
        <h2>Register</h2>
        {errors.general && (
        <div className="text-red-600 text-center mt-4 text-sm">
          {errors.general}
        </div>
      )}
        <form onSubmit={onSubmit}>
        <div className="form-container">
            <label>Full Name</label>
            <input
                type="text"
                placeholder="Enter your Name"
                autoComplete="off"
                name="full_name"
                onChange={onChange}
                value={full_name}
            />
            <label>Email</label>
            <input
                type="email"
                placeholder="Enter your email"
                autoComplete="off"
                name="email"
                onChange={onChange}
                value={email}
            />
            {errors.email && (
                <div style={{color:"red"}}>
                  {errors.email}
                </div>
              )}
            <label>Password</label>
            <input
                type="password"
                placeholder="Enter your password"
                autoComplete="off"
                name="password"
                onChange={onChange}
                value={password}
            />
            <label>Confirm Password</label>
            <input
                type="password"
                placeholder="Enter your password"
                autoComplete="off"
                name="confirm_password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
            />
            {errors.confirm_password && (
                <div style={{color:"red"}}>
                  {errors.confirm_password}
                </div>
              )}
        </div>
        <button  type="submit" className='login-button'>Sign Up</button>
        </form>
        <p>Already have an account? <Link className='register-link' to="/login">Sign In</Link></p>
        
        </div>
    </div>
  )
}

export default Register
