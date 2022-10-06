import {baseUrl} from '../constants/api';
import {requestHandler} from '../utils/request';
import {FetchDetails, FetchOk} from '../utils/types/api';
import {Address, User, Voucher} from '../utils/types/user';
const addVoucherUrl = `${baseUrl}/user/addvoucher`;
const userInfoUrl = `${baseUrl}/user/userinfo`;
const editInfoUrl = `${baseUrl}/user/editinfo`;
const changePasswordUrl = `${baseUrl}/user/change-password`;
const addAddressUrl = `${baseUrl}/user/add-address`;
const editAddressUrl = `${baseUrl}/user/edit-address`;
const getAddressUrl = `${baseUrl}/user/myaddresses`;

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

export const addAddress = async (
  name: string,
  details: string = 'Dhaka',
  lat: number,
  long: number,
  extDetails?: string,
  label?: string,
  deliveryInstructions?: string,
  token?: string,
) => {
  const result = await requestHandler(
    addAddressUrl,
    'POST',
    {
      name,
      details,
      extDetails,
      lat,
      long,
      label,
      deliveryInstructions,
    },
    token,
  );
  const res: FetchOk = await result.json();

  return res;
};

export const editAddress = async (
  id: number,
  name?: string,
  details?: string,
  lat?: number,
  long?: number,
  extDetails?: string,
  label?: string,
  deliveryInstructions?: string,
  token?: string,
) => {
  const result = await requestHandler(
    editAddressUrl,
    'POST',
    {id, name, details, extDetails, lat, long, label, deliveryInstructions},
    token,
  );
  const res: FetchOk = await result.json();

  return res;
};

export const getAddress = async (token?: string) => {
  const result = await requestHandler(getAddressUrl, 'GET', undefined, token);
  const res: FetchDetails<Address[]> = await result.json();

  return res;
};
