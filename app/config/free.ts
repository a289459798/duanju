import {Platform} from 'react-native';

export default {
  AppName: '甜瓜剧场',
  Scheme: ['tiangua://', 'https://app.njrzm.com'],
  UM: {
    Appkey: Platform.OS === 'android' ? '64c73061bd4b621232e2daf4' : '',
    Share: {
      '1_weixin': {
        appKey: 'wxce23e776a58d940d',
        appSecret: '95f8090822c01df4783538629dcefb4b',
        redirectURL: '',
      },
    },
  },
  ShareLink: 'https://www.baidu.com/',
};
