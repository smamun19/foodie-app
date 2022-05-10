import SInfo from 'react-native-sensitive-info';

export const setItem = async (
  keyName: string,
  keyValue: Record<string, any>,
) => {
  return SInfo.setItem(keyName, JSON.stringify(keyValue), {
    sharedPreferencesName: 'sharedPrefs',
    keychainService: 'keychain',
  });
};

export const getItem = async (keyName: string) => {
  const result = await SInfo.getItem(keyName, {
    sharedPreferencesName: 'sharedPrefs',
    keychainService: 'keychain',
  });

  return JSON.parse(result);
};
