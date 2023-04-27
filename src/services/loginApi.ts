import axios from 'axios';

interface LoginResponse {
  success: boolean;
  message: string;
}

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams): Promise<LoginResponse> => {
  const url = 'https://api.airtable.com/v0/appjWdL7YgpxIxCKA/credentials';
  const data = {
    filterByFormula: `AND(email='${email}',password='${password}')`,
    maxRecords: 1,
    view: 'Grid view',
  };
  const headers = {
    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(url, data, { headers });
    const record = response.data.records[0];
    const success = !!record;
    const message = success ? 'Login successful' : 'Invalid email or password';

    return { success, message };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'An error occurred during login' };
  }
};
