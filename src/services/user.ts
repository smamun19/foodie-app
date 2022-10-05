import {baseUrl} from '../constants/api';
import {requestHandler} from '../utils/request';
import {FetchDetails, FetchOk} from '../utils/types/api';
import {User, Voucher} from '../utils/types/user';
const addVoucherUrl = `${baseUrl}/user/addvoucher`;
const userInfoUrl = `${baseUrl}/user/userinfo`;
const editInfoUrl = `${baseUrl}/user/editinfo`;
const changePasswordUrl = `${baseUrl}/user/change-password`;

export const addVoucher = async (name: string, token?: string) => {
  const result = await requestHandler(
    addVoucherUrl,
    'POST',
    {
      name,
    },
    token,
  );
  const res: FetchDetails<Voucher> = await result.json();

  return res;
};

export const getUserInfo = async (token?: string) => {
  const result = await requestHandler(userInfoUrl, 'GET', undefined, token);
  const res: FetchDetails<User> = await result.json();

  return res;
};

export const editInfo = async (
  data: Record<string, any>,

  token?: string,
) => {
  const result = await requestHandler(
    editInfoUrl,
    'POST',
    {
      ...data,
    },
    token,
  );
  const res: FetchDetails<User> = await result.json();

  return res;
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
  token?: string,
) => {
  const result = await requestHandler(
    changePasswordUrl,
    'POST',
    {
      currentPassword,
      newPassword,
    },
    token,
  );
  const res: FetchOk = await result.json();

  return res;
};
