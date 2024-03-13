import axios from 'axios';
import { BASE_URL } from '../../config';

const viewSavedPasswords = async () => {
  try {
    const accessToken = localStorage.getItem('access_token');
    const response = await axios.get(`${BASE_URL}/api/accounts/view-passwords/`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if  (response.status === 200) {
        console.log("response : -----", response)
        return response.data;
    } else {
        console.log(response.error)
    }
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default viewSavedPasswords;