import {Platform} from 'react-native';

export default {
  AppName: '甜瓜剧场',
  Scheme: 'tiangua://',
  UM: {
    Appkey: Platform.OS === 'android' ? '6447c9c5ba6a5259c442688b' : '',
    Share: {
      '1_weixin': {
        appKey: 'wx810c5ea496f46b72',
        appSecret: '582382c2c244a2c60510550d3aec37b6',
        redirectURL: '',
      },
    },
  },
};
