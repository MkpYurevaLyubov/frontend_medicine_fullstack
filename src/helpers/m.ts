import axios from 'axios';

export const isValidatePassword = (password: string): boolean => {
  const re = /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{6,}/g;
  return re.test(password);
};

export const isValidateDate = (date: any) => {
  return (
    Math.ceil(new Date(date).getTime() / 8.64e7) >=
    Math.floor(new Date().getTime() / 8.64e7)
  );
};

export const refreshToken = async () => {
  const token = JSON.parse(localStorage.getItem('token')!);
  const headers = {
    'Content-Type': 'application/json',
    refreshtoken: token.refresh_token,
  };
  const result = await axios.get('http://localhost:8000/api/refreshToken', {
    headers,
  });
  localStorage.setItem('token', JSON.stringify(result.data));
  return result.data.access_token;
};
