import {baseUrl} from '../constants/api';
import {requestHandler} from '../utils/request';
import {FetchDetails} from '../utils/types/api';
import {
  HelpCenter,
  HelpCenterQuery,
  Restaurant,
  Restaurants,
} from '../utils/types/user';

const getHelpCenterUrl = `${baseUrl}/public/help-center`;
const getHelpCenterQueryUrl = `${baseUrl}/public/help-center-query`;
const getRestaurantsUrl = `${baseUrl}/public/restaurants`;
const getAllRestaurantsUrl = `${baseUrl}/public/all-restaurants`;
const getRestaurantItemUrl = `${baseUrl}/public/restaurant/items`;

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

export const getRestaurants = async () => {
  const result = await requestHandler(getRestaurantsUrl, 'GET', undefined);
  const res: FetchDetails<Restaurants[]> = await result.json();

  return res;
};

export const getAllRestaurants = async () => {
  const result = await requestHandler(getAllRestaurantsUrl, 'GET', undefined);
  const res: FetchDetails<Restaurant[]> = await result.json();

  return res;
};

export const getRestaurantItem = async (id: number) => {
  const result = await requestHandler(
    `${getRestaurantItemUrl}?id=${id}`,
    'GET',
    undefined,
  );
  const res: FetchDetails<HelpCenterQuery> = await result.json();

  return res;
};
