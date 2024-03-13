import axios from 'axios';
import { BASE_URL } from '../../config';

const savePasswords = async (account_type, password) => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const formData = new FormData();
    formData.append('account_type', account_type);
    formData.append('password', password);

    const response = await axios.post(`${BASE_URL}/api/accounts/save-password/`, formData, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 201) {
      return response.data;
    } else {
      console.log(response.error);
    }
  } catch (error) {
    console.error(error);
  }
};

export default savePasswords;