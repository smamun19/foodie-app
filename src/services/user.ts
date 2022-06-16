import {baseUrl} from '../constants/api';
import {requestHandler} from '../utils/request';

const addVoucherUrl = `${baseUrl}/user/addvoucher`;

export const addVoucher = async (name: string, token?: string) => {
  const result = await requestHandler(
    addVoucherUrl,
    'POST',
    {
      name,
    },
    token,
  );
  const res = await result.json();

  return res;
};
