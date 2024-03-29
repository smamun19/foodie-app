import {baseUrl} from '../constants/api';
import {requestHandler} from '../utils/request';
import {FetchDetails, FetchOk} from '../utils/types/api';
import {User} from '../utils/types/user';

const signinUrl = `${baseUrl}/auth/signin`;
const signupUrl = `${baseUrl}/auth/signup`;
const reqResetUrl = `${baseUrl}/auth/reset-req`;
const sendOtpUrl = `${baseUrl}/auth/sendotp`;
const resetPassUrl = `${baseUrl}/auth/reset`;
const verifyOtpUrl = `${baseUrl}/auth/verifyotp`;

export const signin = async (email: string, password: string) => {
  const result = await requestHandler(signinUrl, 'POST', {
    email,
    password,
  });

  const res: FetchDetails<User> = await result.json();

  return res;
};

export const signup = async (email: string, name: string, password: string) => {
  const result = await requestHandler(signupUrl, 'POST', {
    email,
    name,
    password,
  });

  const res: FetchOk = await result.json();

  return res;
};

export const reqReset = async (email: string) => {
  const result = await requestHandler(reqResetUrl, 'POST', {
    email,
  });
  const res: FetchDetails = await result.json();

  return res;
};

export const sendOtp = async (email: string) => {
  const result = await requestHandler(sendOtpUrl, 'POST', {
    email,
  });
  const res: FetchOk = await result.json();

  return res;
};

export const verifyOtp = async (email: string, otp: string) => {
  const result = await requestHandler(verifyOtpUrl, 'POST', {
    email,
    otp,
  });
  const res: FetchDetails<boolean> = await result.json();

  return res;
};

export const resetPass = async (email: string, newPassword: string) => {
  const result = await requestHandler(resetPassUrl, 'POST', {
    email,
    newPassword,
  });
  const res: FetchOk = await result.json();

  return res;
};
