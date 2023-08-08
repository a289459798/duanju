import {Platform} from 'react-native';

export default {
  HOST: 'http://api.tgjc.njrzm.com/',
  DEBUG: false,
  Push: {
    AppId:
      Platform.OS === 'android' ? '2882303761517500778' : '2882303761517500372',
    AppKey: Platform.OS === 'android' ? '5261750037778' : '5461750027372',
  },
};
