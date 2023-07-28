import {Platform} from 'react-native';

export default {
  AppName: '甜瓜剧场',
  Scheme: 'tiangua://',
  EncrpytHash: 'CxdK3xTJ2Z6Bcyp3WGp5wTxU1BlkMd2l',
  UM: {
    Appkey:
      Platform.OS === 'android'
        ? '6447c9c5ba6a5259c442688b'
        : '6447ca017dddcc5bad3b24b1',
    Share: {
      '1_weixin': {
        appKey: 'wx810c5ea496f46b72',
        appSecret: '582382c2c244a2c60510550d3aec37b6',
        redirectURL: '',
      },
    },
  },
  CSJ: {
    AppId: '5413022',
    Code: {
      Splash: '888391456',
      Video: '952982086',
    },
  },
  // 用户协议
  agreement:
    'https://img.smuai.com/agreement/%E4%B8%89%E7%9B%AE%E7%94%A8%E6%88%B7%E5%8D%8F%E8%AE%AE.pdf',
  // 隐私协议
  privacy:
    'https://img.smuai.com/agreement/%E4%B8%89%E7%9B%AE%E9%9A%90%E7%A7%81%E6%94%BF%E7%AD%96.pdf',
  // 协议弹窗
  AgreementAlert: 'AgreementAlert',
  DEBUG: false,
  HOST: '',
  CodePush: true,
  AppKey: '74Bdht7',
  H5_Domain: 'https://chat.smuai.com/',
  isPro: false,
};
