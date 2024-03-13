import axios from 'axios';
import { BASE_URL } from '../../config';

const deleteSavedPassword = async (passId, fetchData) => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const response = await axios.delete(`${BASE_URL}/api/accounts/delete-password/${passId}/`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      console.log('Password deleted successfully');
      if (fetchData) {
        fetchData(); 
      }
    } else {
      console.log(response.error);
    }
  } catch (error) {
    console.error(error);
  }
};

export default deleteSavedPassword;