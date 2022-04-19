import {baseUrl} from '../constants/api';
import {requestHandler} from '../utils/request';

export const signin = async (email: string, password: string) => {
  const res = await requestHandler(`${baseUrl}/auth/signin`, 'POST', {
    email,
    password,
  });
  console.log(await res.json());
};
