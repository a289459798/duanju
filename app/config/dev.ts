import {Platform} from 'react-native';

export default {
  HOST: 'http://192.168.31.120:8877/',
  DEBUG: true,
  Push: {
    AppId:
      Platform.OS === 'android' ? '2882303761517500778' : '2882303761518358974',
    AppKey: Platform.OS === 'android' ? '5261750037778' : '5241835843974',
  },
};
