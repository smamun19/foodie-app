import {baseUrl} from '../constants/api';
import {requestHandler} from '../utils/request';

const signinUrl = `${baseUrl}/auth/signin`;
const signupUrl = `${baseUrl}/auth/signup`;
const reqResetUrl = `${baseUrl}/auth/reset-req`;

export const signin = async (email: string, password: string) => {
  const result = await requestHandler(signinUrl, 'POST', {
    email,
    password,
  });
  const res = await result.json();
  console.log(res);

  return res;
};

export const signup = async (email: string, name: string, password: string) => {
  const result = await requestHandler(signupUrl, 'POST', {
    email,
    name,
    password,
  });

  const res = await result.json();
  console.log(res);

  return res;
};

export const reqReset = async (email: string) => {
  const result = await requestHandler(reqResetUrl, 'POST', {
    email,
  });
  const res = await result.json();
  console.log(res);

  return res;
};
