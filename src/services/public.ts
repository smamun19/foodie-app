import {baseUrl} from '../constants/api';
import {requestHandler} from '../utils/request';
import {FetchDetails} from '../utils/types/api';
import {
  HelpCenter,
  HelpCenterQuery,
  Item,
  Restaurant,
  Restaurants,
  RestaurantWithItems,
} from '../utils/types/user';

const getHelpCenterUrl = `${baseUrl}/public/help-center`;
const getHelpCenterQueryUrl = `${baseUrl}/public/help-center-query`;
const getRestaurantsUrl = `${baseUrl}/public/restaurants`;
const getAllRestaurantsUrl = `${baseUrl}/public/all-restaurants`;
const getRestaurantItemsUrl = `${baseUrl}/public/restaurant/items`;
const getRestaurantItemUrl = `${baseUrl}/public/restaurant/item`;

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

export const getRestaurantItems = async (id: string) => {
  const result = await requestHandler(
    `${getRestaurantItemsUrl}?id=${id}`,
    'GET',
    undefined,
  );
  const res: FetchDetails<RestaurantWithItems> = await result.json();

  return res;
};

export const getRestaurantItem = async (id: number) => {
  const result = await requestHandler(
    `${getRestaurantItemUrl}?id=${id}`,
    'GET',
    undefined,
  );
  const res: FetchDetails<Item> = await result.json();

  return res;
};
