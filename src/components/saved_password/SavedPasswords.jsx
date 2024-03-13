import React, {useState, useEffect} from 'react';
import viewSavedPasswords from '../../api/features/viewSavedPasswords';
import './SavedPasswords.css';
import { useNavigate } from 'react-router-dom';
import deleteSavedPassword from '../../api/features/deleteSavedPassword';
import { useSelector } from 'react-redux';
function SavedPasswords() {
    const navigate = useNavigate();
    const [passwordList, setPasswordList] = useState([]); 
    const { isAuthenticated, user } = useSelector((state) => state.user);
    useEffect(() => {
        const fetchData = async () => {
            if (isAuthenticated){
            try {
                const response = await viewSavedPasswords(); // Assuming viewSavedPasswords is a function that fetches the data
                console.log("Response:", response); // Check the response structure returned from the API
                setPasswordList(response.passwords); // Set the passwords array to passwordList
            } catch (error) {
                console.error(error);
            }
        }
        else{
            navigate('/')
        }
        };
    
        fetchData();
    }, []);

    const deletePassword = async (passid) => {
        try {
            await deleteSavedPassword(passid);
            // Assuming you want to refetch the data after deletion
            const response = await viewSavedPasswords();
            setPasswordList(response.passwords);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        
        <div className="wrapper">
            {/* <h2 className='main-title'>Saved Passwords</h2> */}
            {/* <button onClick={()=>navigate('/')}>Home</button> */}
            <table className="password-table">
                <thead>
                    <tr>
                        <th>Account</th>
                        <th>Password</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {passwordList && passwordList.map((item, key) => (
                        <tr key={key}>
                            <td>{item.account_type}</td>
                            <td>{item.password}</td>
                            <td>
                                <button onClick={() => deletePassword(item.id)}>Delete</button> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SavedPasswords;

