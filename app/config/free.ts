import {Platform} from 'react-native';

export default {
  AppName: '甜瓜剧场',
  Scheme: 'tiangua://',
  UM: {
    Appkey: Platform.OS === 'android' ? '64c73061bd4b621232e2daf4' : '',
    Share: {
      '1_weixin': {
        appKey: 'wxce23e776a58d940d',
        appSecret: '582382c2c244a2c60510550d3aec37b6',
        redirectURL: '',
      },
    },
  },
};
