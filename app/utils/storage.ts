import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
  set: (key: string, value: any) => {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    return AsyncStorage.setItem(key, value);
  },

  get: (key: string) => {
    return new Promise((callback, errorCallback) => {
      AsyncStorage.getItem(key).then((data: any) => {
        callback(JSON.parse(data));
      }, errorCallback);
    });
  },

  merge: (key: string, value: any) => {
    return AsyncStorage.mergeItem(key, value);
  },

  delete: (key: string) => {
    return AsyncStorage.removeItem(key);
  },

  clear: () => {
    return AsyncStorage.clear();
  },
};
