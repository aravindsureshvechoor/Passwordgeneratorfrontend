import React, { useState } from 'react'
import './Generator.css';
import Checkbox from './Checkbox';
import {  useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SavePassword from './saved_password/SavePassword';
import { logout } from '../api/features/users';
import { logout_token } from '../api/features/users';
function Generator() {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [navigateToSavePassword, setNavigateToSavePassword] = useState(false);
    const [passwordToSave, setPasswordToSave] = useState(''); // This line is now corrected

  const handleSavePassword = () => {
    if (handelText.length > 0) {
      setPasswordToSave(handelText);
      setNavigateToSavePassword(true);
      console.log("navigateToSavePassword : ", navigateToSavePassword)
    }
  };

  if (navigateToSavePassword ){
    console.log(navigateToSavePassword," - - - ", passwordToSave);
    <SavePassword Password={passwordToSave} />;
  }

    
    console.log("isAuth : ", isAuthenticated);
    console.log("user : ", user);
    const [passwordGen, setPasswordGen] = useState({
        length: 5,
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false,
      });
      const [handelText, setHandelText] = useState('');
      const [copied, setCopied] = useState(false);
    
      const handleChangeUppercase = () => {
        setPasswordGen({
          ...passwordGen,
          uppercase: !passwordGen.uppercase,
        });
      };
    
      const handleChangeLowercase = () => {
        setPasswordGen({
          ...passwordGen,
          lowercase: !passwordGen.lowercase,
        });
      };
    
      const handleChangeNumbers = () => {
        setPasswordGen({
          ...passwordGen,
          numbers: !passwordGen.numbers,
        });
      };
    
      const handleChangeSymbols = () => {
        setPasswordGen({
          ...passwordGen,
          symbols: !passwordGen.symbols,
        });
      };
    
      const setPasswordLength = (val) => {
        setPasswordGen({
          ...passwordGen,
          length: val,
        });
      };
    
      function generatePassword() {
        const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        const symbolsArray = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];
    
        const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
        const lowerCaseLetters = characterCodes.map((code) =>
          String.fromCharCode(code)
        );
        const upperCaseLetters = lowerCaseLetters.map((letter) =>
          letter.toUpperCase()
        );
    
        const { length, uppercase, lowercase, numbers, symbols } = passwordGen;
    
        const generateTheWord = (
          length,
          uppercase,
          lowercase,
          numbers,
          symbols
        ) => {
          const availableCharacters = [
            ...(lowercase ? lowerCaseLetters : []),
            ...(uppercase ? upperCaseLetters : []),
            ...(numbers ? numbersArray : []),
            ...(symbols ? symbolsArray : []),
          ];
          const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
          const characters = shuffleArray(availableCharacters).slice(0, length);
          setHandelText(characters.join(''));
          return characters;
        };
    
        generateTheWord(length, uppercase, lowercase, numbers, symbols);
      }


      const handleLogout = () => {
        dispatch(logout_token());
        window.location.reload();
    };



  return (
    <div className="wrapper">
      <div className="container wrapper-box">
        <h2>{isAuthenticated?`Hey, ${user.full_name}`:"Password Generator"}</h2>
        <div>

    </div>
        <div className="password-box">
          <input
            type="text"
            value={handelText}
            placeholder=""
            autoComplete="off"
            onChange={(e) => setHandelText(e.target.value)}
          />
          <button
            className="copy-button"
            onClick={() => {
              if (handelText.length > 0) {
                navigator.clipboard.writeText(handelText);
                setCopied(true);
                setInterval(() => {
                  setCopied(false);
                }, 2000);
              }
            }}
          >
            {copied ? 'Copied!' : 'Copy text'}
          </button>


        </div>


        <br />
        <div className="word-crieteria__box">
          <div>
            <label>Password length</label>
          </div>
          <div>
            <input
              type="number"
              min="4"
              max="20"
              value={passwordGen.length}
              onChange={(e) => setPasswordLength(e.target.value)}
            />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Include uppercase letters</label>
          </div>
          <div>
            <Checkbox
              value={passwordGen.uppercase}
              onChange={handleChangeUppercase}
            />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Include lowercase letters</label>
          </div>
          <div>
            <Checkbox
              value={passwordGen.lowercase}
              onChange={handleChangeLowercase}
            />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Include numbers</label>
          </div>
          <div>
            <Checkbox
              value={passwordGen.numbers}
              onChange={handleChangeNumbers}
            />
          </div>
        </div>
        <div className="word-crieteria__box">
          <div>
            <label>Include symbols</label>
          </div>
          <div>
            <Checkbox
              value={passwordGen.symbols}
              onChange={handleChangeSymbols}
            />
          </div>
        </div>
        <div>
          <button className="generate-button" onClick={generatePassword}>
            Generate password
          </button>
        
          <div>
        {isAuthenticated ? (
          <>
            <Link to="/save-password" style={{ color: "#03fc3d", textDecoration: "none", padding: "10px", fontSize: "15px", fontWeight: "900" }}>Save Password</Link>
            <Link to="/saved-passwords" style={{ color: "#fc7b03", textDecoration: "none", padding: "10px", fontSize: "15px", fontWeight: "900" }}>View Saved Passwords</Link>
            <Link to="/" onClick={handleLogout} style={{ color: "#0b03fc", textDecoration: "none", padding: "10px", fontSize: "15px", fontWeight: "900" }}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "black", textDecoration: "none", padding: "10px", fontSize: "15px" }}>Sign In</Link>
            <Link to="/sign-up" style={{ color: "black", textDecoration: "none", padding: "10px", fontSize: "15px" }}>Sign Up</Link>
          </>
        )}
      </div>
        
        </div>
      </div>
    </div>
  )
}

export default Generator
