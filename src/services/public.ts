import {baseUrl} from '../constants/api';
import {requestHandler} from '../utils/request';
import {FetchDetails} from '../utils/types/api';
import {HelpCenter, HelpCenterQuery} from '../utils/types/user';

const getHelpCenterUrl = `${baseUrl}/public/help-center`;
const getHelpCenterQueryUrl = `${baseUrl}/public/help-center-query`;

export const getHelpCenter = async () => {
  const result = await requestHandler(getHelpCenterUrl, 'GET', undefined);
  const res: FetchDetails<HelpCenter[]> = await result.json();

  return res;
};

export const getHelpCenterQuery = async (id: number) => {
  const result = await requestHandler(
    `${getHelpCenterQueryUrl}?id=${id}`,
    'GET',
    undefined,
  );
  const res: FetchDetails<HelpCenterQuery> = await result.json();

  return res;
};
