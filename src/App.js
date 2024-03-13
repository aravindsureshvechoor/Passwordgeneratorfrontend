import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Generator from './components/Generator';
import Register from './components/Register';
import SavedPasswords from './components/saved_password/SavedPasswords';
import SavePassword from './components/saved_password/SavePassword';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch } from 'react-redux';
import { checkAuth } from './api/features/users';


function App() {
  const dispatch = useDispatch();
  const access = localStorage.getItem('access_token');

  useEffect(()=> {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <ToastContainer/>
      <Routes>
          <Route exact path="/" element={< Generator/>} />
          <Route path="/login" element={< Login/>} />
          <Route path="/sign-up" element={< Register/>} />
          <Route path="/saved-passwords" element={< SavedPasswords/>} />
          <Route path="/save-password" element={< SavePassword/>} />


      </Routes>
    </Router>
    
  )
}

export default App;
