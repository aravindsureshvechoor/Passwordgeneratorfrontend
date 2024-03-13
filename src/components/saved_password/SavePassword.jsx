import React, { useState } from 'react'
import './SavePassword.css';
import {  useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import savePasswords from '../../api/features/savePasswords';
import Generator from '../Generator';
import { toast } from 'react-toastify';
function SavePassword() {
    const [passwordInput, setPasswordInput] = useState('');
    const [accounttype, setAccountType] = useState('');
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const navigate = useNavigate();

  const handlePaste = () => {
    navigator.clipboard.readText().then(text => {
      setPasswordInput(text);
    }).catch(err => {
      console.error('Failed to read clipboard contents: ', err);
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await savePasswords(accounttype, passwordInput);
        toast.success('Password Saved successfully and Securely!', {
            position: "top-center",
        });
        navigate('/saved-passwords')
    } catch (error) {
        toast.error('Failed to save Password!', {
            position: "top-center",
        });
    }
};
    
  return (
    <>
    {isAuthenticated?(
    <div className="wrapper">
      <div className="container wrapper-box">
        <div>

    </div>
        <div className="password-box">
        <div className="form-container">
            <label>Account</label>
            <input
                type="text"
                placeholder="Gmail, Facebook, etc.."
                autoComplete="off"
                name="accounttype"
                value={accounttype}
                onChange={e => setAccountType(e.target.value)}

            />
            <label>Password</label>
            <div style={{ display: 'flex' }}>
              <input
                type="text"
                placeholder="Enter your password"
                autoComplete="off"
                name="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
              />
              <button style={{border:"none"}} onClick={handlePaste}>Paste</button>
            </div>
        </div>
        </div>
        <br />

        <div>
          <button className="generate-button" onClick={handleSubmit}>
            Save password
          </button>
        
          <div>

      </div>
        
        </div>
      </div>
    </div>
    ):(<Generator/>)
}
</>
  )
}

export default SavePassword
